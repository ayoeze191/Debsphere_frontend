import VerifyEmailPage from "@/app/components/Verify-email";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Verifying...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
};

export default page;
