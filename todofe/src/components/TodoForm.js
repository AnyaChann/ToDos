import React, { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, description, expirationDate);
      setTitle('');
      setDescription('');
      setExpirationDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        className="form-control mb-2"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100">Add Todo</button>
    </form>
  );
};

export default TodoForm;