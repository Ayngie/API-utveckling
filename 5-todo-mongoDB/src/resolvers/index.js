// Här är vår index-fil i vilken vi skriver våra resolvers - som ska matcha vårt schema!

const path = require("path");
const fsPromises = require("fs/promises");
const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling"); //importerar helper functions från utils, bl.a. deleteFile som vi skapade för att ha ett bättre namn på funktionen för att delete file (ist för unlink). Samt getDirectoryFileNames.
const { GraphQLError, printType } = require("graphql");
const crypto = require("crypto"); //alternativ är att använda node:crypto (inom () efter require). Detta är ett innbyggt alternativ i node, om man inte vill använda modulen crypto (då skriver man bara crypto som modul)): const crypto = require("crypto");
const {
  ticketType,
  ticketPriority,
  ticketStatus,
} = require("../enums/tickets");
const axios = require("axios").default; //axios har inbyggt support för node, så vi kan använda det i node också :)
//typechecker gjorde (hos Petter) så att det blev rött under axios.post om vi inte inkluderade .default här uppe, detta tillägg här tar bort denna error.

const Todo = require("../models/Todo");

// Create a variable holding the file path (from computer root directory) to the todo file directory
const todosDirectory = path.join(__dirname, "..", "data", "todos"); //global variabel

