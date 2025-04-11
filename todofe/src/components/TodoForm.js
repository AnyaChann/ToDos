import React, { useState, useEffect } from "react";

const TodoForm = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16)); // Default to current date and time
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
    if (title.trim()) {
      onSave({
        title,
        description,
        startDate: startDate || new Date().toISOString(), // Default to current date if not set
        expirationDate,
        priority,
        tags,
      });
      onClose();
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
      <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TodoForm;