const path = require("path");
const fsPromises = require("fs/promises");
const {
  fileExists,
  readJsonFile,
  deleteFile,
  getDirectoryFileNames,
} = require("../utils/fileHandling"); //importerar helper functions från utils, bl.a. deleteFile som vi skapade för att ha ett bättre namn på funktionen för att delete file (ist för unlink). Samt getDirectoryFileNames.
const { GraphQLError } = require("graphql");
const crypto = require("node:crypto"); //använder nodes crypto här. Alternativ till att använda modulen crypto (då skriver man bara crypto som modul)): const crypto = require("crypto");

const todosDirectory = path.join(__dirname, "..", "data", "todos"); //global variabel

exports.resolvers = {
  Query: {
    getTodoById: async (_, args) => {
      const todoId = args.todoId;
      // `../data/todos/${todosId}.json`
      const todoFilePath = path.join(todosDirectory, `${todoId}.json`);

      const todoExists = await fileExists(todoFilePath);
      if (!todoExists) return new GraphQLError("That todo does not exist");

      const todoData = await fsPromises.readFile(todoFilePath, {
        encoding: "utf-8",
      });
      const data = JSON.parse(todoData);
      return data;
    },
    getAllTodos: async (_, args) => {
      //const todosDirectory = path.join(__dirname, "../data/todos");

      const todos = await getDirectoryFileNames(todosDirectory); //fsPromises.readdir ersätts av getDirectoryFileNames iom vi gjort en helper function av detta.

      // const todoData = []

      /* for (const file of todos) {
				// console.log(file)
				const filePath = path.join(todosDirectory, file)
				const fileContents = await fsPromises.readFile(filePath, { encoding: 'utf-8' })
				const data = JSON.parse(fileContents)
				todoData.push(data)
			} */

      const promises = [];
      todos.forEach((fileName) => {
        const filePath = path.join(todosDirectory, fileName);
        promises.push(readJsonFile(filePath));
      });

      const todoData = await Promise.all(promises);
      return todoData;
    },
  },
  Mutation: {
    createTodo: async (_, args) => {
      //obs! Glöm ej async!

      //verify name
      if (args.name.length === 0)
        return new GraphQLError(
          "Name must be at least 1 character long, try again!"
        );

      //create ID + new Todo (vårt dataobjekt här)
      const newTodo = {
        id: crypto.randomUUID(), //glöm ej () iom funktion!
        name: args.name, //blir vad användaren skriver in för namn. Använder dot notation för att nå detta.
        description: args.description || "", //Or: för att om det är en tom description kommer det annars bli undefined, nu förhindrar vi det med eller "".
      };

      let filePath = path.join(todosDirectory, `${newTodo.id}.json`);

      let idExists = true; //boolean - default true så vi kommer in i while-loopen.
      while (idExists) {
        //while true gör detta:
        const exists = await fileExists(filePath); //funktionen fileExists() anropas och returnerar true om filen (som vi gav filepath till) finns, skickar tillbaka false om filen ej finns.
        console.log(exists, newTodo.id); //logga om blev true/false, samt vad id:t var.
        if (exists) {
          //om nu exists var true / filen fanns -> gör detta:
          newTodo.id = crypto.randomUUID(); //tilldelar nytt unikt random ID.
          filePath = path.join(todosDirectory, `${newTodo.id}.json`); //ändrar filepath till att överensstämma med nya ID:t
        }
        idExists = exists; //idExists blir nu false iom filepath ändrades (i if:en) och boolean därmed kommer tillbaka som false i whileloopen.
      }

      //skapa fil för vår todo i mapp: data/todos
      await fsPromises.writeFile(filePath, JSON.stringify(newTodo));

      //skapa vår respons
      return newTodo;
    },

    updateTodo: async (_, args) => {
      //obs! Glöm ej async!

      //hämta alla parametrar från args
      const { id, name, description } = args; //hämtar ut alla parametrar som har skickats in, iom vi krävt m vårt ! att de ska skickas med så antar vi att det blir error om den inte är med, vi dubbelkollar inte det, om de vill ha ett tomt projekt så fine...
      //Skriver här med object destructuring, snabbare sätt att plocka ut dessa saker --> mer komprimerat sätt att skriva kod.

      //Skapa vår filePath
      const filePath = path.join(todosDirectory, `${id}.json`); //skapar vår filepath, är samma filepath som innan

      //finns det projekt som de vill ändra?
      //if (no) return Not Found Server
      const todoExists = await fileExists(filePath); //använder denna funktion för att kolla att en fil existerar, vi vill inte skapa en todo som inte existerar
      if (!todoExists) return new GraphQLError("that todo does not exist");

      //Skapa updatedProjct objekt
      const updatedTodo = {
        id,
        name,
        description,
      };

      //Skriv över den gamla filen med nya infon
      await fsPromises.writeFile(filePath, JSON.stringify(updatedTodo)); //raderar gamla filen o ersätter m ny fil m ändrade värden. Awaitar den även fast vi eg. inte får ngt tillbaka, så skälet att awaita här för att avvakta o se att filen faktiskt skapas,
      //await är för att filen ska skrivas, vi måste ge den tid till det - och då om det blir lyckat skicks tillbaka ngt som är undefined bara - det bryr vi oss eg ej om, det händer inte så mkt där - och så går koden vidare t nedanstående return av updatedProject. MEN om det blev ERROR så skickas det tillbaka till användaren och koden går INTE vidare till att return updatedProject!

      //return updatedTodo
      return updatedTodo; //om allt ovan gått bra så kommer koden ned hit o vi får en return av ett updatedProject! :) Sucess! :) //Då vet vi att det har funkat.
    },

    deleteTodo: async (_, args) => {
      //obs! Glöm ej async!

      //get todo id
      const todoId = args.todoId;

      //does this todo exist?
      //if NO (return error)
      const filePath = path.join(todosDirectory, `${todoId}.json`); //skapar vår filepath, är samma filepath som innan

      const todoExists = await fileExists(filePath); //använder denna funktion för att kolla att en fil existerar
      if (!todoExists) return new GraphQLError("that todo does not exist"); //Dubbelkolla att errormeddelandet sen är samma som vi skrev - att filen inte finns

      //delete file
      await deleteFile(filePath); //flyttade inbyggda funktionen fsPromises.unlink till fileHandling som Helper funktion istället, så vi kan ha ett bättre namn här. Funktionen unlink är en funktion som vi använder för att radera filen! Denna funktion kommer att radera filen.
      //Kan alltid dubbelkolla: googla: "how to delete file with node". Petter har inte allt i huvudet utan brukar dubbelkolla.

      //return
      return {
        deletedId: todoId, //dessa rader härinne ska spegla deletedResourceResponse i schema!
        success: true,
      }; //kan kolla nu så filen inte längre finns i mappen där den låg förut.
      //Ser även i source control i vs code att filen är raderad (där github commits hamnar).
    },
  },
};
