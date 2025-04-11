import React from "react";
import "../styles/FloatingActionButton.css"; // Import your CSS file for styling

const FloatingActionButton = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      +
    </button>
  );
};

export default FloatingActionButton;