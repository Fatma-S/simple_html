import React, { useState, useEffect } from 'react';

const mockCourses = [
    {
      id: 1,
      name: 'Intro to Psychology',
      meetingDays: 'Mon/Wed',
      time: '10:00 AM - 11:15 AM',
      classroom: 'Room 101'
    },
    {
      id: 2,
      name: 'Data Structures',
      meetingDays: 'Tue/Thu',
      time: '1:00 PM - 2:15 PM',
      classroom: 'Lab B12'
    }
  ];

const ActiveCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(mockCourses);
      }, []);

      
  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (confirmed) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
        <a target='_blank'>
        <button onClick={() => window.location.href = 'http://localhost:3001'}>
            Create New Course
        </button>
        </a>
        
      <h2>Active Courses</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Days</th>
            <th>Time</th>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.meetingDays}</td>
              <td>{course.time}</td>
              <td>{course.classroom}</td>
              <td>
                <button onClick={() => window.location.href = 'http://google.com'}>View Attendance</button>
                <button onClick={() => handleDelete(course.id)} style={{ marginLeft: '10px', color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveCourses;