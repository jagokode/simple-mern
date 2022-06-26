const express = require("express");
const {
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
  completeTodo,
} = require("../controllers/todoController");
const router = express.Router();

router.get("/", getTodo);
router.get("/:todoId", completeTodo);
router.post("/", addTodo);
router.patch("/:todoId", editTodo);
router.delete("/:todoId", deleteTodo);

module.exports = router;
