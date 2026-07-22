import React from "react";
import LoginPage from "../components/LoginForm";
import SignupPage from "../components/SjgnupForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ auth?: string }>;
}) {
  // ?auth=signup shows the signup form; anything else (or missing) defaults to login.
  const { auth } = await searchParams;

  return <div>{auth === "signup" ? <SignupPage /> : <LoginPage />}</div>;
}
