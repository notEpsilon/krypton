import express from 'express';
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
 * @description add a student
 * @route /users/students
 * @method POST
*/
studentRouter.post('/', studentController.addStudent);

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

/**
 * @description Get a specific course
 * @route /users/students/:email/course/:code
 * @method GET
*/

/**
 * @description Get all available courses a student can register in
 * @route /users/students/:email/course/available
 * @method GET
*/

/**
 * @description Join a course
 * @route /users/students/:email/course/available/:code
 * @method PUT
*/

export default studentRouter;
