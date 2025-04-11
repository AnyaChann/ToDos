import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"; // Import the updated CSS
import logo from "../assets/logo.png"; // Import the logo image

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column h-100 p-3">
      {/* Logo Section */}
      <div className="logo-container text-center mb-4">
        <img src={logo} alt="ToDos Logo" className="sidebar-logo" />
      </div>
      {/* Navigation Links */}
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