const {  User } = require('../models');
const { signToken } = require('../utils/auth');
// Define the query and mutation functionality to work with the Mongoose models.
const resolvers = {
  Query: {
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

    },
  };
  
  module.exports = resolvers;
  