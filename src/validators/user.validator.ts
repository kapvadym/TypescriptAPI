import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
  }),
});