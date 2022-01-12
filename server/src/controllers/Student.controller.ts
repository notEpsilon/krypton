import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { StudentInfo } from '../models/Student.model';
import { firestore, auth } from '../firebase/firebase.util';
import { CollectionReference, DocumentReference } from 'firebase-admin/firestore';
import Student from '../models/Student.model';
import sendMail from '../mail/mailer.util';

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const colRef = firestore.collection('students') as CollectionReference<StudentInfo>

        const snapshot = await colRef.get();

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
        const docRef = firestore.doc(`students/${email}`) as DocumentReference<StudentInfo>;

        const studentDoc = await docRef.get();

        if (!studentDoc.exists)
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
        const docRef = firestore.doc(`pendingStudents/${studentInfo.email}`) as DocumentReference<StudentInfo>;

        if ((await docRef.get()).exists)
            return res.status(500).send("This Email Already Exists as a Pending Student.");

        docRef.set(studentInfo);

        res.status(201).send("Student Added to Pending Requests Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Student to The Pending Requests, error: ${err}`);
    }
};

const addVerifiedStudent = async (req: Request, res: Response) => {
    const studentInfo = new Student({ ...req.body }).info();
    studentInfo.isVerified = true;

    try {
        const docRef = firestore.doc(`students/${studentInfo.email}`) as DocumentReference<StudentInfo>;

        if ((await docRef.get()).exists)
            return res.status(500).send("This Email Already Exists as a Student.");

        const password = randomBytes(6).toString('hex');
        const hashed = await bcrypt.hash(password, 10);

        docRef.set({ ...studentInfo, password: hashed }).catch(err => console.error(err));
        
        firestore.doc(`pendingStudents/${studentInfo.email}`).delete().catch(err => console.error(err));

        auth.createUser({
            email: studentInfo.email,
            password: password,
            emailVerified: true,
            disabled: false
        })

        sendMail(studentInfo.email, password);

        res.status(201).send("Student Verified Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Student, error: ${err}`);
    }
};

const updateStudent = async (req: Request, res: Response) => {
    const updatedStudent = new Student({ ...req.body }).info();
    const { email } = req.params;

    try {
        const docRef = firestore.doc(`students/${email}`) as DocumentReference<StudentInfo>;
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists)
            return res.status(404).send("Student Not Found.");

        if (email !== updatedStudent.email)
            return res.status(400).send("You Can't Update Your Email Address.");

        docRef.update(updatedStudent);

        res.status(200).send("Updated Student Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Updating The Student, error: ${err}`);
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const docRef = firestore.doc(`students/${email}`) as DocumentReference<StudentInfo>;
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists)
            return res.status(404).send("Student Already Doesn't Exist.");

        await docRef.delete();

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
    addVerifiedStudent,
    updateStudent,
    deleteStudent
};

export default studentController;
