import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all todos - memoized with useCallback
  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/read-todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTodos(data.todos || []);
    } catch (error) {
      toast.error("Error fetching todos");
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create new todo
  // Create new todo
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!todo || todo.trim() === "") {
    toast.warn("Please enter a todo item before submitting.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/create-todo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(`Todo for "${todo}" created successfully`);
      setTodo("");
      fetchTodos();
    } else {
      toast.error(data.message || "Failed to create todo");
    }
  } catch (error) {
    toast.error("Create error: " + error.message);
  }
};

  // Edit a todo
  const handleEdit = async (todoId) => {
    const oldTodo = todos.find((t) => t._id === todoId)?.todo || "Unknown";

    const updatedTodo = window.prompt("Update your todo", oldTodo);

    if (!updatedTodo || updatedTodo.trim() === "") return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/update-todo/${todoId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedTodo }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`"${oldTodo}" updated to "${updatedTodo}"`);
        fetchTodos();
      } else {
        toast.error(data.message || "Failed to update todo");
      }
    } catch (error) {
      toast.error("Update error: " + error.message);
    }
  };

  // Delete a todo
  const handleDelete = async (todoId) => {
    const deletedTodo = todos.find((t) => t._id === todoId)?.todo || "Unknown";

    try {
      const response = await fetch(
        `http://localhost:3001/api/delete-todo/${todoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(`Todo "${deletedTodo}" has been deleted`);
        fetchTodos();
      } else {
        toast.error(data.message || "Failed to delete todo");
      }
    } catch (error) {
      toast.error("Delete error: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <section style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <ToastContainer />
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter new todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={{ padding: "0.5rem", width: "70%" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} style={{ marginBottom: "1rem" }}>
            <span>{todo.todo}</span>
            <button onClick={() => handleEdit(todo._id)} style={{ marginLeft: "1rem" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(todo._id)} style={{ marginLeft: "0.5rem" }}>
              Delete
            </button>
          </div>
        ))
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          backgroundColor: "red",
          color: "white",
          padding: "0.5rem 1rem",
        }}
      >
        Logout
      </button>
    </section>
  );
};

export default Home;
