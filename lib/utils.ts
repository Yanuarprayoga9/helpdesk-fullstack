import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Membandingkan password yang diinput dengan password yang di-hash di database
 * @param plainPassword - Password asli (plaintext) yang dimasukkan pengguna
 * @param hashedPassword - Password yang sudah di-hash yang tersimpan di database
 * @returns {Promise<boolean>} - Mengembalikan true jika cocok, false jika tidak
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
    // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Generate salt dengan 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


// Helper function to format dates that could be strings or Date objects
export const formatDate = (date: Date | string) => {
  if (typeof date === "string") {
    return format(new Date(date), "MMM d, yyyy")
  }
  return format(date, "MMM d, yyyy")
}


export type SelectorsType = {
  label: string
  value: string 
}
export function mapAndSort<T>(
  array: T[] = [],
  getLabel: (item: T) => string,
  getValue: (item: T) => string 
): SelectorsType[] {
  return array
    .map(item => ({
      label: getLabel(item),
      value: getValue(item),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}