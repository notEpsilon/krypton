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

export default studentRouter;
