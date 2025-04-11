import React from "react";

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-success rounded-circle position-fixed"
      style={{ bottom: "20px", right: "20px", width: "60px", height: "60px" }}
      onClick={onClick}
    >
      +
    </button>
  );
};

export default FloatingActionButton;