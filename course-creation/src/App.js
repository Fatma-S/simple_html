// src/App.js

import React, { useState } from 'react';
import CourseForm from './components/CourseForm';
import CSVUpload from './components/CSVUpload';
import Dashboard from './components/Dashboard';

function App() {
  const [courses, setCourses] = useState([]);
  const [parsedRoster, setParsedRoster] = useState([]);

  const saveCourse = (courseDetails) => {
    // Save the course and parsed roster in the state
    setCourses([
      ...courses,
      { ...courseDetails, roster: parsedRoster },
    ]);
    setParsedRoster([]); // Clear the roster after saving the course
  };

  const handleParsedData = (data) => {
    // Set parsed CSV data
    setParsedRoster(data);
  };

  return (
    <div>
      <h1>Course Creation</h1>
      <CourseForm saveCourse={saveCourse} />
      <CSVUpload handleParsedData={handleParsedData} />
      <Dashboard courses={courses} />
    </div>
  );
}

export default App;
