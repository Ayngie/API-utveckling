require("dotenv").config();
require("express-async-errors"); //Catches errors and passes them to our error midldeware
const express = require("express");
const mongoose = require("mongoose");
// const Todo = require("./models/Todo");
const todoRoutes = require("./routes/todoRoutes");
const todoListRoutes = require("./routes/todoListRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

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

app.use("/api/v1/todos" /* /... = see Router => */, todoRoutes);
app.use("/api/v1/todoLists" /* /... = see Router => */, todoListRoutes);

// CRUD Todos:

// // GET /api/v1/todos - Get all todos
// app.get("/api/v1/todos", async (req, res) => {});

// // GET /api/v1/todos/:todoId - Get todo by id
// app.get("/api/v1/todos/:todoId", async (req, res) => {});

// // POST /api/v1/todos - Create new todo
// app.post("/api/v1/todos", async (req, res) => {});

// // PUT /api/v1/todos/:todoId - Update todo (by id)
// app.put("/api/v1/todos/:todoId", async (req, res) => {});

// // DELETE /api/v1/todos/:todoId - Delete todo (by id)
// app.delete("/api/v1/todos/:todoId", async (req, res) => {});

/*------- 5. Post route Middleware -------- */ //här kan vi fånga upp alla request som inte anv routesen
// Not found middleware
app.use(notFoundMiddleware);

// Error middleware (used to send uniform response in case of errors)
app.use(errorMiddleware);

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
