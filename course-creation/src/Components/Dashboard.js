// src/components/Dashboard.js

import React from 'react';

const Dashboard = ({ courses }) => {
  return (
    <div>
      <h3>Instructor Dashboard</h3>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {course.title} ({course.courseNumber}) - {course.meetingRoom}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
