import express from 'express';
import userController from './../controllers/userController';

const router = express.Router();

router.route('/top-3-youngest').get(userController.aliasTopYoungs, userController.getAllUsers);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

export default router;
