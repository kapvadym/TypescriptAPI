import { ZodTypeAny, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const validate = 
  (schema: ZodTypeAny) => 
    (req: Request, _res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          params: req.params,
          query: req.query,
        });
        next();
      } catch (error) {
        if(error instanceof ZodError) {
          const firstError = error.issues[0];

          throw new ApiError(
            400, 
            firstError?.message || "Validation error"
          );
        }

        throw new ApiError(400, "Invalid request data");
      }
    };