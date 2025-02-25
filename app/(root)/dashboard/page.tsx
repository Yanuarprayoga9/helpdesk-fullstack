// import { getUsers } from "@/actions/users";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async () => {
  // const users = await getUsers()

  return (
    <Suspense fallback="Loading...">
      <Link href={"/dashboard/admin"}>tes</Link>
      <ModeToggle />
    </Suspense>
  )
};

export default page; 