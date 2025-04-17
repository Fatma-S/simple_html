import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';

const CourseDashboard = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/get-courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };
        
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Your Courses</h2>
            <ListGroup>
                {courses.map((course, index) => (
                    <ListGroup.Item key={index}>
                        {course.title} - {course.number}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CourseDashboard;
