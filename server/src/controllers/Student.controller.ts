import { Request, Response } from 'express';
import { StudentInfo } from '../models/Student.model';
import { firestore } from '../firebase/firebase.util';
import Student from '../models/Student.model';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    CollectionReference,
    setDoc,
    updateDoc,
    deleteDoc,
    DocumentReference
} from 'firebase/firestore';

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const colRef = collection(firestore, 'pendingStudents') as CollectionReference<StudentInfo>;

        const snapshot = await getDocs(colRef);

        const students: Array<StudentInfo> = [];
        snapshot.forEach(student => students.push(student.data()));

        res.status(200).send(students);
    }
    catch (err) {
        res.status(500).send(`Error Retrieving All Students, error: ${err}`);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const studentDoc = await getDoc(doc(firestore, 'students', email));

        if (!studentDoc.exists())
            return res.status(404).send("Student Not Found.");

        res.status(200).send(studentDoc.data());
    }
    catch (err) {
        res.status(500).send(`Error Retrieving The Student, error: ${err}`);
    }
};

const addStudent = async (req: Request, res: Response) => {
    const studentInfo = new Student({ ...req.body }).info();

    try {
        const docRef = doc(firestore, 'pendingStudents', studentInfo.email) as DocumentReference<StudentInfo>;

        // TODO: if IT accepts the student => request(POST -> /users/students/verify, reqBody: pendingStudent)

        await setDoc<StudentInfo>(docRef, studentInfo);

        res.status(200).send("Student Added to Pending Requests Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Student to The Pending Requests, error: ${err}`);
    }
};

const updateStudent = async (req: Request, res: Response) => {
    const updatedStudent = new Student({ ...req.body }).info();
    const { email } = req.params;

    try {
        const docRef = doc(firestore, 'students', email) as DocumentReference<StudentInfo>;
        const docSnapshot = await getDoc<StudentInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Student Not Found.");
        }

        if (email !== updatedStudent.email) {
            return res.status(400).send("You Can't Update Your Email Address.");
        }

        await updateDoc<StudentInfo>(docRef, updatedStudent);

        res.status(200).send("Updated Student Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Updating The Student, error: ${err}`);
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const docRef = doc(firestore, 'students', email) as DocumentReference<StudentInfo>;
        const docSnapshot = await getDoc<StudentInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Student Already Doesn't Exist.");
        }

        await deleteDoc(docRef);

        res.status(200).send("Student Deleted Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Deleting The Student, error: ${err}`);
    }
};

const studentController = {
    getAllStudents,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent
};

export default studentController;
