import express from 'express';
import courseController from '../controllers/Course.controller';

const courseRouter = express.Router();
/**
 * @description get all courses
 * @route /courses
 * @method GET
*/
courseRouter.get('/', courseController.getAllCourses);

/**
 * @description get single course
 * @route /courses/:email
 * @method GET
*/
courseRouter.get('/:code', courseController.getSingleCourse);

/**
 * @description get course by department
 * @route /courses/department/:name
 * @method GET
*/
courseRouter.get('/department/:name', courseController.getDepartmentCourses);

/**
 * @description add a course
 * @route /courses
 * @method POST
*/
courseRouter.post('/', courseController.addCourse);

/**
 * @description update a course
 * @route /courses/:email
 * @method PUT
*/
courseRouter.put('/:code', courseController.updateCourse);

// /**
//  * @description delete a course
//  * @route /courses/:email
//  * @method DELETE
// */
// courseRouter.delete('/:email', courseController.deletecourse);



export default courseRouter;
