const courseForm = document.getElementById('course-form');
const csvUpload = document.getElementById('csv-upload');
const uploadBtn = document.getElementById('upload-btn');
const courseDashboard = document.getElementById('course-dashboard');

// Handle Course Form Submission
courseForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const courseDetails = {
        title: document.getElementById('title').value,
        courseNumber: document.getElementById('courseNumber').value,
        description: document.getElementById('description').value,
        meetingRoom: document.getElementById('meetingRoom').value
    };

    try {
        // Save the course to the backend via API
        const response = await fetch('http://localhost:3000/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseDetails)
        });

        const result = await response.json();
        const courseId = result.courseId;

        // Display the newly created course in the dashboard
        const courseItem = document.createElement('li');
        courseItem.textContent = `${courseDetails.title} - ${courseDetails.courseNumber} - ${courseDetails.meetingRoom}`;
        courseDashboard.appendChild(courseItem);

        // Enable file upload after course creation
        uploadBtn.disabled = false;
        uploadBtn.addEventListener('click', () => handleCSVUpload(courseId));
    } catch (error) {
        console.error('Error while creating course:', error);
        alert('Error creating course: ' + error.message);
    }
});

// Handle CSV File Upload and Parsing
async function handleCSVUpload(courseId) {
    const file = csvUpload.files[0];
    if (file) {
        Papa.parse(file, {
            complete: async (result) => {
                const rosterData = result.data;

                // Validate the roster data format
                if (!Array.isArray(rosterData) || rosterData.length === 0) {
                    alert('Invalid roster data');
                    return;
                }

                // Validate each student entry
                for (let student of rosterData) {
                    if (!student.firstName || !student.lastName || !student.email) {
                        alert('Each student must have first name, last name, and email.');
                        return;
                    }
                }

                try {
                    const response = await fetch(`http://localhost:3000/api/courses/${courseId}/roster`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(rosterData)
                    });

                    const responseData = await response.json();
                    console.log(responseData.message);  // Show success message from backend

                    // Display success or error message on the front end
                    if (responseData.message === 'Roster uploaded successfully') {
                        alert('Roster uploaded successfully');
                    } else {
                        alert('Error uploading roster: ' + responseData.message);
                    }
                } catch (error) {
                    console.error('Error while uploading roster:', error);
                    alert('Error uploading roster: ' + error.message);
                }
            },
            header: true
        });
    } else {
        alert('Please select a CSV file first.');
    }
}
