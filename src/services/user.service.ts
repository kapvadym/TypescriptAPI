import { deleteUserById, getUserById, getUsers } from '../db/users';

import { ApiError } from "../errors/ApiError";

export const getUser = async (id: string) => {
  if(!id) {
    throw new ApiError(403, "Invalid id");
  }

  const user = await getUserById(id);
  if(!user) {
    throw new ApiError(403, "Invalid user");
  }

  return user;
}

export const getAllUsers = async () => {
  const users = await getUsers();

  if(!users) {
    throw new ApiError(404, "Users not found")
  }

  return users;
}

export const deleteUser = async(id: string) => {
  if(!id){
    throw new ApiError(400, "Invalid id")
  }
  const deletedUser = await deleteUserById(id);

  return deletedUser;
}

export const updateUser = async(id: string, username: string) => {
  const user = await getUserById(id);
  user.username = username

  return user;
}