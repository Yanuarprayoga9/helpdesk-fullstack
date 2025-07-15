# Dokumentasi Lengkap NextAuth.js v5 (Auth.js)

## 1. Konfigurasi Dasar

| Komponen | Deskripsi | Contoh Penggunaan |
|----------|-----------|-------------------|
| `NextAuth()` | Konfigurasi utama Auth.js | `export const { handlers, auth, signIn, signOut } = NextAuth({ providers: [...] })` |
| `auth.config.ts` | File konfigurasi terpisah | `export default { providers: [...], callbacks: {...} } satisfies NextAuthConfig` |
| `middleware.ts` | Middleware untuk proteksi route | `export { default } from "next-auth/middleware"` |

## 2. Providers

| Provider Type | Deskripsi | Contoh Penggunaan |
|---------------|-----------|-------------------|
| `Google` | Google OAuth | `Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })` |
| `GitHub` | GitHub OAuth | `GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET })` |
| `Discord` | Discord OAuth | `Discord({ clientId: process.env.DISCORD_CLIENT_ID, clientSecret: process.env.DISCORD_CLIENT_SECRET })` |
| `Credentials` | Custom credentials | `Credentials({ credentials: { email: {}, password: {} }, authorize: async (credentials) => {...} })` |
| `Email` | Magic link email | `Email({ server: "smtp://...", from: "noreply@example.com" })` |
| `Apple` | Apple OAuth | `Apple({ clientId: process.env.APPLE_ID, clientSecret: process.env.APPLE_SECRET })` |
| `Facebook` | Facebook OAuth | `Facebook({ clientId: process.env.FACEBOOK_CLIENT_ID, clientSecret: process.env.FACEBOOK_CLIENT_SECRET })` |
| `Twitter` | Twitter OAuth | `Twitter({ clientId: process.env.TWITTER_CLIENT_ID, clientSecret: process.env.TWITTER_CLIENT_SECRET })` |

## 3. Handlers & API Routes

| Handler | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| `handlers.GET` | GET request handler | `export const { GET, POST } = handlers` |
| `handlers.POST` | POST request handler | `export const { GET, POST } = handlers` |
| Route Handler | App Router API route | `// app/api/auth/[...nextauth]/route.ts` |
| Pages API | Pages Router API route | `// pages/api/auth/[...nextauth].ts` |

## 4. Authentication Functions

| Function | Deskripsi | Contoh Penggunaan |
|----------|-----------|-------------------|
| `signIn()` | Login user | `await signIn("google")` |
| `signOut()` | Logout user | `await signOut()` |
| `auth()` | Get session server-side | `const session = await auth()` |
| `unstable_update()` | Update session | `await unstable_update({ name: "New Name" })` |

## 5. Client-Side Hooks & Functions

| Hook/Function | Deskripsi | Contoh Penggunaan |
|---------------|-----------|-------------------|
| `useSession()` | Get session client-side | `const { data: session, status } = useSession()` |
| `signIn()` | Client-side sign in | `import { signIn } from "next-auth/react"; signIn("google")` |
| `signOut()` | Client-side sign out | `import { signOut } from "next-auth/react"; signOut()` |
| `getSession()` | Get session programmatically | `const session = await getSession()` |
| `getCsrfToken()` | Get CSRF token | `const csrfToken = await getCsrfToken()` |
| `getProviders()` | Get available providers | `const providers = await getProviders()` |

## 6. Session Provider

| Komponen | Deskripsi | Contoh Penggunaan |
|----------|-----------|-------------------|
| `SessionProvider` | Context provider untuk session | `<SessionProvider session={session}><App /></SessionProvider>` |
| `session` prop | Initial session data | `<SessionProvider session={pageProps.session}>` |
| `basePath` | Custom base path | `<SessionProvider basePath="/custom-auth">` |
| `refetchInterval` | Auto-refresh interval | `<SessionProvider refetchInterval={300}>` |

## 7. Callbacks

