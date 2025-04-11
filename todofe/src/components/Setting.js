import React, { useState } from "react";
import "../styles/Setting.css"; // Import CSS for styling

const Setting = ({ onThemeChange, currentTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    onThemeChange(newTheme); // Notify parent component about the change
  };

  return (
    <div className="setting-container">
      <h1>Settings</h1>
      <div className="theme-setting">
        <label htmlFor="theme-select">Choose Theme:</label>
        <select
          id="theme-select"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Setting;