
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import bcrypt from "bcryptjs";

/**
 * Menggabungkan class names dengan tailwind-merge untuk menghindari konflik kelas CSS
 * @param inputs - Array dari class values yang akan digabungkan
 * @returns {string} - String class names yang sudah digabungkan
 */
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

/**
 * Meng-hash password menggunakan bcrypt dengan salt 10 rounds
 * @param password - Password plaintext yang akan di-hash
 * @returns {Promise<string>} - Password yang sudah di-hash
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10); // Generate salt dengan 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Memformat tanggal ke dalam format yang mudah dibaca
 * @param date - Objek Date atau string tanggal
 * @returns {string} - Tanggal dalam format "MMM d, yyyy"
 */
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

/**
 * Mengubah array menjadi format selector dan mengurutkannya berdasarkan label
 * @param array - Array data yang akan diubah
 * @param getLabel - Function untuk mendapatkan label dari setiap item
 * @param getValue - Function untuk mendapatkan value dari setiap item
 * @returns {SelectorsType[]} - Array objek dengan property label dan value yang sudah diurutkan
 */
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