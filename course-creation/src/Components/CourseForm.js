import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';

const CourseForm = ({ onCourseSaved }) => {
    const [courseData, setCourseData] = useState({
        title: '',
        number: '',
        description: '',
        meetingRoom: '',
        roster: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                // Assuming the CSV has 'Name' and 'Email' columns
                setCourseData({
                    ...courseData,
                    roster: result.data
                });
            }
        });
    };

    const handleSaveCourse = async () => {
        try {
            // Save course data to the backend (dummy API call)
            const response = await axios.post('/api/save-course', courseData);
            onCourseSaved(response.data);
        } catch (error) {
            console.error('Error saving course', error);
        }
    };

    return (
        <div>
            <h2>Create New Course</h2>
            <Form>
                <Form.Group controlId="courseTitle">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter course title"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="courseNumber">
                    <Form.Label>Course Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter course number"
                        name="number"
                        value={courseData.number}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="courseDescription">
                    <Form.Label>Course Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter course description"
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="meetingRoom">
                    <Form.Label>Meeting Room</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter meeting room"
                        name="meetingRoom"
                        value={courseData.meetingRoom}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <InputGroup>
                    <Form.Control
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                    />
                </InputGroup>

                <div>
                    <h4>Roster Preview</h4>
                    <ul>
                        {courseData.roster.map((student, index) => (
                            <li key={index}>{student.Name} - {student.Email}</li>
                        ))}
                    </ul>
                </div>

                <Button variant="primary" onClick={handleSaveCourse}>Save Course</Button>
            </Form>
        </div>
    );
};

export default CourseForm;

