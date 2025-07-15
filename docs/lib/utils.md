# Helper Utils

Koleksi utility functions yang digunakan untuk berbagai keperluan dalam aplikasi.

## Dependencies

```bash
npm install clsx tailwind-merge date-fns bcryptjs
npm install -D @types/bcryptjs
```

## Functions

### `cn(...inputs: ClassValue[])`

Menggabungkan class names dengan tailwind-merge untuk menghindari konflik kelas CSS.

**Parameters:**
- `inputs` - Array dari class values yang akan digabungkan

**Returns:** `string` - String class names yang sudah digabungkan

**Example:**
```typescript
cn("px-4 py-2", "bg-blue-500", { "text-white": true })
// Output: "px-4 py-2 bg-blue-500 text-white"
```

### `comparePassword(plainPassword: string, hashedPassword: string)`

Membandingkan password plaintext dengan password yang sudah di-hash menggunakan bcrypt.

**Parameters:**
- `plainPassword` - Password asli (plaintext) yang dimasukkan pengguna
- `hashedPassword` - Password yang sudah di-hash yang tersimpan di database

**Returns:** `Promise<boolean>` - `true` jika password cocok, `false` jika tidak

**Example:**
```typescript
const isValid = await comparePassword("userPassword123", hashedPasswordFromDB);
if (isValid) {
  console.log("Password benar");
} else {
  console.log("Password salah");
}
```

### `hashPassword(password: string)`

Meng-hash password menggunakan bcrypt dengan salt 10 rounds.

**Parameters:**
- `password` - Password plaintext yang akan di-hash

**Returns:** `Promise<string>` - Password yang sudah di-hash

**Example:**
```typescript
const hashedPassword = await hashPassword("userPassword123");
// Save hashedPassword to database
```

### `formatDate(date: Date | string)`

Memformat tanggal ke dalam format yang mudah dibaca.

**Parameters:**
- `date` - Objek Date atau string tanggal

**Returns:** `string` - Tanggal dalam format "MMM d, yyyy" (contoh: "Jan 15, 2024")

**Example:**
```typescript
formatDate(new Date()) // "Dec 25, 2023"
formatDate("2023-12-25") // "Dec 25, 2023"
```

### `mapAndSort<T>(array: T[], getLabel: (item: T) => string, getValue: (item: T) => string)`

Mengubah array menjadi format selector dan mengurutkannya berdasarkan label.

**Parameters:**
- `array` - Array data yang akan diubah
- `getLabel` - Function untuk mendapatkan label dari setiap item
- `getValue` - Function untuk mendapatkan value dari setiap item

**Returns:** `SelectorsType[]` - Array objek dengan property `label` dan `value` yang sudah diurutkan

**Types:**
```typescript
export type SelectorsType = {
  label: string
  value: string 
}
```

**Example:**
```typescript
const users = [
  { id: "1", name: "John", email: "john@example.com" },
  { id: "2", name: "Alice", email: "alice@example.com" }
];

const userSelectors = mapAndSort(
  users,
  (user) => user.name,
  (user) => user.id
);

// Output:
// [
//   { label: "Alice", value: "2" },
//   { label: "John", value: "1" }
// ]
```

## Source Code

```typescript
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
```