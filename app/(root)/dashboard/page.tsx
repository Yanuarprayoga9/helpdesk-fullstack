// import { getUsers } from "@/actions/users";
import { signOut } from "@/auth";
import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async () => {
  // const users = await getUsers()

  return (
    <Suspense fallback="Loading...">
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">logout</button>
      </form>
      <Link href={"/dashboard/admin"}>tes</Link>
      <ModeToggle />
    </Suspense>
  )
};

export default page; 