import express from 'express';
import courseController from '../controllers/Course.controller';
import professorController from '../controllers/Professor.controller';


const professorRouter = express.Router();

/**
 * @description get all professors
 * @route /users/professors
 * @method GET
*/
professorRouter.get('/', professorController.getAllProfessors);

/**
 * @description get single professor
 * @route /users/professors/:email
 * @method GET
*/
professorRouter.get('/:email', professorController.getSingleProfessor);

/**
 * @description add a professor
 * @route /users/professors
 * @method POST
*/
professorRouter.post('/', professorController.addProfessor);

/**
 * @description update a professor
 * @route /users/professors/:email
 * @method PUT
*/
professorRouter.put('/:email', professorController.updateProfessor);

/**
 * @description delete a professor
 * @route /users/professors/:email
 * @method DELETE
*/
professorRouter.delete('/:email', professorController.deleteProfessor);

/**
 * @description Get all courses the professor teaches
 * @route /users/professors/:email/course
 * @method GET
 */
professorRouter.get('/:email/course', professorController.getSingleProfessor, professorController.getAllProfessorCourses);

/**
 * @description Get all available courses the professor can teach in
 * @route /users/professors/:email/course/available
 * @method GET
 */
professorRouter.get('/:email/course/available', professorController.getSingleProfessor, courseController.getDepartmentCourses);

/**
 * @description Get a specific course the professor teaches
 * @route /users/professors/:email/course/:code
 * @method GET
 */
professorRouter.get('/:email/course/:code', professorController.getSingleProfessor, professorController.getSingleProfessorCourse);

/**
 * @description Join an available course
 * @route /users/professors/:email/course/available/:code
 * @method PUT
 */
professorRouter.get('/:email/course/available/:code', professorController.getSingleProfessor,
 courseController.getSingleCourse,
 courseController.linkCourseToUser,
 courseController.updateCourse, 
 professorController.updateProfessor);


export default professorRouter;
