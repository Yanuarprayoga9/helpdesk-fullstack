import React, { Suspense } from "react";
import { LoginForm } from "./_components/login-form";

const LoginPage = async () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
};

export default LoginPage;
