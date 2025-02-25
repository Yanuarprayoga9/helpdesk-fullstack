import React, { Suspense } from "react";
import { LoginForm } from "./components/login-form";

const LoginPage = async () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
};

export default LoginPage;
