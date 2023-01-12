let msg = "Hello world, this is Angie";

exports.resolvers = {
  // Detta är ett objekt med två objekt i sig
  // Objekten i resolvers - dvs Query och Mutation - har 4 olika parametrar - OBS! ordningen spelar roll.
  Query: {
    //ena objektet
    helloQuery: (_, args) => {
      // Finns fyra parametrar - första ignorerar vi med en _, sen andra är args = arguments.
      // Första parametern: Först i ordning är parent (som ingen anv för den inneh inte ngn intressant info), så då vill man skriva  _ underscore - är som en placeholder för parent.
      // Andra parametern är args  (arguments),
      // Tredje parametern är context (vi kommer vå igenom denna i nästa v.)
      // 4e anv inte så mkt heller...
      return msg;
    },
  },
  Mutation: {
    //andra objektet
    helloMutation: (_, args) => {
      msg = args.message;
      return msg;
    },
  },
};
