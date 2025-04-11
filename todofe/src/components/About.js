import React from "react";
import "../styles/About.css"; // Import CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About This Application</h1>
      <p>
        Welcome to the <strong>ToDo Application</strong>! This web application is designed to help you organize and manage your tasks efficiently. Whether you're planning your day, tracking deadlines, or managing long-term projects, this app has the tools you need to stay productive.
      </p>
      <h2>Features</h2>
      <ul>
        <li>📆 <strong>Calendar View:</strong> Visualize your tasks on a calendar to plan your schedule effectively.</li>
        <li>📒 <strong>Task List:</strong> Keep track of all your tasks, including their status (Pending, Completed, or Expired).</li>
        <li>⚙️ <strong>Settings:</strong> Customize your experience by switching between Light and Dark themes (Currentlly Not Working)</li>
        <li>ℹ️ <strong>About Page:</strong> Learn more about the application and its purpose.</li>
      </ul>
      <h2>Technology Stack</h2>
      <p>
        This application is built using modern web technologies to ensure a fast, reliable, and user-friendly experience:
      </p>
      <ul>
        <li>🌐 <strong>Frontend:</strong> React.js for building a dynamic and responsive user interface.</li>
        <li>🚀 <strong>Backend:</strong> Spring Boot for handling server-side logic and APIs.</li>
        <li>💾 <strong>Database:</strong> A relational database for storing tasks and user data.</li>
      </ul>
      <h2>Credits</h2>
      <p>
        This application was developed by <strong>[Bách Tô]</strong>, a passionate software developer dedicated to creating tools that enhance productivity and simplify task management.
      </p>
      <p>
        If you have any feedback or suggestions, feel free to reach out via email at <a href="mailto:bachcter504@gmail.com">bachcter504@gmail.com</a>.
      </p>
      <h2>License</h2>
      <p>
        This project is open-source and licensed under the <strong>MIT License</strong>. Feel free to contribute or use it in your own projects!
      </p>
    </div>
  );
};

export default About;