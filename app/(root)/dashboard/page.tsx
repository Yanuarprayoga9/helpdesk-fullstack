// import { getUsers } from "@/actions/users";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React from "react";

const page = async () => {
  // const users = await getUsers()

  return (
    <>
      <Link href={"/dashboard/admin"}>tes</Link>
      <ModeToggle />
    </>
  )
};

export default page; 