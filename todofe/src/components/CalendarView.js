import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarView.css"; // Import custom CSS for modern styling

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks = [], onTaskSelect, onTaskDrop }) => {
  const [holidays, setHolidays] = useState([]);

  // Fetch holidays from the API
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://calendarific.com/api/v2/holidays?api_key=lIznWfSdJ8tVgYRIvcn0USgCLUgPcLad&country=VN&year=2025`
        );
        const data = await response.json();

        if (data.response && data.response.holidays) {
          const holidayEvents = data.response.holidays.map((holiday) => ({
            id: `holiday-${holiday.name}`,
            title: holiday.name,
            start: new Date(holiday.date.iso),
            end: new Date(holiday.date.iso),
            allDay: true,
            isHoliday: true, // Custom property to identify holidays
          }));
          setHolidays(holidayEvents);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  // Map tasks to events
  const taskEvents = tasks.map((task) => ({
    id: task.id, // Include task ID for identification
    title: task.title,
    start: new Date(task.startDate), // Use startDate
    end: new Date(task.expirationDate), // Use expirationDate
    allDay: false,
    description: task.description, // Include description
    tags: task.tags, // Include tags
    completed: task.completed, // Include completed status
  }));

  // Combine holidays and task events
  const events = [...holidays, ...taskEvents];

  // Style events based on type (holiday, completed, pending, expired)
  const eventStyleGetter = (event) => {
    let backgroundColor;
    let textColor = "#333"; // Default text color

    if (event.isHoliday) {
      backgroundColor = "#cce5ff"; // Light blue for holidays
      textColor = "#004085"; // Dark blue text
    } else if (event.completed) {
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