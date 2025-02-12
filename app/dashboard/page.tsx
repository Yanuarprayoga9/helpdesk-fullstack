import { auth } from "@/auth";
import React from "react";

const page =async  () => {
  const user =await auth();
  console.log({user});
  return <div>page</div>;
};

export default page;