// Third-party imports
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const express = require('express');
const app = express();


// Local imports
require('colors');
const routes = require('./routes');
const connectDB = require('./config/connection');
const { typeDefs, resolvers } = require('./schema');

const PORT = process.env.PORT || 3001;
const GRAPHQL_PORT = process.env.GQL_PORT || 4000;

(async () => {
  try {
      // Connect to MongoDB
    await connectDB();

      // Express Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
      // API routes
    app.use(routes);
    
      // Apollo Server setup
    const server = new ApolloServer({ typeDefs, resolvers });
    //await server.start();
    const { url } = await startStandaloneServer(server, {
      context: async ({ req, res }) => ({ token: req.headers.token, res }),
      listen: { port: GRAPHQL_PORT},
    });
    console.log(`🚀  ${'Server ready at'.green} ${url.yellow}`);
    console.log(`🚀  ${'Query at'.magenta} ${'https://studio.apollographql.com/dev'.yellow}`);
    
    // Middleware not needed if using standalone apollo server
    // server.applyMiddleware({ app });

      // Serve static assets in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Express Now listening on localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('Error during server startup:', error);
  }
})();
