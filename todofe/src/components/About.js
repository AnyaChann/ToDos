import React from "react";
import "../styles/About.css"; // Import CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Application</h1>
      <p>
        Welcome to the ToDo Application! This app helps you manage your tasks efficiently by providing features like:
      </p>
      <ul>
        <li>📆 Calendar view for scheduling tasks.</li>
        <li>📒 Task list to track your progress.</li>
        <li>⚙️ Settings to customize your experience.</li>
      </ul>
      <p>
        Built with <strong>React</strong> for the frontend and <strong>Spring Boot</strong> for the backend, this application is designed to be fast, reliable, and user-friendly.
      </p>
      <p>
        Feel free to explore and make the most of your productivity!
      </p>
    </div>
  );
};

export default About;