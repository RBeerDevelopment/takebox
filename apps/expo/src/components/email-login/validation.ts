import { z } from "zod";

export const emailLoginSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
