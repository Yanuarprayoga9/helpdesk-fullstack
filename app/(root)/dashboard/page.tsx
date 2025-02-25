// import { getUsers } from "@/actions/users";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async () => {
  // const users = await getUsers()

  return (
    <Suspense fallback="Loading...">
      <div className="flex justify-between space-x-4">
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button type="submit" className="bg-red-500">logout</Button>
        </form>
        <Link href={"/dashboard/admin/users"}>redirect to users</Link>
        <div>
          <h1>toggle</h1>
          <ModeToggle />
        </div>
      </div>
    </Suspense>
  )
};

export default page; 