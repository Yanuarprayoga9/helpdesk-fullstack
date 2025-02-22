import { auth } from "@/auth";
import { ModeToggle } from "@/components/theme-toggle";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await auth();
  if (!user) redirect('/login')

  if (!user) return <></>
  return (
    <ModeToggle />
  )
};

export default page; 