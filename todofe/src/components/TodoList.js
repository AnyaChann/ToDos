import React, { useState } from "react";
import "../styles/TodoList.css";

const TodoList = ({ todos, onToggle, onDelete, onEdit, onComplete, onDeleteCompleted }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all"); // all, pending, completed, expired
  const tasksPerPage = 8;

  // Phân loại nhiệm vụ
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "expired") return !todo.completed && new Date(todo.expirationDate) < new Date();
    if (filter === "pending") return !todo.completed && new Date(todo.expirationDate) >= new Date();
    return true; // Hiển thị tất cả nếu filter === "all"
  });

  // Sắp xếp nhiệm vụ: Pending -> Completed -> Expired
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (!a.completed && new Date(a.expirationDate) >= new Date()) return -1; // Pending lên đầu
    if (!b.completed && new Date(b.expirationDate) >= new Date()) return 1;
    if (a.completed && !b.completed) return 1; // Completed ở giữa
    if (!a.completed && b.completed) return -1;
    return 0; // Expired ở cuối
  });

  // Tính tổng số nhiệm vụ đang hoạt động
  const activeTasksCount = todos.filter(
    (todo) => !todo.completed && new Date(todo.expirationDate) >= new Date()
  ).length;

  // Phân trang
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTodos.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(sortedTodos.length / tasksPerPage);

  const getCardClass = (todo) => {
    if (todo.completed) return "card-completed";
    if (new Date(todo.expirationDate) < new Date()) return "card-expired";
    return "card-pending";
  };

  const getStatusText = (todo) => {
    if (todo.completed) return "Completed ✅";
    if (new Date(todo.expirationDate) < new Date()) return "Expired ❌";
    return "Pending ⏳";
  };

  return (
    <div>
      <h3 className="mb-4">Task List</h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            className={`btn btn-outline-secondary me-2 ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn btn-outline-warning me-2 ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`btn btn-outline-success me-2 ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`btn btn-outline-danger ${filter === "expired" ? "active" : ""}`}
            onClick={() => setFilter("expired")}
          >
            Expired
          </button>
        </div>
        <div>
          <strong>Active Tasks: {activeTasksCount}</strong>
        </div>
      </div>
      <div className="row">
        {currentTasks.map((todo) => (
          <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
            <div className={`card ${getCardClass(todo)}`}>
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">{todo.description}</p>
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
                  disabled={todo.completed || new Date(todo.expirationDate) < new Date()}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(todo.id)}
                  disabled={todo.completed || new Date(todo.expirationDate) < new Date()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {(filter === "completed" || filter === "expired") && (
        <div className="mt-3">
          <button className="btn btn-danger" onClick={onDeleteCompleted}>
            Delete All {filter === "completed" ? "Completed" : "Expired"} Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;