| Callback | Deskripsi | Contoh Penggunaan |
|----------|-----------|-------------------|
| `signIn` | Kontrol akses login | `signIn: async ({ user, account, profile }) => { return true }` |
| `redirect` | Redirect setelah login | `redirect: async ({ url, baseUrl }) => { return baseUrl }` |
| `jwt` | Modifikasi JWT token | `jwt: async ({ token, user, account }) => { return token }` |
| `session` | Modifikasi session object | `session: async ({ session, token }) => { return session }` |
| `authorized` | Middleware authorization | `authorized: async ({ auth, request }) => { return !!auth?.user }` |

## 8. Adapters

| Adapter | Deskripsi | Contoh Penggunaan |
|---------|-----------|-------------------|
| `PrismaAdapter` | Database dengan Prisma | `import { PrismaAdapter } from "@auth/prisma-adapter"; adapter: PrismaAdapter(prisma)` |
| `DrizzleAdapter` | Database dengan Drizzle | `import { DrizzleAdapter } from "@auth/drizzle-adapter"; adapter: DrizzleAdapter(db)` |
| `MongoDBAdapter` | MongoDB adapter | `import { MongoDBAdapter } from "@auth/mongodb-adapter"; adapter: MongoDBAdapter(client)` |
| `SupabaseAdapter` | Supabase adapter | `import { SupabaseAdapter } from "@auth/supabase-adapter"; adapter: SupabaseAdapter(supabase)` |

## 9. Middleware Configuration

| Option | Deskripsi | Contoh Penggunaan |
|--------|-----------|-------------------|
| `matcher` | Route patterns | `export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] }` |
| `authorized` | Custom authorization | `authorized: ({ auth, request }) => { return !!auth?.user }` |
| `pages` | Custom pages | `pages: { signIn: "/auth/signin", error: "/auth/error" }` |
| `callbacks` | Middleware callbacks | `export default auth((req) => { /* custom logic */ })` |
| `redirect` | Conditional redirects | `return NextResponse.redirect(new URL("/login", req.url))` |
| `rewrite` | URL rewriting | `return NextResponse.rewrite(new URL("/dashboard", req.url))` |
| `nextUrl` | Access request URL | `const { pathname } = req.nextUrl` |
| `auth` | Access session in middleware | `const isLoggedIn = !!req.auth` |

## 10. Pages Configuration

| Page | Deskripsi | Contoh Penggunaan |
|------|-----------|-------------------|
| `signIn` | Custom sign in page | `pages: { signIn: "/auth/signin" }` |
| `signOut` | Custom sign out page | `pages: { signOut: "/auth/signout" }` |
| `error` | Custom error page | `pages: { error: "/auth/error" }` |
| `verifyRequest` | Email verification page | `pages: { verifyRequest: "/auth/verify-request" }` |
| `newUser` | New user redirect | `pages: { newUser: "/welcome" }` |

## 11. Session Configuration

| Option | Deskripsi | Contoh Penggunaan |
|--------|-----------|-------------------|
| `strategy` | Session strategy | `session: { strategy: "jwt" }` atau `session: { strategy: "database" }` |
| `maxAge` | Session duration | `session: { maxAge: 30 * 24 * 60 * 60 }` (30 days) |
| `updateAge` | Update session age | `session: { updateAge: 24 * 60 * 60 }` (24 hours) |
| `generateSessionToken` | Custom session token | `session: { generateSessionToken: () => crypto.randomUUID() }` |

## 12. Events Configuration

| Event | Deskripsi | Contoh Penggunaan |
|-------|-----------|-------------------|
| `signIn` | User signed in | `events: { signIn: async ({ user, account }) => { console.log("Sign in:", user.email) } }` |
| `signOut` | User signed out | `events: { signOut: async ({ session }) => { console.log("Sign out") } }` |
| `createUser` | New user created | `events: { createUser: async ({ user }) => { console.log("New user:", user.email) } }` |
| `updateUser` | User updated | `events: { updateUser: async ({ user }) => { console.log("User updated:", user.email) } }` |
| `linkAccount` | Account linked | `events: { linkAccount: async ({ user, account }) => { console.log("Account linked") } }` |
| `session` | Session accessed | `events: { session: async ({ session }) => { console.log("Session accessed") } }` |

## 13. Environment Variables

