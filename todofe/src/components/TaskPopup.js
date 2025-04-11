import React from "react";
import { motion } from "framer-motion";
import moment from "moment";

const TaskPopup = ({ selectedDate, todos, onAdd, onEdit, onDelete, onClose }) => {
  return (
    <div className="popup-container" onClick={(e) => e.target.className === "popup-container" && onClose()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="popup-content"
      >
        <h4>Tasks for {moment(selectedDate).format("MMMM Do YYYY")}</h4>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{todo.title}</strong>: {todo.description}
              </div>
              <div>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEdit(todo)}
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
            </li>
          ))}
        </ul>
        <button
          className="btn btn-success mt-3"
          onClick={() => onAdd(selectedDate)}
        >
          Add Task
        </button>
        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default TaskPopup;