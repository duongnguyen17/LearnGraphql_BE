require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const PORT = process.env.PORT;

const mongoose = require("mongoose");

// load schema & resolver
const typeDefs = require("./src/schema/schema");
const resolvers = require("./src/resolver/resolver");

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected mongodb at ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("error", error);
  }
};

connectDB();

// create instance ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const app = express();

const startApp = async () => {
  // create app
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `server start at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startApp();
