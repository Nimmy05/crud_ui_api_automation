import express from "express";
import { verifyToken } from '../middleware/verifyToken.js';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

const todoRouters = express.Router();

todoRouters.get("/", getTodos);             
todoRouters.post("/", verifyToken, createTodo);          
todoRouters.put("/:id", updateTodo);        
todoRouters.delete("/:id", deleteTodo);     

export default todoRouters;
