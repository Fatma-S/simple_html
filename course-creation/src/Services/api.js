import axios from 'axios';

const api = {
    saveCourse: async (courseData) => {
        return await axios.post('/api/save-course', courseData);
    },
    getCourses: async () => {
        return await axios.get('/api/get-courses');
    }
};

export default api;
