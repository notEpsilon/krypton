import express, { Request, Response } from 'express';
import { firestore } from './firebase/firebase.util';
import { collection, doc, addDoc, getDocs, getDoc, DocumentData } from 'firebase/firestore';
import Student from './models/Student.model';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// get all students
app.get('/students', async (req: Request, res: Response) => {
    const colRef = collection(firestore, 'students');
    
    try {
        const StudentDocs = await getDocs(colRef);
        let students: DocumentData = [];
        StudentDocs.forEach(student => students.push(student.data()));
        res.status(200).send(students);
    }
    catch (err) {
        res.status(502).send("Error Retrieving Students Documents.");
    }
});

// add a student
app.post('/students', async (req: Request, res: Response) => {
    const colRef = collection(firestore, 'students');
    
    const studentInfo = new Student({ ...req.body }).info();
    
    try {
        await addDoc(colRef, studentInfo);
        res.status(200).send("Student Created Successfully.");
    }
    catch (err) {
        res.status(502).send("Error Adding a Student Document.");
    }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