| Variable | Deskripsi | Contoh |
|----------|-----------|---------|
| `AUTH_SECRET` | Secret key untuk encryption | `AUTH_SECRET=your-secret-key` |
| `AUTH_URL` | Base URL aplikasi | `AUTH_URL=http://localhost:3000` |
| `AUTH_TRUST_HOST` | Trust host header | `AUTH_TRUST_HOST=true` |
| `NEXTAUTH_URL` | Legacy URL (v4 compatibility) | `NEXTAUTH_URL=http://localhost:3000` |

## 14. Session Object Properties

| Property | Deskripsi | Contoh Akses |
|----------|-----------|--------------|
| `user` | User information | `session.user.name, session.user.email` |
| `expires` | Session expiration | `session.expires` |
| `accessToken` | Access token (jika ada) | `session.accessToken` |
| `refreshToken` | Refresh token (jika ada) | `session.refreshToken` |

## 15. Error Handling

| Error Type | Deskripsi | Contoh Handling |
|------------|-----------|-----------------|
| `AuthError` | Base auth error | `import { AuthError } from "next-auth"` |
| `CredentialsSignin` | Credentials login error | `catch (error) { if (error instanceof CredentialsSignin) {...} }` |
| `CallbackRouteError` | Callback route error | `pages: { error: "/auth/error" }` |
| `AccessDenied` | Access denied error | `if (error.type === "AccessDenied") {...}` |

## 16. Konfigurasi Lengkap

### auth.ts (Konfigurasi Utama)
```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Validasi credentials
        const user = await validateUser(credentials.email, credentials.password)
        return user ? { id: user.id, email: user.email, name: user.name } : null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
    authorized: async ({ auth, request }) => {
      const { pathname } = request.nextUrl
      if (pathname.startsWith("/admin")) {
        return auth?.user?.role === "admin"
      }
      return !!auth?.user
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    signIn: async ({ user, account, profile }) => {
      console.log("User signed in:", user.email)
    },
    signOut: async ({ session, token }) => {
      console.log("User signed out")
    }
  }
})
```

### middleware.ts
```typescript
import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Protected routes
  const isProtectedRoute = ["/dashboard", "/profile", "/admin"].some(path => 
    nextUrl.pathname.startsWith(path)
  )

  // Admin routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  const isAdmin = req.auth?.user?.role === "admin"

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl))
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
```

### app/api/auth/[...nextauth]/route.ts
```typescript
import { handlers } from "@/auth"

export const { GET, POST } = handlers
```

### Client Component Example
```tsx
"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  )
}
```

### Server Component Example
```tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  )
}
```

## 17. Migration dari v4 ke v5

| v4 | v5 | Perubahan |
|----|----|-----------| 
| `import NextAuth from "next-auth"` | `import { NextAuth } from "next-auth"` | Named import |
| `export default NextAuth({...})` | `export const { handlers, auth } = NextAuth({...})` | Destructured exports |
| `getServerSession()` | `auth()` | Simplified server session |
| `useSession()` | `useSession()` | No change |
| `getSession()` | `getSession()` | No change |
| `session.user.image` | `session.user.image` | No change |

## 18. TypeScript Types

| Type | Deskripsi | Contoh Penggunaan |
|------|-----------|-------------------|
| `NextAuthConfig` | Configuration type | `const config: NextAuthConfig = {...}` |
| `User` | User object type | `interface User { id: string; email: string; name: string }` |
| `Session` | Session object type | `interface Session { user: User; expires: string }` |
| `JWT` | JWT token type | `interface JWT { id: string; role: string }` |

## Tips Penggunaan

1. **Gunakan `auth()` untuk server-side**: Lebih efisien daripada `getServerSession()`
2. **Middleware untuk proteksi**: Gunakan middleware untuk route protection
3. **Custom pages**: Buat halaman login/logout custom untuk UX yang lebih baik
4. **Error handling**: Selalu handle error dengan proper error pages
5. **TypeScript**: Extend types untuk custom properties
6. **Environment variables**: Gunakan `.env.local` untuk development
7. **Session strategy**: Pilih JWT atau database session sesuai kebutuhan
8. **Adapter**: Gunakan adapter yang sesuai dengan database pilihan