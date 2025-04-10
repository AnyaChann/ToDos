import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from './apiConfig';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (title) => {
    try {
      const response = await axios.post(API_BASE_URL, { title, description: '', completed: false });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { ...todo, completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleEditTodo = async (id, title) => {
    const todo = todos.find((t) => t.id === id);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { ...todo, title });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter((t) => t.completed);
    try {
      await Promise.all(completedTodos.map((t) => axios.delete(`${API_BASE_URL}/${t.id}`)));
      setTodos(todos.filter((t) => !t.completed));
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={filteredTodos} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
      <TodoFooter
        count={todos.filter((t) => !t.completed).length}
        filter={filter}
        setFilter={setFilter}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}

export default App;