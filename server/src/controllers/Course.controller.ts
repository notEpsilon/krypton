import { NextFunction, Request, Response } from 'express';
import { firestore } from '../firebase/firebase.util';
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

import Course from '../models/Course.model';
import Professor from '../models/Professor.model';
import Student from '../models/Student.model';
import { ProfessorInfo } from '../models/Professor.model';
import { StudentInfo } from '../models/Student.model';
import { CourseInfo } from '../models/Course.model';

const getAllCourses = async (req: Request, res: Response) => {
    try {
        const colRef = collection(firestore, 'courses') as CollectionReference<CourseInfo>;

        const snapshot = await getDocs(colRef);

        const courses: Array<CourseInfo> = [];
        snapshot.forEach(course => courses.push(course.data()));

        res.status(200).send(courses);
    }
    catch (err) {
        res.status(500).send(`Error Retrieving All Courses, error: ${err}`);
    }
}

const getDepartmentCourses = async (req: Request, res: Response,next:NextFunction) => {
    try {
        let name:any;
        if (req.originalUrl.includes("department")){name = req.params.name;}
        else if(res.locals.professorData){name = res.locals.professorData.department}
        else {throw(TypeError);}
        const colRef = collection(firestore, 'courses') as CollectionReference<CourseInfo>;

        const snapshot = await getDocs(colRef);

        const courses: Array<CourseInfo> = [];
        
        snapshot.forEach(course => {
            if(course.data().departmentsAvailableIn.includes(name)){
                courses.push(course.data());
            }
        });

        res.status(200).send(courses);
    }
    catch (err) {
        res.status(500).send(`Error Retrieving Department Courses, error: ${err}`);
    }
}

const getSingleCourse = async (req: Request, res: Response,next:NextFunction) => {
    const { code } = req.params;

    try {
        const courseDoc = await getDoc(doc(firestore, 'courses', code));

        if (!courseDoc.exists())
            return res.status(404).send("Course Not Found.");

        res.locals.courseData = courseDoc.data();
        if(!req.originalUrl.includes("/course/")){
            res.status(200).send(res.locals.professorData);
        }
        next();

    }
    catch (err) {
        res.status(500).send(`Error Retrieving The Courese, error: ${err}`);
    }
}

const addCourse = async (req: Request, res: Response) => {
    const courseInfo = new Course({ ...req.body }).info();
    
    try {
        const docRef = doc(firestore, 'courses', courseInfo.code) as DocumentReference<CourseInfo>;

        await setDoc<CourseInfo>(docRef, courseInfo);

        res.status(200).send("Course Added Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Course to the Database, error: ${err}`);
    }
}

const updateCourse = async (req: Request, res: Response,next: NextFunction) => {
    try {
        let updatedCourse,code;
        if (!req.originalUrl.includes("/course/")) {
            updatedCourse = new Course({ ...req.body }).info();
            code = req.params.code;
        }
        else{
            updatedCourse = res.locals.courseData;
            code = updatedCourse.code;
        }

        const docRef = doc(firestore, 'courses', code) as DocumentReference<CourseInfo>;
        const docSnapshot = await getDoc<CourseInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Course Not Found.");
        }
        await updateDoc<CourseInfo>(docRef, updatedCourse);

        if (!req.originalUrl.includes("/course/")){res.status(200).send("Updated Course Successfully.");}
        next();
    }
    catch (err) {
        res.status(500).send(`Error Updating The Course, error: ${err}`);
    }
}
const linkCourseToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let tempCourse = new Course(res.locals.courseData);
        let tempUser:Professor|Student;

        if(req.originalUrl.includes("/professor")){
            tempUser = new Professor(res.locals.professorData);
            tempCourse = tempCourse.addProfessor(tempUser.removeCourses())
        }
        else{
            tempUser = new Student(res.locals.studentData)
            tempCourse = tempCourse.addStudent(tempUser.removeCourses());
        }

        res.locals.courseData = tempCourse.info();
        console.log(res.locals.courseData.professorArray[0].professorInfo)
        
        res.locals.userData = tempUser.info();
        console.log(res.locals.userData.courseArray[0].courseInfo.professorArray[0].professorInfo);

        res.send(res.locals.userData);


        next();
    }
    catch (err) {
        res.status(500).send(`Error Joining The Course, error: ${err}`);
    }
}

// const deleteCourse = async () => {
//      TODO: Check if deleting the course file is going to remove the student and professor's courses or make a local error
// }

const courseController = {
    getAllCourses,
    getDepartmentCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    linkCourseToUser
};

export default courseController;