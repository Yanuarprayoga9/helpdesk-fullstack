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

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().min(1, "Title is required").max(100, "Title too long"),
  images: z.object({ url: z.string() }).array(),
  assignees: z.array(z.string()).default([]), // Default ke array kosong
  status: z.string().optional(),
  priority: z.string().min(1, "Status is required").max(100, "Status too long"),
  project: z.string().min(1, "Project is required").max(100, "Project too long"),
  category: z.string().min(1, "Category is required").max(100, "Category too long"),
});


export const addAssigneesSchema = z.object({
  assignees: z.array(z.string()).default([]),
});


export const assignmentRequestSchema = z.object({
    ticketId: z.string(),
    requestedById: z.string(),
    notes: z.string().optional()
});
