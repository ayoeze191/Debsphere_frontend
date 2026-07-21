import { Suspense } from "react";
import PaymentCallbackPage from "./callbackComponent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentCallbackPage />
    </Suspense>
  );
}
