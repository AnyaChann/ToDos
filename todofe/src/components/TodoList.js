import React from "react";
import "../styles/TodoList.css";

const TodoList = ({ todos, onToggle, onDelete, onEdit, onComplete }) => {
  const getCardClass = (todo) => {
    if (todo.completed) {
      return "card-completed"; // Màu cho nhiệm vụ đã hoàn thành
    }
    if (new Date(todo.expirationDate) < new Date()) {
      return "card-expired"; // Màu cho nhiệm vụ đã hết hạn
    }
    switch (todo.priority) {
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

  const getStatusText = (todo) => {
    if (todo.completed) {
      return "Completed ✅";
    }
    if (new Date(todo.expirationDate) < new Date()) {
      return "Expired ❌";
    }
    return "Pending ⏳";
  };

  return (
    <div>
      <h3 className="mb-4">Task List</h3>
      <div className="row">
        {todos.map((todo) => (
          <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
            <div className={`card ${getCardClass(todo)}`}>
              <div className="card-body">
                <h5
                  className={`card-title ${
                    todo.completed ? "text-decoration-line-through" : ""
                  }`}
                >
                  {todo.title}
                </h5>
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
                <p
                  className={`card-text status-text ${
                    todo.completed
                      ? "status-completed"
                      : new Date(todo.expirationDate) < new Date()
                      ? "status-expired"
                      : "status-pending"
                  }`}
                >
                  <strong>{getStatusText(todo)}</strong>
                </p>
                {!todo.completed && new Date(todo.expirationDate) >= new Date() && (
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
                  disabled={
                    todo.completed || new Date(todo.expirationDate) < new Date()
                  } // Disable nếu đã hoàn thành hoặc hết hạn
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(todo.id)}
                  disabled={
                    todo.completed || new Date(todo.expirationDate) < new Date()
                  } // Disable nếu đã hoàn thành hoặc hết hạn
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