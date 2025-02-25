"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { logout } from "@/actions/logout";

export default function SignOutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out..."); // Menampilkan loading toast
    
    try {
      await logout();
      toast.success("Logged out successfully!", { id: toastId }); // Menampilkan success toast
      router.push("/logout");
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
      toast.error("Logout failed. Please try again.", { id: toastId }); // Menampilkan error toast
    }
  };

  return (
    <form action={handleLogout}>
      <Button variant="ghost" type="submit">
        Sign Out
      </Button>
    </form>
  );
}
