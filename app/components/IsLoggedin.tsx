"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const openRoutes = ["/auth"];

export const IsLoggedIn = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token && !openRoutes.includes(pathname)) {
      router.replace("/auth");
    } else {
      router.replace("/dashboard/learn");
    }
  }, [pathname, router]);

  return null;
};
