const Todo = require("../models/Todo");

exports.getAllTodos = async (req, res) => {
  try {
    /* 
      Get only number of todos specified in "limit" query
      parameter. Default limit is 10 (aka unless told otherwise
      only get 10 todos at a time)
    */
    const limit = Number(req.query?.limit || 10);
    /* 
      Skip the number of todos specified in the "offset"
      query parameter according to default todo sorting. 
      If no offset given, default is 0 (aka start from the
      beginning)
    */
    const offset = Number(req.query?.offset || 0);

    // Get all todos; filter according to "limit" and "offset" query params
    const todos = await Todo.find().limit(limit).skip(offset);
    // Get total number of todos available in database
    const totalTodosInDatabase = await Todo.countDocuments();
    // Create and send our response
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
    // Catch any unforseen errors
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  // Big outer try-catch
  try {
    // Get our todo id (put in local variable)
    const todoId = req.params.todoId;

    // Find todo with that id
    const todo = await Todo.findById(todoId);

    // IF(no todo) return 404
    if (!todo) return res.sendStatus(404);

    // respond with todo data (200 OK)
    return res.json(todo);
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createNewTodo = async (req, res) => {
  try {
    // Get data from req.body and place in local variables
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
    return (
      res
        // Add Location header to response
        // Location header = URI pointing to endpoint where user can get new todo
        .setHeader(
          "Location",
          `http://localhost:${process.env.PORT}/api/v1/todos/${newTodo._id}`
        )
        .status(201)
        .json(newTodo)
    );
  } catch (error) {
    console.error(error);
    // Send the following response if error occurred
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTodoById = async (req, res) => {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTodoById = async (req, res) => {
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
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
