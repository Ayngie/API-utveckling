require("dotenv").config();
require("express-async-errors"); //Catches errors and passes them to our error midldeware
const express = require("express");
const mongoose = require("mongoose");
// const Todo = require("./models/Todo");
const todoRoutes = require("./routes/todoRoutes");
const todoListRoutes = require("./routes/todoListRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

/* ------- 1) CREATE EXPRESS APP / Skapa våran Express app ------- */
const app = express();

/* ------- 3) MIDDLEWARE / Sätt upp våran middleware ------- */
// Parse JSON on request body and place on req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  // when above code executed; go on to next middleware/routing
  next();
});

/* ------- 4) ROUTES / Create our routes ------- */
app.use("/helloWorld", (request, response) => {
  return response.send("Hello World!");
});

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

/*------- 5. ERROR HANDLING / Post route Middleware -------- */
//här kan vi fånga upp alla request som inte anv routesen

app.use(notFoundMiddleware); // Not found middleware
app.use(errorMiddleware); // Error middleware (used to send uniform response in case of errors)

/* ------- 2) SERVER SETUP / Start server ------- */
const port = process.env.PORT || 5000;

const run = async () => {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(
        `Server is listening on ${
          process.env.NODE_ENV === "development" ? "http://localhost:" : "port "
        }${port}`
      );
      //FÖRKLARING: Jag kollar om det finns en variabel i .env som heter NODE_ENV och om det finns, och den = "development" så lägger jag till localhost i mitt loggade meddelande.
      //NODE_ENV är det man använder för att säga vilken miljö appen körs i; i produktion (alltså den är live på nätet) eller lokalt på min dator (in development)
    });
  } catch (error) {
    console.error(error);
  }
};

run();
