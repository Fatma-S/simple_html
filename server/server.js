// server.js

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// MySQL Database setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'course_creation_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// API to save course details
app.post('/api/courses', (req, res) => {
  const { title, courseNumber, description, meetingRoom } = req.body;
  const query = 'INSERT INTO courses (title, courseNumber, description, meetingRoom) VALUES (?, ?, ?, ?)';
  
  db.query(query, [title, courseNumber, description, meetingRoom], (err, result) => {
    if (err) throw err;
    res.status(200).json({ message: 'Course saved successfully', courseId: result.insertId });
  });
});

// API to save course roster (CSV data)
app.post('/api/courses/:courseId/roster', (req, res) => {
  const { courseId } = req.params;
  const roster = req.body;

  roster.forEach((student) => {
    const query =
      'INSERT INTO roster (courseId, firstName, lastName, email) VALUES (?, ?, ?, ?)';
    db.query(query, [courseId, student.firstName, student.lastName, student.email], (err) => {
      if (err) throw err;
    });
  });
  res.status(200).json({ message: 'Roster added successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
