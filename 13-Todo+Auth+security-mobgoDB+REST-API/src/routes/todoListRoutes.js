const express = require("express");
const router = express.Router();
const {
  getAllTodoLists,
  getTodoListById,
  createNewTodoList,
  updateTodoListById,
  deleteTodoListById,
} = require("../controllers/todoListController");

// Routes
// GET /api/v1/todoLists - Get all todoLists
router.get("/", getAllTodoLists);

// GET /api/v1/todos/:todoListId - Get todoList by id
router.get("/:todoListId", getTodoListById);

// POST /api/v1/todoLists - Create new todoList
router.post("/", createNewTodoList);

// PUT /api/v1/todos/:todoListId - Update todoList (by id)
router.put("/:todoListId", updateTodoListById);

// DELETE /api/v1/todos/:todoListId - Delete todoList (by id)
router.delete("/:todoListId", deleteTodoListById);

module.exports = router;
