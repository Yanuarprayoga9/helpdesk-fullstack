import { getUserRolesById } from "@/actions/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await auth();
  if (!user) redirect('/login')
  const roles = await getUserRolesById(user?.user?.id)
  console.log({ user,roles });
  if (!user) return <></>
  return (
    <>test</>
  )
};

export default page;