import React, { useState } from 'react';
import CourseForm from './components/CourseForm';
import CourseDashboard from './components/CourseDashboard';

function App() {
    const [courseSaved, setCourseSaved] = useState(false);

    const handleCourseSaved = () => {
        setCourseSaved(true);
    };

    return (
        <div className="App">
            {!courseSaved ? (
                <CourseForm onCourseSaved={handleCourseSaved} />
            ) : (
                <CourseDashboard />
            )}
        </div>
    );
}

export default App;
