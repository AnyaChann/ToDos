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
      backgroundColor = "#d4edda"; // Light green for completed tasks
      textColor = "#155724"; // Dark green text
    } else if (new Date(event.end) < new Date()) {
      backgroundColor = "#f8d7da"; // Light red for expired tasks
      textColor = "#721c24"; // Dark red text
    } else {
      backgroundColor = "#fff3cd"; // Light yellow for pending tasks
      textColor = "#856404"; // Dark yellow text
    }

    return {
      style: {
        backgroundColor,
        color: textColor,
        borderRadius: "8px",
        border: "none",
        padding: "5px",
        fontSize: "0.9rem",
        textDecoration:
          event.completed || new Date(event.end) < new Date()
            ? "line-through"
            : "none",
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
        onSelectEvent={() => {}}
        onEventDrop={onTaskDrop}
        draggableAccessor={() => true}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarView;
