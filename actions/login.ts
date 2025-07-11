"use server";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/lib/auth";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  // callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Please provide valid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false, // Mencegah redirect otomatis dari NextAuth
    });

    if (response?.error) {
      return { error: "Invalid email or password!" };
    }

    return { success: "Login successful!" };
  } catch (error) {
    // console.error(error);
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };
        case "CallbackRouteError":
          return { error: cause?.err?.toString() };
        default:
          return { error: "An unexpected error occurred." };
      }
    }
    return { error: "Something went wrong!" };
  }
};
