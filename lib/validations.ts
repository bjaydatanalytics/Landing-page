import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  serviceInterest: z.string().min(2),
  message: z.string().min(10),
  honeypot: z.string().optional(),
});