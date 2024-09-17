const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const url = 'mongodb+srv://arponamitroy012:jqaPUF3LNhjpAbR7@cluster0.js0bs.mongodb.net/students?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB database'))
  .catch(err => console.error('Failed to connect to MongoDB database', err));

// Define the schema and model for the "student" collection
const studentSchema = new mongoose.Schema({
  studentId: String,
  studentName: String,
  studentEmail: String,
  registeredDate: String
});

const Student = mongoose.model('Student', studentSchema, 'student');

// POST endpoint to add a new student
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save(); // Save the student instance
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET endpoint to retrieve all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Corrected port logging
});
