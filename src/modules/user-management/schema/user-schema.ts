import { z } from "zod";

export const userFromSchema = z.object({
  id: z.string(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(["admin", "editor", "viewer"]),
  comment: z.string().optional(),
});

export type UserFromType = z.infer<typeof userFromSchema>;
