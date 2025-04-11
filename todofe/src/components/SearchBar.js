import React from "react";
import "../styles/SearchBar.css"; // Import your CSS file for styling

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search tasks..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;