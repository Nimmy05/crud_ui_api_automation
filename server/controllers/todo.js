import Todo from "../models/todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

export const createTodo = async (req, res) => {
  const { todo } = req.body;

  if (!todo || typeof todo !== 'string' || todo.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }

  try {
    const newTodo = new Todo({ todo });
    await newTodo.save();
    res.status(201).json({ message: 'Todo created', todo: newTodo });
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo' });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { updatedTodo } = req.body;

  if (!updatedTodo || updatedTodo.trim() === "") {
    return res.status(400).json({ message: "Updated todo text is required" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(id, { todo: updatedTodo }, { new: true });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated", todo });
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Todo.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted", todo: deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
