CREATE DATABASE instructor_dashboard;

USE instructor_dashboard;

CREATE TABLE courses (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  meeting_days VARCHAR(50) NOT NULL,
  time VARCHAR(50) NOT NULL,
  classroom VARCHAR(50) NOT NULL
);

INSERT INTO courses (id, name, meeting_days, time, classroom) VALUES
  (1, 'Intro to Psychology', 'Mon/Wed', '10:00 AM - 11:15 AM', 'Room 101'),
  (2, 'Data Structures', 'Tue/Thu', '1:00 PM - 2:15 PM', 'Lab B12'),
  (3, 'Web Development', 'Mon/Wed', '3:00 PM - 4:15 PM', 'Room 204'),
  (4, 'Algorithms', 'Fri', '9:00 AM - 12:00 PM', 'Room 303');

SELECT * FROM courses;
