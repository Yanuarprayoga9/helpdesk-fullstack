import * as z from "zod";


export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});


export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export const projectSchema = z.object({
  name: z.string().min(3, { message: "Project name must be at least 3 characters" }),
  imageUrl: z.string().url({ message: "Invalid image URL" }).optional().nullable(),
  userIds: z.array(z.string()).optional().default([]), // Default ke array kosong
});
