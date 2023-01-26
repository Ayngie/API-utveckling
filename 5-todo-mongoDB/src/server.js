// Enables Node to be able to read our .env variables
require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { resolvers } = require("./resolvers");
const { loadFiles } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const path = require("path");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");

async function run() {
  try {
    mongoose.set("strictQuery", false); // fick annars felmedd i console! Petter googlat fram denna lösning till sin egen kod.
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Loads our schema.graphql file and reformats it for use in the next step
    const typeDefs = await loadFiles(path.join(__dirname, "schema.graphql"));
    // Creates a schema from our typeDefs (see step above) and our resolvers
    const schema = makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });
    // Creates a GraphQL server from our schema
    const server = new ApolloServer({ schema: schema });
    // Starts the server in
    const res = await startStandaloneServer(server);
    console.log(`🚀 Server ready at ${res.url}`);
  } catch (error) {
    console.error(error);
  }
}

run();
