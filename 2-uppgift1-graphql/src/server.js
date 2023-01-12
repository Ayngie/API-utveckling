require("dotenv").config(); //require är en syntax för en hämtning. Det är alltså som en import.
const { ApolloServer } = require("@apollo/server"); //där kommer vi bygga vårt API, vår Graph server.
const { resolvers } = require("./resolvers"); //Destructuring - vi plockar ut resolvers från det vi importerar från filen resolvers.
const { loadFiles } = require("@graphql-tools/load-files"); //  importar funktionen från graphql-tols/load-files funktionen.
const { makeExecutableSchema } = require("@graphql-tools/schema"); // importar funktionen från graphql-tools/schema funktionen.
const path = require("path"); // behövdes för att få typeDefs nedan att fungera.
const { startStandaloneServer } = require("@apollo/server/standalone");

async function run() {
  try {
    const typeDefs = await loadFiles(path.join(__dirname, "schema.graphql"));
    const schema = makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });
    const server = new ApolloServer({ schema: schema }); // Skapar vår apollo-server
    const res = await startStandaloneServer(server); // Vi säger `const response = await startStandAloneServer(server)` - och skickar in servern. Responsen = kommer skicka tillbaka URL:en som vi kan starta vår server från.
    console.log(`🚀 Server ready at ${res.url}`); //Vi kan console.logga response.url och se...: `console.log("Server ready at ${response.url}"`
  } catch (error) {
    console.error(error);
  }
}

run();
//Starta upp vår server: skriver `node ./src/server` - ie. node + rel.sökväg.
// Nu kunde vi få upp vårt api på localhost:4000.
