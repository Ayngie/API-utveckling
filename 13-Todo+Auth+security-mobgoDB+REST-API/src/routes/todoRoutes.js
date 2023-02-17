const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todoController");

// Routes
// GET /api/v1/todos - Get all todos
router.get("/", getAllTodos);

// GET /api/v1/todos/:todoId - Get todo by id
router.get("/:todoId", getTodoById);

// POST /api/v1/todos - Create new todo
router.post("/", createNewTodo);

// PUT /api/v1/todos/:todoId - Update todo (by id)
router.put("/:todoId", updateTodoById);

// DELETE /api/v1/todos/:todoId - Delete todo (by id)
router.delete("/:todoId", deleteTodoById);

module.exports = router;
