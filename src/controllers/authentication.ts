import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

import { ApiError } from "../errors/ApiError";
import { catchAsync } from "../middlewares/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await getUserByEmail(email)
    .select('+authentication.salt +authentication.password');

  if(!user){
    throw new ApiError(400, "Invalid email or password");
  }

  const expectedHash = authentication(user.authentication.salt, password);

  if(user.authentication.password !== expectedHash){
    throw new ApiError(403, "Invalid email or password");
  }

  const salt = random();
  user.authentication.sessionToken = authentication(salt, user._id.toString());
  await user.save()

  res.cookie('USER-AUTH', user.authentication.sessionToken, { 
    domain: 'localhost', 
    path: '/' 
  });

  res.status(200).json(user);
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if(!email || !password || !username) {
    throw new ApiError(400, "Email, password and username are required");
  }

  const existingUser = await getUserByEmail(email);

  if(existingUser) {
    throw new ApiError(409, "User already exists");
  }
  
  const salt = random();
  const user = await createUser({
    email,
    username,
    authentication: {
      salt,
      password: authentication(salt, password)
    },
  });

  res.status(200).json(user);
});