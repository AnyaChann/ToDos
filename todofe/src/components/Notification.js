import React from "react";
import "./Notification.css";

const Notification = ({ task }) => {
  return (
    <div className="notification">
      Reminder: {task.title} is due at {new Date(task.dateTime).toLocaleString()}.
    </div>
  );
};

export default Notification;