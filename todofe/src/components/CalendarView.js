import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarView.css"; // Import custom CSS for modern styling

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks = [], onTaskSelect, onTaskDrop }) => {
    const events = tasks.map((task) => ({
    id: task.id, // Include task ID for identification
    title: task.title,
    start: new Date(task.startDate), // Use startDate
    end: new Date(task.expirationDate), // Use expirationDate
    allDay: false,
    priority: task.priority, // Pass priority for styling
    description: task.description, // Include description
    tags: task.tags, // Include tags
    completed: task.completed, // Include completed status
  }));

    const eventStyleGetter = (event) => {
    let backgroundColor;
    let textColor = "#333"; // Default text color
  
    if (event.completed) {
      backgroundColor = "#d9d9d9"; // Light gray for completed tasks
      textColor = "#6c757d"; 
    } else if (new Date(event.end) < new Date()) {
      backgroundColor = "#f8d7da"; // Light red for expired tasks
      textColor = "#721c24"; // Dark red text for expired tasks
    }
    if (event.completed) {
      backgroundColor = "#d9d9d9"; // Light gray for completed tasks
      textColor = "#6c757d"; 
    } else if (new Date(event.end) < new Date()) {
      backgroundColor = "#f8d7da"; // Light red for expired tasks
      textColor = "#721c24"; // Dark red text for expired tasks
    } else {
      // Apply priority-based colors for pending tasks
      switch (event.priority) {
        case "High":
          backgroundColor = "#ffcccc"; // Pastel red
          break;
        case "Medium":
          backgroundColor = "#fff4cc"; // Pastel yellow
          break;
        case "Low":
          backgroundColor = "#ccffcc"; // Pastel green
          break;
        default:
          backgroundColor = "#e6e6e6"; // Default gray
      }
    }

    return {
      style: {
        backgroundColor,
        color: textColor,
        borderRadius: "8px", // Rounded corners
        border: "none", // Remove border
        padding: "5px",
        fontSize: "0.9rem",
        textDecoration: event.completed || new Date(event.end) < new Date() ? "line-through" : "none", // Add text decoration for expired tasks
      },
    };
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <h2 className="calendar-title">My Calendar</h2>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, borderRadius: "5px", overflow: "hidden" }}
        onSelectEvent={() => {}} // Disable task selection
        onEventDrop={onTaskDrop}
        draggableAccessor={() => true}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarView;