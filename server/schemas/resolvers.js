const {  User, Donation, Organization } = require('../models');
const { signToken } = require('../utils/auth');
// Define the query and mutation functionality to work with the Mongoose models.
const resolvers = {
  Organization: {
    topDonors: async (parent, args, context) => {
      const organizationId = parent._id;

      // Retrieve the top three donations for the organization
      const topDonations = await Donation.find({ organization: organizationId })
        .sort({ amount: -1 })
        .limit(3)
        .populate('userId'); // Populate the user information

      // Transform the data to match the UserDonation type
      const topDonors = topDonations.map((donation) => ({
        user: donation.userId,
        donationAmount: donation.amount,
      }));

      return topDonors;
    },
  },
  Query: {

    user: async (parent, args) => {
      try {
      const userId = args.userId
        const userData = await User.findById(userId)
        .populate({
          path: 'donations',
          populate: { path: 'organization' }, // Populate the organization field within donations
        });
        
        return userData
      } catch (error) {
        throw new Error('Failed to get User');
      }
    },

org: async (parent, args) => {
  try {
  const orgId = args.orgId
    const OrgData = await Organization.findById(orgId)
    return OrgData
  } catch (error) {
    throw new Error('Failed to get Org');
  }
},
    organizations: async () => {
      try {
        const orgData = await Organization.find().select('-__v -password');
        return orgData;
      } catch (err) {
        throw new Error('Failed to fetch organizations');
      }
    },
    donations: async () => {
      try {
        const donationData = await Donation.find()
          .select('-__v -password')
          .populate('organization')
          .populate('userId');
        return donationData;
      } catch (err) {
        throw new Error('Failed to fetch donations');
      }
    },
    
    users: async () => {
      try {
        const userData = await User.find()
        .select('-__v -password')
        .populate({
          path: 'donations',
          populate: { path: 'organization' }, // Populate the organization field within donations
        });
        return userData;
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },
  
    me: async (parent, args, context) => {
      if (context.user) {
        const userId = context.user._id;
    
        console.log('Authenticated User ID:', userId);
    
        // Retrieve the authenticated user's data including donations and organization data
        const userData = await User.findById(userId)
          .select('-__v -password')
          .populate({
            path: 'donations',
            populate: { path: 'organization' },
          });
    
        console.log('User Data with Donations:', userData);
    
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    }
    
    
    
    
    
},
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No profile with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
      },
      makeDonation: async (parent, { amount, date, organization }, context) => {
        // Check if the user is authenticated (optional)
        if (context.user) {
          const userId = context.user._id;
      
          // Create the donation with the user ID and organization
          const donation = await Donation.create({
            amount,
            date,
            organization,
            userId,
          });
          await User.findByIdAndUpdate(userId, {
            $push: { donations: donation._id },
          });
          // Update the organization's amountraised field
          const org = await Organization.findById(organization);
          if (org) {
            //update amount raised by doations
            // and increase the number of donations made
            org.amountraised += amount;
            org.donationsmade += 1;
            // Retrieve the top three donations for the organization
            const topDonations = await Donation.find({ organization })
              .sort({ amount: -1 }) // Sort in descending order
              .limit(3); // Limit to the top three donations
      
            // Update the top donor field for all users
            const topDonorIds = topDonations.map((don) => don.userId.toString());
            await User.updateMany(
              { _id: { $in: topDonorIds }, organization }, // Update top donors within the organization
              { $set: { topdoner: true } } // Set topdoner to true for top donors
            );
      
            // Set topdoner to false for all other users in the organization
            await User.updateMany(
              { _id: { $nin: topDonorIds }, organization }, // Exclude top donors
              { $set: { topdoner: false } } // Set topdoner to false
            );
      
            await org.save();
          }
      
          return donation;
        } else {
          // If the user is not logged in, create the donation without a user association
          const donation = await Donation.create({
            amount,
            date,
            organization,
          });
      
          // Update the organization's amountraised field
          const org = await Organization.findById(organization);
          if (org) {
              //update amount raised by doations
            // and increase the number of donations made
            org.amountraised += amount;
            org.donationsmade += 1;
            await org.save();
          }
      
          return donation;
        }
      },
      
      
      
      
      
      makeOrganization: async (parent, { name, description, amountraised, category, image, shortdescription }, context) => {
        // Check if the user is authenticated (optional)
        
          // If the user is not logged in, create the donation without a user association
          const Org = await Organization.create({ name, description, amountraised, category, image, shortdescription });
          return Org;
        
      },
      
      removeOrganization: async (parent, { orgId}, context) => {
        // Check if the user is authenticated (optional)
        
        const fs = require('fs');
        const path = require('path');
        const organization = await Organization.findOne({ _id: orgId });
        const uploadsFolderPath = path.join(__dirname, '../../', 'client', 'public', 'uploads');
        if(organization.image){
          const imageName = path.basename(organization.image);
          const filePath = path.join(uploadsFolderPath, imageName);
  
          try {
            fs.unlinkSync(filePath);
            console.log(`File deleted.`);
          } catch (err) {
            console.error(`Error deleting the file:`, err);
          }
        
        }
        await Organization.findOneAndDelete({ _id: orgId });
      },

      //TODO edit org info
     editOrganization: async (orgId, newData) => {
        try {
          // Check if the organization with the given orgId exists
          const organization = await Organization.findOne(orgId);
      
          if (!organization) {
            throw new Error('Organization not found');
          }
      
          // Update the organization data with the new information
          //TODO get update category to work
          organization.name = newData.name || organization.name;
          organization.description = newData.description || organization.description;
          organization.shortdescription = newData.shortdescription || organization.shortdescription;
          organization.category = newData.category || organization.category;
          organization.image = newData.image || organization.image;
          // Add more fields as needed
      
          // Save the updated organization
          await organization.save();
      
          return organization; // Return the updated organization
        } catch (err) {
          console.error('Error editing the organization:', err);
          throw err; // Rethrow the error for handling in your GraphQL resolver
        }
      }
      
    },
  };
  
  module.exports = resolvers;
  