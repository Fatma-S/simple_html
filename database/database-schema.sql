CREATE DATABASE course_creation_db;

USE course_creation_db;

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  courseNumber VARCHAR(50),
  description TEXT,
  meetingRoom VARCHAR(100)
);

CREATE TABLE roster (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseId INT,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  email VARCHAR(100),
  FOREIGN KEY (courseId) REFERENCES courses(id)
);
