import { Request, Response } from 'express';
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

const getSingleCourse = async (req: Request, res: Response) => {
    const { code } = req.params;

    try {
        const courseDoc = await getDoc(doc(firestore, 'courses', code));

        if (!courseDoc.exists())
            return res.status(404).send("Course Not Found.");

        res.status(200).send(courseDoc.data());
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

const updateCourse = async (req: Request, res: Response) => {
    const updatedCourse = new Course({ ...req.body }).info();
    const { code } = req.params;

    try {
        const docRef = doc(firestore, 'courses', code) as DocumentReference<CourseInfo>;
        const docSnapshot = await getDoc<CourseInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Student Not Found.");
        }

        await updateDoc<CourseInfo>(docRef, updatedCourse);

        res.status(200).send("Updated Course Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Updating The Course, error: ${err}`);
    }
}

// const deleteCourse = async () => {
//      TODO: Check if deleting the course file is going to remove the student and professor's courses or make a local error
// }

const courseController = {
    getAllCourses,
    getSingleCourse,
    addCourse,
    updateCourse
};

export default courseController;