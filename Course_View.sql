CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_title VARCHAR(255),
    course_number VARCHAR(50),
    course_description TEXT,
    meeting_days VARCHAR(255),
    semester VARCHAR(50)
);

CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE meetings (
    meeting_id INT PRIMARY KEY,
    course_id INT,
    meeting_date DATE,
    qr_code VARCHAR(255),
    link VARCHAR(255),
    FOREIGN KEY(course_id) REFERENCES courses(course_id)
);

CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY,
    meeting_id INT,
    student_id INT,
    status VARCHAR(50),
    seating_position VARCHAR(255),
    FOREIGN KEY(meeting_id) REFERENCES meetings(meeting_id),
    FOREIGN KEY(student_id) REFERENCES students(student_id)
);
