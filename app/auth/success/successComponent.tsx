"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthService from "@/services/auth";

function CellTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wider border"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: "var(--green)",
        borderColor: "var(--rule)",
        background: "var(--paper)",
      }}
    >
      {children}
    </span>
  );
}

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");

  useEffect(() => {
    async function authenticate() {
      try {
        const token = searchParams.get("token");
        if (!token) {
          router.replace("/login");
          return;
        }

        // Save the token
        localStorage.setItem("token", token);

        const user = await AuthService.getUser();

        // Save the user
        localStorage.setItem("user", JSON.stringify(user));

        // Go to dashboard
        router.replace("/dashboard/learn");
      } catch (error) {
        console.error(error);
        setStatus("error");
        router.replace("/login");
      }
    }

    authenticate();
  }, [router, searchParams]);

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen flex items-center justify-center"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        @keyframes ledger-spin { to { transform: rotate(360deg); } }
        .ledger-spinner {
          width: 40px;
          height: 40px;
          border: 2px solid var(--rule);
          border-top-color: var(--green);
          animation: ledger-spin 0.8s linear infinite;
        }
      `}</style>

      <div className="sans flex flex-col items-center text-center px-6">
        <div className="mb-8">
          <CellTag>
            {status === "error" ? "AUTH · ERROR" : "AUTH · VERIFYING"}
          </CellTag>
        </div>

        <div className="ledger-spinner mb-6" />

        <p
          className="serif text-xl font-medium"
          style={{ color: "var(--ink)" }}
        >
          {status === "error" ? "Something went wrong" : "Signing you in"}
        </p>
        <p
          className="mono text-xs mt-2 tracking-wide"
          style={{ color: "#8A93A2" }}
        >
          {status === "error"
            ? "Redirecting to login…"
            : "Verifying your session…"}
        </p>
      </div>
    </div>
  );
}
