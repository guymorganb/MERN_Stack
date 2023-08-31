
const User = require('../../models/User');
const userController = require('../../controllers/user-controller');
const resolvers = {
    Query: {
        books: () => {/* ... */},
        me: async (_, { id }) => {
          return await User.findById(id);  // Using Mongoose's findById method
        },
    },
    Mutation: {
        login: async (_, args, { res }) => {
          await userController.login({ body: args }, res);
        },
        addUser: async (_, args, { res }) => {
          await userController.createUser({ body: args }, res);
        },
        saveBook: async (_, args, { res, user }) => {
            await userController.saveBook({ user, body: args.book }, res);
          },          
        removeBook: async (_, args, { res, user }) => {
          await userController.deleteBook({ user, params: { bookId: args.bookId } }, res);
        },
      },
};

module.exports = resolvers;