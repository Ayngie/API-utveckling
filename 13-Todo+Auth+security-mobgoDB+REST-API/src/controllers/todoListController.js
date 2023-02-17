const TodoList = require("../models/TodoList");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD TodoLists:

// GET /api/v1/todoLists - Get all todoLists
exports.getAllTodoLists = async (req, res, next) => {
  //variabler för att kunna ha egenvalda limits/offsets i våra queries, alt. annars falla tillbaka på defaultvärden.
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query?.offset || 0);

  // Hämtar alla todos; filter according to "limit" and "offset" query params
  const todoLists = await TodoList.find().limit(limit).skip(offset);
  // hämta alla tillgängliga todos i databasen
  const totaltodoListsInDatabase = await TodoList.countDocuments();

  // Create and send our response
  //return res.send("Get all todoLists"); //scaffold return m meddelande
  return res.json({
    data: todoLists, // Send todosLists result
    meta: {
      // meta information about request
      total: totaltodoListsInDatabase, // Total num todosLists available in db
      limit: limit, // Num of todoLists asked for
      offset: offset, // Num or todoLists asked to skip
      count: todoLists.length, // Num of todoLists sent back
    },
  });
};

// GET /api/v1/todoLists/:todoListId - Get todoList by id
exports.getTodoListById = async (req, res, next) => {
  // Get our todoList id (put in local variable)
  const todoListId = req.params.todoListId;

  // Find todoList with that id
  const todoList = await TodoList.findById(todoListId);

  // IF(no todoList) return 404
  if (!todoList) throw new NotFoundError("This todoList does not exist");

  // respond with todoList data (200 OK)
  //return res.send("Get todoList by id"); //scaffold return m meddelande
  return res.json(todoList);
};

// POST /api/v1/todos - Create new todList
exports.createNewTodoList = async (req, res, next) => {
  // Hämta data från req.body och placera i lokal variabel
  const name = req.body.name || "";
  const description = req.body.description || "";

  // If (no name || name is empty string) respond bad request
  if (!name) throw new BadRequestError("You must provide a name");

  // Create todoList
  const newTodoList = await TodoList.create({
    name: name,
    description: description,
  });

  // Respond
  //return res.send("Create new todoList"); //scaffold return m meddelande
  return (
    res
      // Add Location header to response
      // Location header = URI pointing to endpoint where user can get new todoList
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/todoLists/${newTodoList._id}`
      )
      .status(201) //Allt gått bra, ny todo skapad
      .json(newTodoList) //valfri return - så användaren slipper göra en query för att ta fram denna data (nya skapade todoListan).
  );
};

// PUT /api/v1/todos/:todoListId - Update todoList (by id)
exports.updateTodoListById = async (req, res, next) => {
  // Place todoList id in local variable
  const todoListId = req.params.todoListId;

  // Place name and description from req.body in local variables
  const { name, description } = req.body;

  // If no name && description respond with Bad Request
  if (!name && !description)
    throw new BadRequestError(
      "You must provide a name or a description to update..."
    );

  // Get todoList
  const todoListToUpdate = await TodoList.findById(todoListId);

  // If (no todoList) respond with Not Found
  if (!todoListToUpdate)
    throw new NotFoundError("This todoList does not exist");

  // Update todoList
  if (name) todoListToUpdate.name = name;
  if (description) todoListToUpdate.description = description;
  const updatedTodoList = await todoListToUpdate.save();

  // Craft response (return updated todoList)
  return res.json(updatedTodoList);
  //return res.send("Update todoList by id"); //scaffold return m meddelande
};

// DELETE /api/v1/todoLists/:todoListId - Delete todoList (by id)
exports.deleteTodoListById = async (req, res) => {
  // Get todoList id and place in local variable
  const todoListId = req.params.todoListId;
  // Check if todoList exists
  const todoListToDelete = await TodoList.findById(todoListId);
  // IF (no todoList) return Not Found
  if (!todoListToDelete) throw new NotFoundError("This project does not exist");

  // Delete todoList
  await todoListToDelete.delete();

  // Craft our response
  // return res.send("Deleting todoList"); //scaffold return m meddelande
  return res.sendStatus(204);
};

/* ------------------------------------------------------------ */
