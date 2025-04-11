import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import FloatingActionButton from "./components/FloatingActionButton";
import CalendarView from "./components/CalendarView";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import API_BASE_URL from "./apiConfig";
import "./styles/App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleSaveTodo = async (task) => {
    try {
      const method = task.id ? "PUT" : "POST";
      const url = task.id ? `${API_BASE_URL}/${task.id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const savedTask = await response.json();

      if (task.id) {
        // Update existing task
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === task.id ? savedTask : todo))
        );
      } else {
        // Add new task
        setTodos((prevTodos) => [...prevTodos, savedTask]);
      }

      setShowForm(false);
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/complete`, {
        method: "PATCH",
      });
      const updatedTask = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTask : todo))
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const openForm = (task = null) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <Router>
      <div className="container-fluid vh-100 d-flex flex-column">
        <div className="row flex-grow-1">
          <div className="col-md-3 col-lg-2 bg-primary text-white p-4 h-100">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-4 h-100 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/calendar" />} />
              <Route
                path="/calendar"
                element={<CalendarView tasks={todos} onTaskSelect={openForm} />}
              />
              <Route
                path="/tasks"
                element={
                  <TodoList
                    todos={todos}
                    onEdit={openForm}
                    onDelete={handleDeleteTodo}
                    onComplete={handleCompleteTodo} // Pass the handler
                  />
                }
              />
            </Routes>
          </div>
        </div>
        <FloatingActionButton onClick={() => openForm()} />
      </div>      {showForm && (
        <TodoForm
          task={editingTask}
          onSave={handleSaveTodo}
          onClose={closeForm}
        />
      )}
    </Router>
  );
}

export default App;
