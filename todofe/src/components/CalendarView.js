import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TaskPopup from "./TaskPopup";
import "../styles/CalendarView.css"; 

const localizer = momentLocalizer(moment);

const CalendarView = ({ todos, onAdd, onEdit, onDelete }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleSelectDate = (date) => {
    const today = new Date();
    if (date < today.setHours(0, 0, 0, 0)) {
      alert("Cannot select past dates.");
      return;
    }
    setSelectedDate(date);
    const tasksForDate = todos.filter((todo) =>
      moment(todo.expirationDate).isSame(date, "day")
    );
    setFilteredTodos(tasksForDate);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const events = todos.map((todo) => ({
    title: todo.title,
    start: new Date(todo.expirationDate),
    end: new Date(todo.expirationDate),
    allDay: false,
    color: todo.completed
      ? "green"
      : moment(todo.expirationDate).isBefore(new Date())
      ? "gray"
      : "red",
  }));

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    return {
      style: { backgroundColor },
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
        selectable
        eventPropGetter={eventStyleGetter}
      />
      {showPopup && (
        <TaskPopup
          selectedDate={selectedDate}
          todos={filteredTodos}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default CalendarView;