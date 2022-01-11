import { NextFunction, Request, Response } from 'express';
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
import { CourseInfo } from '../models/Course.model';

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

const getSingleStudent = async (req: Request, res: Response, next:NextFunction) => {
    const { email } = req.params;

    try {
        const studentDoc = await getDoc(doc(firestore, 'students', email));

        if (!studentDoc.exists())
            return res.status(404).send("Student Not Found.");
        if(!req.originalUrl.includes("/course")){
            res.status(200).send(studentDoc.data());
        }
        res.locals.studentData = studentDoc.data();
        next();
    }
    catch (err) {
        res.status(500).send(`Error Retrieving The Student, error: ${err}`);
    }
};

const getSinglePendingStudent = async (req: Request, res: Response,next:NextFunction) => {
    const { email } = req.params;

    try {
        const studentDoc = await getDoc(doc(firestore, 'pendingStudents', email));

        if (!studentDoc.exists())
            return res.status(404).send("Pending student Not Found.");

        if(req.method === "GET"){
            res.status(200).send(studentDoc.data());
        }
        else{
            res.locals.pendingStudentInfo = studentDoc.data();
        }
        next();
    }
    catch (err) {
        res.status(500).send(`Error Retrieving the pending student, error: ${err}`);
    }
};

const addStudent = async (req: Request, res: Response) => {
    const studentInfo = new Student({ ...req.body }).info();

    try {
        const docRef = doc(firestore, 'pendingStudents', studentInfo.email) as DocumentReference<StudentInfo>;

        await setDoc<StudentInfo>(docRef, studentInfo);

        res.status(200).send("Student Added to Pending Requests Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Student to The Pending Requests, error: ${err}`);
    }
};

const acceptStudent = async (req: Request, res: Response, next:NextFunction) => {
    res.locals.pendingStudentInfo.isVerified = true;
    let studentInfo = new Student(res.locals.pendingStudentInfo).info();
    try {
        const docRef = doc(firestore, 'students', studentInfo.email) as DocumentReference<StudentInfo>;
        await setDoc<StudentInfo>(docRef, studentInfo);

        next();
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Student to The Pending Requests, error: ${err}`);
    }
};

const updateStudent = async (req: Request, res: Response) => {
    let updatedStudent,email;
    if (!req.originalUrl.includes("/course/")) {
        updatedStudent = new Student({ ...req.body }).info();
        email = req.params.email;
    }
    else{
        updatedStudent = res.locals.userData;
        email = updatedStudent.email;
    }
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

const deletePendingStudent = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const docRef = doc(firestore, 'pendingStudents', email) as DocumentReference<StudentInfo>;
        const docSnapshot = await getDoc<StudentInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Pending Student Already Doesn't Exist.");
        }

        await deleteDoc(docRef);

        if(req.method === "DELETE"){
            res.status(200).send("Pending Student Deleted Successfully.");
        }
        else{
            res.status(200).send("Pending Student Accepted Successfully.");
        }
    }
    catch (err) {
        res.status(500).send(`Error Deleting The Student, error: ${err}`);
    }
};

const getAllStudentCourses = (req: Request, res: Response, next:NextFunction) => {
    try {
        if(res.locals.studentData){
            res.status(200).send(res.locals.studentData.courseArray);
        }
        else{
            res.status(500).send("Error Retrieving Courses")
        }
        next();
    } 
    catch (err) {
        res.status(500).send(`Error Retrieving All Professor's Courses, error: ${err}`)
    }
}

const getSingleStudentCourse = async (req: Request, res: Response,next:NextFunction) => {
    const { code } = req.params;
    try {
        if(res.locals.studentData){
            const courseArray:Array<CourseInfo>= res.locals.professorData.courseArray;
            courseArray.forEach((course)=>{
                if(course.code===code){
                    res.status(200).send(course);
                    }
                })
            res.status(400).send("Course not found");
            }
        else{
            res.status(500).send("Error Retrieving Courses")
        }
        next();
    } 
    catch (err) {
        res.status(500).send(`Error Retrieving Professor's Course, error: ${err}`)
    }
}

const studentController = {
    getAllStudents,
    getSingleStudent,
    addStudent,
    updateStudent,
    deleteStudent,
    getSinglePendingStudent,
    acceptStudent,
    deletePendingStudent,
    getAllStudentCourses,
    getSingleStudentCourse
};

export default studentController;
