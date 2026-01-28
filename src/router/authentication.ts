import express from "express";

import { login, register } from "../controllers/authentication";

import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.validator";

export default (router: express.Router) => {
  router.post('/auth/register', validate(registerSchema) ,register);
  router.post('/auth/login', validate(loginSchema),login);
}