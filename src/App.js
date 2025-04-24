// app.js

// 1. Initialize Variables
const courseForm = document.getElementById('course-form');
const csvUpload = document.getElementById('csv-upload');
const uploadBtn = document.getElementById('upload-btn');
const courseDashboard = document.getElementById('course-dashboard');

// 2. Handle Course Form Submission
courseForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const courseDetails = {
        title: document.getElementById('title').value,
        courseNumber: document.getElementById('courseNumber').value,
        description: document.getElementById('description').value,
        meetingRoom: document.getElementById('meetingRoom').value
    };

    // Save the course to the database via backend (using fetch to API)
    const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseDetails)
    });

    const result = await response.json();
    const courseId = result.courseId;

    // Display saved course in the dashboard
    const courseItem = document.createElement('li');
    courseItem.textContent = `${courseDetails.title} - ${courseDetails.courseNumber} - ${courseDetails.meetingRoom}`;
    courseDashboard.appendChild(courseItem);

    // Enable file upload after course is created
    uploadBtn.disabled = false;
    uploadBtn.addEventListener('click', () => handleCSVUpload(courseId));
});

// 3. Handle CSV File Upload and Parsing
async function handleCSVUpload(courseId) {
    const file = csvUpload.files[0];
    if (file) {
        Papa.parse(file, {
            complete: async (result) => {
                // Send parsed CSV data to the backend for the given courseId
                const rosterData = result.data;
                
                const response = await fetch(`http://localhost:5000/api/courses/${courseId}/roster`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(rosterData)
                });

                const responseData = await response.json();
                console.log(responseData.message);  // Show success message from backend
            },
            header: true
        });
    }
}
