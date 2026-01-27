import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)

  if(err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  res.status(500).json({ message: "Internal server Error" });
}