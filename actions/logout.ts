"use server";

import { signOut } from "@/lib/auth";

export const logout = async () => {
  try {
    await signOut({ redirect: false });

  } catch (error) {
    console.log(error)
  }
};
