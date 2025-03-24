// import { getUsers } from "@/actions/users";
import { getCurrentUser } from "@/actions/user";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const page = async () => {
  // const users = await getUsers()
  const { user } = await getCurrentUser()
  // if (!user) {
  //   // return redirect("/login")
  // }
  return (
    <Suspense fallback="Loading...">
      <div className="flex justify-evenly ">
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button type="submit" className="bg-red-500">logout</Button>
        </form>
        <Link href={"/dashboard/admin/users"} type="button" className="text-blue-500 cursor-pointer">redirect to users</Link>
        <Link href={"/dashboard/tickets"} type="button" className="text-green-500 cursor-pointer" >redirect to Tickets</Link>
        <Link href={`/dashboard/${user?.id}/profile`} type="button" className="text-green-500 cursor-pointer" >redirect to Tickets</Link>
        <div>
          <h1>toggle</h1>
          <ModeToggle />
        </div>
      </div>
    </Suspense>
  )
};

export default page; 