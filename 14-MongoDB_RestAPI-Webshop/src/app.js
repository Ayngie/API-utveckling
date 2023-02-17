require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
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

app.use("/api/v1/carts", cartRoutes);
app.use("/api/v1/products", productRoutes);

/*------- 5. ERROR HANDLING / Post route Middleware -------- */
//här kan vi fånga upp alla request som inte anv routesen

app.use(notFoundMiddleware); // Not found middleware
app.use(errorMiddleware); // Error middleware (used to send uniform response in case of errors)

/* ------- 2) SERVER SETUP / Start server ------- */
const port = process.env.PORT || 4000;

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
