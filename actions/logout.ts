"use server";

import { signOut } from "@/lib/auth";

export const logout = async (): Promise<void> => {
  try {
    await signOut({ redirect: false });
  } catch {
    // Silently ignore logout errors
  }
};