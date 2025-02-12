import { auth } from "@/auth";
import React from "react";
import { DataTable } from "./components/data-table";
import { User } from "@prisma/client";

const page =async  () => {
  const user =await auth();
  console.log({user});
  if (!user) return <></>
  return (
    <DataTable user={user} />
  )
};

export default page;