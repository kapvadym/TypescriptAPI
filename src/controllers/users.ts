import { Request, Response } from 'express';
import * as userService from "../services/user.service";

import { catchAsync } from '../middlewares/catchAsync';


export const getUser = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const user = await userService.getUser(id);

  res.status(200).json(user);
})

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.status(200).json(users);
})

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const deletedUser = await userService.deleteUser(id);

  res.json(deletedUser);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { username } = req.body;

  const user = await userService.updateUser(id, username);
  await user.save()

  res.status(200).json(user);
});