import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"; // Import your CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>My Tasks</h3>
      <ul>
        <li>
          <NavLink to="/calendar" activeClassName="active-link">
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" activeClassName="active-link">
            Task List
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active-link">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;