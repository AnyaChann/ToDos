import React from "react";
import "../styles/TodoList.css";

const TodoList = ({ todos, onToggle, onDelete, onEdit, onComplete }) => {
  const getCardClass = (priority) => {
    switch (priority) {
      case "High":
        return "card-high-priority";
      case "Medium":
        return "card-medium-priority";
      case "Low":
        return "card-low-priority";
      default:
        return "card-default-priority";
    }
  };

  return (
    <div>
      <h3 className="mb-4">Task List</h3>
      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
            <div className={`card ${getCardClass(todo.priority)}`}>
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">{todo.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Start: {new Date(todo.startDate).toLocaleString()}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Due: {new Date(todo.expirationDate).toLocaleString()}
                  </small>
                </p>
                {!todo.completed && (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => onComplete(todo.id)}
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEdit(todo)}
                  disabled={todo.completed}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;