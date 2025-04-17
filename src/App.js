import React from 'react';
import ActiveCourses from './ActiveCourses';

function App() {
  return (
    <div>
      <div id="top-bar">
      <span className="top-right">Instructor Name</span>
        <button className="top-right log-out">Log Out</button>
        
      </div>
      <h1>Instructor Dashboard</h1>
      <ActiveCourses />
    </div>
  );
}

export default App;