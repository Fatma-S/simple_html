// src/App.js

import React from 'react';
import CourseForm from './components/CourseForm';
import CSVUpload from './components/CSVUpload';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <h1>Course Creation</h1>
      <CourseForm saveCourse={() => {}} />
      <CSVUpload handleParsedData={() => {}} />
      <Dashboard courses={[]} />
    </div>
  );
}

export default App;

