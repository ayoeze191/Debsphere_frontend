"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthService from "@/services/auth";
import { useAuthStore } from "@/store/auth";

export function AuthGuard({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let active = true;
    const requestedPath = `${pathname}${window.location.search}`;
    const loginUrl = adminOnly
      ? "/admin/login"
      : `/auth?next=${encodeURIComponent(requestedPath)}`;

    async function verifySession() {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.replace(loginUrl);
        return;
      }

      try {
        const response = await AuthService.getUser();
        const user = response.user;
        if (adminOnly && user.role !== "ADMIN") {
          router.replace("/admin/login");
          return;
        }
        if (active) {
          setUser(user);
          setAllowed(true);
        }
      } catch {
        window.localStorage.removeItem("token");
        router.replace(loginUrl);
      }
    }

    void verifySession();
    return () => {
      active = false;
    };
  }, [adminOnly, pathname, router, setUser]);

  if (!allowed) {
    return <div className="min-h-screen" style={{ background: "var(--paper)" }} aria-busy="true" />;
  }

  return <>{children}</>;
}
