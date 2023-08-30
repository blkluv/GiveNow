const {  User, Donation, Organization } = require('../models');
const { signToken } = require('../utils/auth');
// Define the query and mutation functionality to work with the Mongoose models.
const resolvers = {
  Query: {
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
        const donationData = await Donation.find().select('-__v -password');
        return donationData;
      } catch (err) {
        throw new Error('Failed to fetch donations');
      }
    },
    users: async () => {
      try {
        const userData = await User.find().select('-__v -password');
        return userData;
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },
  
    me: async (parent, args, context) => {
        if (context.user) {
            console.log(context.user);
            const userData = await User.findOne({ _id: context.user._id }).select(
                '-__v -password'
            );

            return userData;
        }

        throw new AuthenticationError('Not logged in');
    },
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
      makeDonation: async (parent, { amount, date, organizationId }, context) => {
          // If the user is not logged in, create the donation without a user association
          const donation = await Donation.create({ amount, date, organizationId });
    
          // Update the organization's amountraised field
          const org = await Organization.findById( organizationId );
          if (org) {
            org.amountraised += amount;
            await org.save();
          }
    
          return donation;
        
      },
      makeOrganization: async (parent, { name, description, amountraised }, context) => {
        // Check if the user is authenticated (optional)
        
          // If the user is not logged in, create the donation without a user association
          const Org = await Organization.create({ name, description, amountraised });
          return Org;
        
      },
    

    },
  };
  
  module.exports = resolvers;
  