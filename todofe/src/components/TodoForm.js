import React, { useState, useEffect } from "react";

const TodoForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStartDate(task.startDate || "");
      setExpirationDate(task.expirationDate || "");
      setPriority(task.priority || "Low");
      setTags(task.tags || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(expirationDate) < new Date(startDate)) {
      alert("Expiration date cannot be earlier than start date.");
      return;
    }

    onSave({
      id: task?.id,
      title,
      description,
      startDate,
      expirationDate,
      priority,
      tags,
    });
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{task ? "Edit Task" : "New Task"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <input
                type="datetime-local"
                className="form-control mb-2"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
              <select
                className="form-control mb-2"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tags (comma-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <button type="submit" className="btn btn-primary w-100">
                {task ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;