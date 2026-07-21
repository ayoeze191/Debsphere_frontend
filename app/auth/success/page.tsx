import { Suspense } from "react";
import AuthSuccessPage from "./successComponent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AuthSuccessPage />
    </Suspense>
  );
}
