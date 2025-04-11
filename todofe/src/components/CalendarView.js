import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/CalendarView.css"; // Import your CSS file for styling

const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks = [], onTaskSelect, onTaskDrop }) => {
    const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.startDate), // Use startDate
    end: new Date(task.expirationDate), // Use expirationDate
    allDay: false,
    color: task.priority === "High" ? "red" : task.priority === "Medium" ? "orange" : "green",
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    return {
      style: { backgroundColor },
    };
  };

  return (
    <div className="calendar-view">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={onTaskSelect}
        onEventDrop={onTaskDrop}
        draggableAccessor={() => true}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalendarView;