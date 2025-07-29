import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const todoRouters = express.Router();

todoRouters.get("/", getTodos);              // GET /api/
todoRouters.post("/", createTodo);          // POST /api/
todoRouters.put("/:id", updateTodo);        // PUT /api/:id
todoRouters.delete("/:id", deleteTodo);     // DELETE /api/:id

export default todoRouters;
