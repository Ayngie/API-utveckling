const Todo = require("../models/Todo");
const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD Todos:

// GET /api/v1/todos - Get all todos
exports.getAllTodos = async (req, res, next) => {
  //variabler för att kunna ha egenvalda limits/offsets i våra queries, alt. annars falla tillbaka på defaultvärden.
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query?.offset || 0);

  // Hämtar alla todos; filter according to "limit" and "offset" query params
  const todos = await Todo.find().limit(limit).skip(offset);
  // hämta alla tillgängliga todos i databasen
  const totalTodosInDatabase = await Todo.countDocuments();

  // Create and send our response
  //return res.send("Get all todos"); //scaffold return m meddelande
  return res.json({
    data: todos, // Send todos result
    meta: {
      // meta information about request
      total: totalTodosInDatabase, // Total num todos available in db
      limit: limit, // Num of todos asked for
      offset: offset, // Num or todos asked to skip
      count: todos.length, // Num of todos sent back
    },
  });
};

// GET /api/v1/todos/:todoId - Get todo by id
exports.getTodoById = async (req, res, next) => {
  // Get our todo id (put in local variable)
  const todoId = req.params.todoId;

  // Find todo with that id
  const todo = await Todo.findById(todoId);

  // IF(no todo) return 404
  if (!todo) throw new NotFoundError("This todo does not exist");

  // respond with todo data (200 OK)
  // return res.send("Get todo by id"); //scaffold return m meddelande
  return res.json(todo);
};

// POST /api/v1/todos - Create new todo
// Vi gör create med POST - NU kommer vi börja använda postman (som vi laddat ned), när vi ska göra posts.
// OBS! I postman skriver vi inte : innan id!!!
exports.createNewTodo = async (req, res, next) => {
  // Hämta data från req.body och placera i lokal variabel
  const name = req.body.name || "";
  const description = req.body.description || "";
  const todoListId = req.body.todoListId;

  // If (no name || name is empty string) respond bad request
  if (!name) throw new BadRequestError("You must provide a name");

  // Create todo
  const newTodo = await Todo.create({
    name: name,
    description: description,
    todoListId: todoListId,
  });

  // Respond
  //return res.send("Create new todo"); //scaffold return m meddelande
  return (
    res
      // Add Location header to response
      // Location header = URI pointing to endpoint where user can get new todo
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/todos/${newTodo._id}`
      )
      .status(201) //Allt gått bra, ny todo skapad
      .json(newTodo) //valfri return - så användaren slipper göra en query för att ta fram denna data (nya skapade todon).
  );
};

// PUT /api/v1/todos/:todoId - Update todo (by id)
// NU kommer vi börja använda postman (som vi laddat ned)...
// OBS! I postman skriver vi inte : innan id!!!
exports.updateTodoById = async (req, res, next) => {
  // Place todo id in local variable
  const todoId = req.params.todoId;

  // Place name and description from req.body in local variables
  const { name, description } = req.body;

  // If no name && description respond with Bad Request
  if (!name && !description)
    throw new BadRequestError(
      "You must provide a name or a description to update..."
    );

  // Get todo
  const todoToUpdate = await Todo.findById(todoId);

  // If (no todo) respond with Not Found
  if (!todoToUpdate) throw new NotFoundError("This project does not exist");

  // Update todo
  if (name) todoToUpdate.name = name;
  if (description) todoToUpdate.description = description;
  const updatedTodo = await todoToUpdate.save();

  // Craft response (return updated todo)
  return res.json(updatedTodo);
  //return res.send("Update todo by id"); //scaffold return m meddelande
};

// DELETE /api/v1/todos/:todoId - Delete todo (by id)
// NU kommer vi börja använda postman (som vi laddat ned)...
// OBS! I postman skriver vi inte : innan id!!!
exports.deleteTodoById = async (req, res) => {
  // Get todo id and place in local variable
  const todoId = req.params.todoId;
  // Check if todo exists
  const todoToDelete = await Todo.findById(todoId);
  // IF (no todo) return Not Found
  if (!todoToDelete) throw new NotFoundError("This project does not exist");

  // Delete todo
  await todoToDelete.delete();

  // Craft our response
  //return res.send("Deleting"); //scaffold return m meddelande
  return res.sendStatus(204);
};

/* ------------------------------------------------------------ */
