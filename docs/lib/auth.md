# Auth Configuration

Konfigurasi autentikasi menggunakan NextAuth.js dengan Prisma adapter dan Credentials provider.

## Dependencies

```bash
npm install next-auth @auth/prisma-adapter
npm install @prisma/client prisma
```

## Features

- **JWT Strategy**: Menggunakan JWT untuk session management
- **Credentials Provider**: Login dengan email dan password
- **Prisma Integration**: Menggunakan Prisma sebagai database adapter
- **Custom Login Page**: Redirect ke halaman login custom
- **Role-based Authentication**: Mendukung sistem role pengguna

## Configuration

### Session Strategy
Menggunakan JWT strategy untuk session management yang lebih scalable.

### Custom Pages
- **Sign In**: `/login` - Halaman login custom

### Callbacks

#### `signIn()`
Callback yang dipanggil saat proses sign in. Saat ini selalu mengembalikan `true`.

#### `jwt(args)`
Callback untuk mengelola JWT token. Menambahkan data user ke dalam token.

**Parameters:**
- `args.token` - JWT token object
- `args.user` - User object (jika ada)

**Returns:** JWT token dengan data user

#### `session(args)`
Callback untuk mengelola session. Mengambil data user dari token dan menambahkannya ke session.

**Parameters:**
- `args.session` - Session object
- `args.token` - JWT token object

**Returns:** Session dengan data user

### Providers

#### Credentials Provider
Menggunakan email dan password untuk autentikasi.

**Process:**
1. Validasi input menggunakan `LoginSchema`
2. Mencari user di database berdasarkan email
3. Memverifikasi password menggunakan `comparePassword`
4. Mengembalikan data user jika valid

## Types

```typescript
interface UserAuthType extends UserType {
  password: string;
}
```

## Database Schema Requirements

User table harus memiliki fields:
- `id` - Primary key
- `email` - Email address (unique)
- `password` - Hashed password
- `name` - User name
- `imageUrl` - Profile image URL
- `role` - Foreign key ke role table

## Usage Example

```typescript
import { auth, signIn, signOut } from "@/lib/auth";

// Get current session
const session = await auth();

// Sign in
await signIn("credentials", {
  email: "user@example.com",
  password: "password123",
  redirectTo: "/dashboard"
});

// Sign out
await signOut();
```

## Source Code

```typescript
import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { JWT } from "next-auth/jwt";
import { UserType } from "@/@types/user";
import prisma from "./db";
import { LoginSchema } from "@/schemas";
import { comparePassword } from "./utils";

/**
 * Konfigurasi NextAuth dengan JWT strategy dan Credentials provider
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /**
     * Callback saat proses sign in
     * @returns {boolean} - Selalu true untuk mengizinkan sign in
     */
    async signIn() {
      return true;
    },
    
    /**
     * Callback untuk mengelola JWT token
     * @param args - Object berisi token dan user
     * @returns {JWT} - JWT token dengan data user
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt(args: any) {
      const { token, user } = args as { token: JWT; user?: UserType };

      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          imageUrl: user.imageUrl,
        };
      }

      return token;
    },

    /**
     * Callback untuk mengelola session
     * @param args - Object berisi session dan token
     * @returns {Session} - Session dengan data user
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session(args: any) {
      const { session, token } = args as { session: Session; token: JWT };

      if (token.user) {
        session.user = token.user as UserType;
      }

      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      /**
       * Fungsi authorize untuk Credentials provider
       * @param credentials - Kredensial login (email, password)
       * @returns {UserType | null} - User object jika valid, null jika tidak
       */
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        
        const { email, password } = validatedFields.data;

        interface UserAuthType extends UserType {
          password: string;
        }
        
        const user: UserAuthType = await prisma.user.findFirst({
          where: { email },
          include: { role: true },
        });

        if (!user || !user.password) return null;

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          imageUrl: user.imageUrl,
        };
      },
    }),
  ],
} satisfies NextAuthConfig);
```

## Security Notes

- Password di-hash menggunakan bcrypt sebelum disimpan di database
- JWT token berisi data user yang diperlukan untuk authorization
- Session strategy menggunakan JWT untuk scalability
- Validasi input menggunakan schema validation