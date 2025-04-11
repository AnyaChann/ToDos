import React from "react";

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      className="btn btn-success rounded-circle position-fixed text-center d-flex align-items-center justify-content-center"
      style={{ bottom: "20px", right: "20px", width: "65px", height: "65px", fontSize: "30px" }}
      onClick={onClick}
    >
      +
    </button>
  );
};

export default FloatingActionButton;