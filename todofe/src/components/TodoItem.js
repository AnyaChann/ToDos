import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    if (e.key === 'Enter') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          className="form-control"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleSave}
        />
      ) : (
        <div onDoubleClick={handleEdit}>
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {todo.title}
        </div>
      )}
      <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;