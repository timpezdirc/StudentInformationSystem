const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const STUDENTS_DB = './students.json';
const PAGE_SIZE = 20;

// Reading and writing in students.json
function readStudents() {
    if(!fs.existsSync(STUDENTS_DB)) fs.writeFileSync(STUDENTS_DB, '[]');
    return JSON.parse(fs.readFileSync(STUDENTS_DB, 'utf8'));
}

function writeStudents(student) {
    fs.writeFileSync(STUDENTS_DB, JSON.stringify(student, null, 2));
}

app.get('/api/students', (req, res) => {
    const students = readStudents();
    res.json(students);
});

app.post('/api/students', (req, res) => {
    const { name, age, courses } = req.body;
    if(!name || !age || !Array.isArray(courses)) {
        return res.status(400).json({ error: 'Invalid student data' });
    }

    const students = readStudents();
    const newStudent = {
        id: uuidv4(),
        name,
        age,
        courses
    };

    students.push(newStudent);
    writeStudents(students);

    res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
    const studentId = req.params.id;
    const { courses } = req.body;

    if(!Array.isArray(courses)) {
        return res.status(400).json({ error: 'Courses must be an array' });
    }

    const students = readStudents();
    const index = students.findIndex(s => s.id === studentId);

    if(index === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    students[index].courses = courses;
    writeStudents(students);

    res.json(students[index]);
});

app.delete('/api/students/:id', (req, res) => {
    const studentId = req.params.id;
    let students = readStudents();
    const initialLength = students.length;

    students = students.filter(s => s.id !== studentId);

    if(students.length === initialLength) {
        return res.status(404).json({ error: 'Student not found' });
    }

    writeStudents(students);
    res.json({ message: 'Student deleted successfully' })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on PORT: ', PORT);
});