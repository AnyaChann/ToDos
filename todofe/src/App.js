import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CalendarView from "./components/CalendarView";
import API_BASE_URL from "./apiConfig";

function App() {
  const [todos, setTodos] = useState([]);
  const [view, setView] = useState("calendar");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (title, description, expirationDate) => {
    try {
      const response = await axios.post(API_BASE_URL, {
        title,
        description,
        completed: false,
        expirationDate,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTodo);
      setTodos(
        todos.map((todo) => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id)); 
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo App</h1>
      {view === "calendar" ? (
        <CalendarView
          todos={todos}
          onAdd={handleAddTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      ) : (
        <>
          <TodoForm onAdd={handleAddTodo} />
          <TodoList
            todos={todos}
            onToggle={(id) =>
              handleEditTodo(id, {
                ...todos.find((todo) => todo.id === id),
                completed: !todos.find((todo) => todo.id === id).completed,
              })
            }
            onDelete={handleDeleteTodo}
          />
        </>
      )}
      <button
        className="btn btn-secondary mt-3"
        onClick={() => setView(view === "calendar" ? "list" : "calendar")}
      >
        Switch to {view === "calendar" ? "List" : "Calendar"} View
      </button>
    </div>
  );
}

export default App;