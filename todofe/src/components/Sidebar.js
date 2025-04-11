import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"; // Import the updated CSS

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column h-100 p-3">
      <h3 className="text-center mb-4">My Tasks</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/calendar" className="nav-link" activeClassName="active-link">
            📆 Calendar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks" className="nav-link" activeClassName="active-link">
            📒 Task List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link" activeClassName="active-link">
            ⚙️ Settings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" activeClassName="active-link">
            ℹ️ About
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;