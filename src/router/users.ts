import express from 'express';

import { deleteUser, getAllUsers, updateUser, getUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

import { validate } from '../middlewares/validate';
import { updateUserSchema } from '../validators/user.validator';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated ,getAllUsers);
  router.get('/users/:id', isAuthenticated, getUser);
  router.delete('/users/:id', isAuthenticated, isOwner ,deleteUser);
  router.patch('/users/:id', isAuthenticated, isOwner, validate(updateUserSchema), updateUser)
};