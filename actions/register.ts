"use server";
import * as z from "zod";
import { DaftarSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof DaftarSchema>) => {
  const validatedFields = DaftarSchema.safeParse(values);

  if (!validatedFields.success) return { error: "invalid fields!" };

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email sudah digunakan!" };
  }
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return { success: "Daftar akun berhasil silahkan login" };
};
