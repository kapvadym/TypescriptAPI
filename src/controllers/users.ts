import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

import { catchAsync } from '../middlewares/catchAsync';
import { ApiError } from '../errors/ApiError';

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  if(!id) {
    throw new ApiError(403, "Invalid id");
  }

  const user = await getUserById(id);
  if(!user) {
    throw new ApiError(403, "Invalid user");
  }

  res.status(200).json(user);
})

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await getUsers();

  if(!users) {
    throw new ApiError(404, "Users not found")
  }

  res.status(200).json(users);
})

export const deleteUser = async(req: Request, res: Response) => {
  const id = String(req.params.id);

  const deletedUser = await deleteUserById(id);

  res.json(deletedUser);
}

export const updateUser = async(req: Request, res: Response) => {
  const id = String(req.params.id);
  const { username } = req.body;

  if(!username) {
    throw new ApiError(400, "Invalid username");
  }

  const user = await getUserById(id);
  user.username = username
  await user.save()

  res.status(200).json(user);
}