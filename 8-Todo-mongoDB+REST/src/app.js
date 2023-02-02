require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

/* ------- 1) Skapa våran Express app ------- */
const app = express();

/* ------- 3) Sätt upp våran middleware ------- */
// Parse JSON on request body and place on req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  // when above code executed; go on to next middleware/routing
  next();
});

/* ------- 4) Create our routes ------- */
// CRUD Todos:

// GET /api/v1/todos - Get all todos
app.get("/api/v1/todos", async (req, res) => {
  try {
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
        limit: limit, // Num of projects asked for
        offset: offset, // Num or projects asked to skip
        count: todos.length, // Num of projects sent back
      },
    });
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
});

// GET /api/v1/todos/:todoId - Get todo by id
app.get("/api/v1/todos/:todoId", async (req, res) => {
  try {
    // Get our todo id (put in local variable)
    const todoId = req.params.todoId;

    // Find todo with that id
    const todo = await Todo.findById(todoId);

    // IF(no todo) return 404
    if (!todo) return res.sendStatus(404);

    // respond with todo data (200 OK)
    // return res.send("Get todo by id"); //scaffold return m meddelande
    return res.json(todo);
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
});

// POST /api/v1/todos - Create new todo
// Vi gör create med POST - NU kommer vi börja använda postman (som vi laddat ned), när vi ska göra posts.
// OBS! I postman skriver vi inte : innan id!!!
app.post("/api/v1/todos", async (req, res) => {
  try {
    // Hämta data från req.body och placera i lokal variabel
    const name = req.body.name || "";
    const description = req.body.description || "";

    // If (no name || name is empty string) respond bad request
    if (!name) {
      return res.status(400).json({
        message: "You must provide a todo name",
      });
    }

    // Create todo
    const newTodo = await Todo.create({
      name: name,
      description: description,
    });

    // Respond
    //return res.send("Create new todo"); //scaffold return m meddelande
    return (
      res
        // Add Location header to response
        // Location header = URI pointing to endpoint where user can get new todo
        .setHeader(
          "Location",
          `http://localhost:${process.env.PORT}/api/v1/projects/${newTodo._id}`
        )
        .status(201) //Allt gått bra, ny todo skapad
        .json(newTodo) //valfri return - så användaren slipper göra en query för att ta fram denna data (nya skapade todon).
    );
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
});

// PUT /api/v1/todos/:todoId - Update todo (by id)
// NU kommer vi börja använda postman (som vi laddat ned)...
// OBS! I postman skriver vi inte : innan id!!!
app.put("/api/v1/todos/:todoId", async (req, res) => {
  try {
    // Place todo id in local variable
    const todoId = req.params.todoId;

    // Place name and description from req.body in local variables
    const { name, description } = req.body;

    // If no name && description respond with Bad Request
    if (!name && !description) {
      return res.status(400).json({
        message: "You must provide a name or a description to update...",
      });
    }

    // Get todo
    const todoToUpdate = await Todo.findById(todoId);

    // If (no todo) respond with Not Found
    if (!todoToUpdate) return res.sendStatus(404);

    // Update todo
    if (name) todoToUpdate.name = name;
    if (description) todoToUpdate.description = description;
    const updatedTodo = await todoToUpdate.save();

    // Craft response (return updated todo)
    return res.json(updatedTodo);
    //return res.send("Update todo by id"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE /api/v1/todos/:todoId - Delete todo (by id)
// NU kommer vi börja använda postman (som vi laddat ned)...
// OBS! I postman skriver vi inte : innan id!!!
app.delete("/api/v1/todos/:todoId", async (req, res) => {
  try {
    // Get todo id and place in local variable
    const todoId = req.params.todoId;
    // Check if todo exists
    const todoToDelete = await Todo.findById(todoId);
    // IF (no todo) return Not Found
    if (!todoToDelete) return res.sendStatus(404);

    // Delete todo
    await todoToDelete.delete();

    // Craft our response
    //return res.send("Deleting"); //scaffold return m meddelande
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
});

/* ------- 2) Start server ------- */
const port = process.env.PORT || 5000;
async function run() {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
