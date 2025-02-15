import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const user = await auth();
  console.log({ user });
  if (!user) return <></>
  return (
    <></>
  )
};

export default page;