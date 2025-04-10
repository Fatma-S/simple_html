import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Papa from 'papaparse';

export default function CourseCreationView() {
  const [courseData, setCourseData] = useState({
    title: '',
    number: '',
    description: '',
    meetingRoom: '',
    semester: '',
    meetingDay: '',
    meetings: 0,
    roster: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCourseData({ ...courseData, roster: results.data });
      },
    });
  };

  const handleSubmit = () => {
    console.log('Course Created:', courseData);
    alert('Course saved and added to dashboard!');
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Create a New Course</h2>
          <Input name="title" placeholder="Course Title" onChange={handleChange} />
          <Input name="number" placeholder="Course Number" onChange={handleChange} />
          <Input name="description" placeholder="Description" onChange={handleChange} />
          <Input name="meetingRoom" placeholder="Meeting Room" onChange={handleChange} />
          <Input name="semester" placeholder="Semester (e.g., Fall 2024)" onChange={handleChange} />
          <Input name="meetingDay" placeholder="Meeting Day (e.g., Monday)" onChange={handleChange} />
          <Input name="meetings" placeholder="Number of Meetings" type="number" onChange={handleChange} />

          <Input type="file" accept=".csv" onChange={handleCSVUpload} />
          {courseData.roster.length > 0 && <p>{courseData.roster.length} students uploaded</p>}

          <Button onClick={handleSubmit}>Save Course</Button>
        </CardContent>
      </Card>
    </div>
  );
}
