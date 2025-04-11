import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="d-flex flex-column h-100">
      <h3 className="text-center mb-4">My Tasks</h3>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/calendar" className="nav-link text-white" activeClassName="fw-bold">
            Calendar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks" className="nav-link text-white" activeClassName="fw-bold">
            Task List
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/settings" className="nav-link text-white" activeClassName="fw-bold">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;