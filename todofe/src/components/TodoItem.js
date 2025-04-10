import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const isExpired = !todo.completed && new Date(todo.expirationDate) < new Date();

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        isExpired ? 'text-muted text-decoration-line-through' : ''
      }`}
    >
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <strong>{todo.title}</strong> - {todo.description}
        <small className="text-muted ms-2">(Expires: {new Date(todo.expirationDate).toLocaleString()})</small>
      </div>
      <div>
        <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;