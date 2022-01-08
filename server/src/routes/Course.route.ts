import express from 'express';
import courseController from '../controllers/Course.controller';

const courseRouter = express.Router();
/**
 * @description get all students
 * @route /users/students
 * @method GET
*/
courseRouter.get('/', courseController.getAllCourses);

/**
 * @description get single student
 * @route /users/students/:email
 * @method GET
*/
courseRouter.get('/:code', courseController.getSingleCourse);

/**
 * @description add a student
 * @route /users/students
 * @method POST
*/
courseRouter.post('/', courseController.addCourse);

/**
 * @description update a student
 * @route /users/students/:email
 * @method PUT
*/
courseRouter.put('/:code', courseController.updateCourse);

// /**
//  * @description delete a student
//  * @route /users/students/:email
//  * @method DELETE
// */
// studentRouter.delete('/:email', studentController.deleteStudent);

export default courseRouter;
