const { mongoose } = require("mongoose");
const Todo = require("../models/TodoModel");

const addTodo = async (req, res) => {
  const { title } = req.body;

  try {
    if (!title)
      return res.status(400).json({ error: "Kolom kegiatan harus diisi" });

    const todo = await Todo.create({
      title,
    });

    if (!todo)
      return res
        .status(400)
        .json({ success: false, message: "Gagal menyimpan data" });

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.log(error);
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    if (todos.length === 0)
      return res.status(200).json({ success: false, data: null });

    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.log(error);
  }
};

const completeTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId))
      return res.status(400).json({ error: "Id tidak valid" });

    const todo = await Todo.findOne({ _id: todoId });
    if (!todo)
      return res
        .status(404)
        .json({ success: false, message: "Data tidak tersedia" });

    todo.complete = !todo.complete;

    await todo.save();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {}
};

const editTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId))
      return res.status(400).json({ error: "Id tidak valid" });

    const newTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { ...req.body },
      { new: true }
    );

    // if (!newTodo)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Gagal mengubah Todo. Coba lagi!" });

    res.status(200).json({ success: true, data: newTodo });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId))
      return res.status(400).json({ error: "Id tidak valid" });

    const result = await Todo.findOneAndRemove({ _id: todoId });

    res
      .status(200)
      .json({ success: true, message: "Todo berhasil dihapus", data: result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTodo,
  getTodo,
  completeTodo,
  editTodo,
  deleteTodo,
};
