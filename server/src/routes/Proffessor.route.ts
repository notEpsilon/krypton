import express from 'express';
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

/**
 * @description Get all courses the professor teaches
 * @route /users/professors/:email/course
 * @method GET
 */

/**
 * @description Get a specific coure the professor teaches
 * @route /users/professors/:email/course/:code
 * @method GET
 */

/**
 * @description Get all available courses the professor can teach in
 * @route /users/professors/:email/course/available
 * @method GET
 */

/**
 * @description Join an available course
 * @route /users/professors/:email/course/available/:code
 * @method PUT
 */




export default professorRouter;
