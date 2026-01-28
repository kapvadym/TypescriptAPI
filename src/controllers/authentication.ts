import { Request, Response } from "express";
import * as authServices from "../services/auth.service";

import { catchAsync } from "../middlewares/catchAsync";

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authServices.login(email, password);

  res.cookie("USER-AUTH", user.authentication.sessionToken, { path: "/", httpOnly: true });
  res.status(200).json(user);
});

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  const user = await authServices.register(email, password, username);

  res.status(200).json(user);
});