exports.resolvers = {
  Query: {
    getTodoById: async (_, args) => {
      const todoData = await Todo.findById(args.todoId); //todoId från schema
      return todoData;
    },

    getAllTodos: async (_, args) => {
      const take = args.take || 0;
      const skip = args.skip || 0;
      const todoData = await Todo.find().limit(take).skip(skip);
      return todoData;
    },

    getAllTickets: async (_, args) => {
      console.log(process.env.SHEETDB_URI);
      let tickets = [];
      try {
        const response = await axios.get(process.env.SHEETDB_URI);
        tickets = response.data;
        if (response.data?.length > 0) tickets = response.data; //om listan är mer än noll så skicka response. ALLTSÅ får felmeddelande om är noll.
      } catch (error) {
        console.error(error);
        return new GraphQLError("Ooops, something went wrong");
      }
      // return null; //så att ngt händer :) //Våra tickets ligger under data i vår response - alltså vår response.data ska innehålla alla våra tickets.
      return tickets;
    },

    // deleteTicket: async (_, args) => {
    //   return null; //bara så ngt händer
    // },
  },

  Mutation: {
    createTodo: async (_, args) => {
      const { name, description } = args; //destructuring - args fr createTodo i schema
      const response = await Todo.create({
        name: name,
        description: description,
      });
      return response;
    },

    updateTodo: async (_, args) => {
      //obs! Glöm ej async!

      //hämta alla parametrar från args
      /* const todoId = args.id
			const todoName = args.name
			const todoDescription = args.description */

      const { id, name, description } = args; //hämtar ut alla parametrar som har skickats in, iom vi krävt m vårt ! att de ska skickas med så antar vi att det blir error om den inte är med, vi dubbelkollar inte det, om de vill ha ett tomt projekt så fine...
      //Skriver här med object destructuring, snabbare sätt att plocka ut dessa saker --> mer komprimerat sätt att skriva kod.

      //Skapa vår filePath
      const filePath = path.join(todosDirectory, `${id}.json`); //skapar vår filepath, är samma filepath som innan

      //Finns det todo som de vill ändra?
      //IF (no) return Not Found Server
      const todoExists = await fileExists(filePath); //använder denna funktion för att kolla att en fil existerar, vi vill inte skapa en todo som inte existerar
      if (!todoExists) return new GraphQLError("that todo does not exist");

      //Skapa updatedTodo objekt
      const updatedTodo = {
        id,
        name,
        description,
      };

      //Skriv över den gamla filen med nya infon
      await fsPromises.writeFile(filePath, JSON.stringify(updatedTodo)); //raderar gamla filen o ersätter m ny fil m ändrade värden. Awaitar den även fast vi eg. inte får ngt tillbaka, så skälet att awaita här för att avvakta o se att filen faktiskt skapas,
      //await är för att filen ska skrivas, vi måste ge den tid till det - och då om det blir lyckat skicks tillbaka ngt som är undefined bara - det bryr vi oss eg ej om, det händer inte så mkt där - och så går koden vidare t nedanstående return av updatedTodo. MEN om det blev ERROR så skickas det tillbaka till användaren och koden går INTE vidare till att return updatedTodo!

      //return updatedTodo
      return updatedTodo; //om allt ovan gått bra så kommer koden ned hit o vi får en return av ett updatedTodo! :) Sucess! :) //Då vet vi att det har funkat.
    },

    deleteTodo: async (_, args) => {
      //obs! Glöm ej async!
      //get todo id
      const todoId = args.todoId;

      const filePath = path.join(todosDirectory, `${todoId}.json`); //skapar vår filepath, är samma filepath som innan
      //does this todo exist?
      //If NO (return error)
      const todoExists = await fileExists(filePath); //använder denna funktion för att kolla att en fil existerar
      if (!todoExists) return new GraphQLError("that todo does not exist"); //Dubbelkolla att errormeddelandet sen är samma som vi skrev - att filen inte finns

      //delete file
      try {
        await deleteFile(filePath); //flyttade inbyggda funktionen fsPromises.unlink till fileHandling som Helper funktion istället, så vi kan ha ett bättre namn här. Funktionen unlink är en funktion som vi använder för att radera filen! Denna funktion kommer att radera filen.
        //Kan alltid dubbelkolla: googla: "how to delete file with node". Petter har inte allt i huvudet utan brukar dubbelkolla.
      } catch (error) {
        //om ngt gick fel o filen inte alls raderades
        return {
          deletedId: todoId,
          success: false,
        };
      }

      //return (för vår try (alltså await deleteFile) - dvs. om det var en success att radera filen)
      return {
        deletedId: todoId, //dessa rader härinne ska spegla deletedResourceResponse i schema!
        success: true,
      }; //kan kolla nu så filen inte längre finns i mappen där den låg förut.
      //Ser även i source control i vs code att filen är raderad (där github commits hamnar).
    },

    createTicket: async (_, args) => {
      // console.log(process.env.SHEETDB_URI); //kan console logga url:en till vårt API!
      // console.log(process.env.ENV_TEST);

      // Destructure input variables
      const { title, description, type, priority, todoId } = args.input; //dess ligger under input iom vi skapat ett inputobjekt med dessa egenskaper... Så vi plockar ut dem från input därför! Så vi kan accessa de värdena via de namnen.

      // Skapa vår filePath (till todon)
      const filePath = path.join(todosDirectory, `${todoId}.json`);

      // Finns todon som de vill skapa en ticket för?
      // IF (no) return Error
      const todoExists = await fileExists(filePath);
      if (!todoExists) return new GraphQLError("That todo does not exist");

      // Skapa ett JS objekt som motsvarar hur vi vill att
      // datan ska läggas in i vårt Sheet
      // + generate random ID för våran Ticket
      //all data som vi vill skicka upp skriver vi in här, sen måste titlarna i spreadsheeten matcha dessa för att de ska läggs till därunder, annars blir det fel:
      const newTicket = {
        id: crypto.randomUUID(),
        title,
        description: description || "",
        type,
        priority: priority || ticketPriority.LOW, //iom valfritt lägger vi detta som default LOW.
        status: ticketStatus.NEW, //default = status NEW
        todoId, // OBS! graphql skickar inte tillbaka objekct keys som inte finns med i schema: i.e. denna kommer inte returnas iom inte finns med ngn todoId i type Ticket i schema..? Man behöver alltså inte plocka bort den eller så innan man ska returna den nedan.
      };

      // POST request till SheetDB API:et = Lägga till en rad för
      // denna ticket i vårat sheet
      try {
        const endpoint = process.env.SHEETDB_URI; //SHEETDB_URI är vår variabel med vår url för vår endpoint - denna url finns i .env-filen, som därför ej laddas upp iom vi vill hålla den hemlig.
        const response = await axios.post(
          // OBS! POST REQUEST!
          //post blev rött (röd squiggly) hos Petter tills han la in .default uppe i importen!
          //det första vi skickar in i vår axios response: är vår endpoint som vi nyss skapade variabel av.
          endpoint,
          //det andra vi skickar in i vår axios response: detta är ett JSON-objekt med vår data som vi vill skicka upp och post:a. data innehåller en array av objekt. Det är här man skickar med allt man vill ha med.
          {
            data: [newTicket],
          },
          //det tredje vi skickar in i vår axios response: är headers som står med i dokumentationen (Petter har upplevt att kan få fel om detta inte är med)...
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Accept-Encoding": "gzip,deflate,compress",
            },
          }
        );
        console.log(response); // visar upp `data: { created: 1 }` i console - vid success :)
      } catch (error) {
        console.error(error);
        return new GraphQLError("Could not create the ticket...");
      }

      // IF (success) return JS objekt som mostvarar våran Ticket type i schemat
      return newTicket; //OBS! graphql returnar endast de object keys som finns med i schema.
    },

    // updateTicket: async (_, args) => {
    // },

    deleteTicket: async (_, args) => {
      const ticketId = args.ticketId;
      try {
        const endpoint = `${process.env.SHEETDB_URI}/id/${ticketId}`; //denna rad är den som överensstämmer med dokumentationens rad om hur man deletar...

        const response = await axios.delete(endpoint);

        //console.log(endpoint);
        console.log(response.data);
        return {
          deletedId: ticketId,
          success: true,
        };
      } catch (error) {
        console.error(error);
        // return new GraphQLError("Oops, could not delete that");
        return {
          //Petter kommenterade bort GraphQLError funktionen o kör en liten egen return ist - varför? För att det kan vara långa errormeddelanden från graphql som är svåra för oss att förstå, medan här så kan vi se tydligare om error att det inte deletades det som vi ville.
          deletedId: ticketId,
          success: false,
        };
      }

      //return null //används i början när vi sätter upp koden för att kunna kolla
    },
  },
};
