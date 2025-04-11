import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import API_BASE_URL from "./apiConfig";
import "./styles/App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (task) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTodos([...todos, newTask]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const openTaskPopup = (task = null) => {
    setEditingTask(task);
    setShowTaskPopup(true);
  };

  const closeTaskPopup = () => {
    setEditingTask(null);
    setShowTaskPopup(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" />} />
            <Route
              path="/calendar"
              element={
                <CalendarView
                  tasks={todos}
                  onTaskSelect={openTaskPopup}
                  onTaskDrop={(event) => {
                    const updatedTask = { ...event, expirationDate: event.start };
                    handleEditTodo(event.id, updatedTask);
                  }}
                />
              }
            />
            <Route
              path="/tasks"
              element={
                <TodoList
                  todos={todos}
                  onToggle={(id) =>
                    handleEditTodo(id, {
                      ...todos.find((todo) => todo.id === id),
                      completed: !todos.find((todo) => todo.id === id).completed,
                    })
                  }
                  onDelete={handleDeleteTodo}
                  onEdit={openTaskPopup}
                />
              }
            />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>

          {showTaskPopup && (
            <TodoForm
              task={editingTask}
              onSave={(task) => {
                if (editingTask) {
                  handleEditTodo(editingTask.id, task);
                } else {
                  handleAddTodo(task);
                }
                closeTaskPopup();
              }}
              onClose={closeTaskPopup}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;