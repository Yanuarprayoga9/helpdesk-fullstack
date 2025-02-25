"use client";
import { useEffect } from "react";
import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
      });
    }
  }, []);

  return <LoginForm />;
}
