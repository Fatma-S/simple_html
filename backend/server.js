const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware for JSON and CORS
app.use(express.json());
app.use(cors());

// Serve static files (e.g., index.html, app.js) from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// MySQL Database connection setup
const db = mysql.createConnection({
  host: 'localhost', // MySQL host
  user: 'root',      // MySQL username
  password: 'K0f!S@mmy1610', // MySQL password
  database: 'course_creation_db' // Name of the database
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// API route to create a new course
app.post('/api/courses', (req, res) => {
  const { title, courseNumber, description, meetingRoom } = req.body;

  const query = 'INSERT INTO courses (title, courseNumber, description, meetingRoom) VALUES (?, ?, ?, ?)';
  
  db.query(query, [title, courseNumber, description, meetingRoom], (err, result) => {
    if (err) {
      console.error('Error inserting course:', err);
      return res.status(500).json({ message: 'Error creating course' });
    }
    res.status(200).json({
      message: 'Course created successfully',
      courseId: result.insertId, // The ID of the newly created course
    });
  });
});

// API route to upload a course roster for a specific course
app.post('/api/courses/:courseId/roster', (req, res) => {
  const { courseId } = req.params;
  const roster = req.body;

  let count = 0;
  roster.forEach((student) => {
    const { firstName, lastName, email } = student;
    const query = 'INSERT INTO roster (courseId, firstName, lastName, email) VALUES (?, ?, ?, ?)';

    db.query(query, [courseId, firstName, lastName, email], (err) => {
      if (err) {
        console.error('Error inserting roster data:', err);
        return res.status(500).json({ message: 'Error uploading roster' });
      }
      count++;
      if (count === roster.length) {
        res.status(200).json({ message: 'Roster uploaded successfully' });
      }
    });
  });
});

// Root route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
