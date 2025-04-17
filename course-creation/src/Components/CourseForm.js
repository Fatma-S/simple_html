// src/components/CourseForm.js

import React, { useState } from 'react';

const CourseForm = ({ saveCourse }) => {
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    courseNumber: '',
    description: '',
    meetingRoom: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCourse(courseDetails); // Pass course details to the parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Title:</label>
        <input
          type="text"
          name="title"
          value={courseDetails.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Course Number:</label>
        <input
          type="text"
          name="courseNumber"
          value={courseDetails.courseNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={courseDetails.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Meeting Room:</label>
        <input
          type="text"
          name="meetingRoom"
          value={courseDetails.meetingRoom}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;
