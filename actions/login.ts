"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { DEFAULT_ISLOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Please provide valid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: callbackUrl || DEFAULT_ISLOGIN_REDIRECT,
    }) as { error?: string; ok: boolean; url?: string };

    if (result && result.error) {
      return { error: "Invalid email or password!" };
    }

    redirect(callbackUrl || DEFAULT_ISLOGIN_REDIRECT);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };
        default:
          return { error: "An unexpected error occurred. Please try again!" };
      }
    }

    throw error;
  }
};
