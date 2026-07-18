import React, { Suspense } from "react";
import LoginPage from "../components/LoginForm";

const page = () => {
  return (
    <div>
      <Suspense>
        <LoginPage />
      </Suspense>
    </div>
  );
};

export default page;
