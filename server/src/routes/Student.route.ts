import express from 'express';
import courseController from '../controllers/Course.controller';
import studentController from '../controllers/Student.controller';

const studentRouter = express.Router();

/**
 * @description get all students
 * @route /users/students
 * @method GET
*/
studentRouter.get('/', studentController.getAllStudents);

/**
 * @description get single student
 * @route /users/students/:email
 * @method GET
*/
studentRouter.get('/:email', studentController.getSingleStudent);

/**
 * @description update a student
 * @route /users/students/:email
 * @method PUT
*/
studentRouter.put('/:email', studentController.updateStudent);

/**
 * @description delete a student
 * @route /users/students/:email
 * @method DELETE
*/
studentRouter.delete('/:email', studentController.deleteStudent);

/**
 * @description Get all courses the students is in
 * @route /users/students/:email/course
 * @method GET
*/
studentRouter.get('/:email/course', studentController.getSingleStudent, studentController.getAllStudentCourses);

/**
 * @description Get all available courses a student can register in
 * @route /users/students/:email/course/available
 * @method GET
*/
studentRouter.get('/:email/course/available', studentController.getSingleStudent, courseController.getDepartmentCourses);

/**
 * @description Get a specific course that the student is in 
 * @route /users/students/:email/course/:code
 * @method GET
*/
studentRouter.get('/:email/course/:code', studentController.getSingleStudent, studentController.getSingleStudentCourse);

/**
 * @description Join a course
 * @route /users/students/:email/course/available/:code
 * @method PUT
*/
studentRouter.put('/:email/course/available/:code', 
 studentController.getSingleStudent,
 courseController.getSingleCourse,
 courseController.linkCourseToUser,
 courseController.updateCourse, 
 studentController.updateStudent);

/**
 * @description Add a pending student
 * @route /users/students
 * @method POST
*/
studentRouter.post('/', studentController.addStudent);

/**
 * @description Get single pending student
 * @route /users/students/pending/:email
 * @method GET
*/
studentRouter.get('/pending/:email', studentController.getSinglePendingStudent);

/**
 * @description Append the student to the students file
 * @route /users/students/pending/:email
 * @method PUT
*/
studentRouter.put('/pending/:email', studentController.getSinglePendingStudent, studentController.acceptStudent, studentController.deletePendingStudent);

/**
 * @description delete a pending student
 * @route /users/students/pending/:email
 * @method DELETE
*/
studentRouter.delete('/pending/:email', studentController.deletePendingStudent);

export default studentRouter;
