import React, { useState } from "react";
import "../styles/TaskPopup.css"; // Import your CSS file for styling

const TaskPopup = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dateTime, setDateTime] = useState(task?.dateTime || "");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [tags, setTags] = useState(task?.tags || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, dateTime, priority, tags });
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h3>{task ? "Edit Task" : "New Task"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopup;