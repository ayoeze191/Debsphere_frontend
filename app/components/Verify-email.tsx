// app/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import authService from "@/services/auth";
import { AxiosError } from "axios";

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

type Result =
  | { state: "verifying" }
  | { state: "success" }
  | { state: "failed"; message: string };

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<Result>({ state: "verifying" });

  const [resendEmail, setResendEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    async function verify() {
      const token = searchParams.get("token");

      if (!token) {
        setResult({
          state: "failed",
          message: "No verification token found in this link.",
        });
        return;
      }

      try {
        await authService.verifyEmail(token);
        setResult({ state: "success" });
      } catch (err) {
        if (err instanceof AxiosError) {
          setResult({
            state: "failed",
            message:
              err?.response?.data?.message ??
              "This verification link is invalid or has expired.",
          });
        }
      }
    }

    verify();
  }, [searchParams]);

  async function handleResend(e: React.FormEvent) {
    e.preventDefault();
    setResendStatus("sending");
    try {
      // await authService.resendVerification(resendEmail);
      setResendStatus("sent");
    } catch (err) {
      console.error(err);
      setResendStatus("error");
    }
  }

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
        .auth-input:focus { outline: none; border-color: var(--green) !important; }
        @keyframes ledger-spin { to { transform: rotate(360deg); } }
        .ledger-spinner {
          width: 40px; height: 40px;
          border: 2px solid var(--rule);
          border-top-color: var(--green);
          animation: ledger-spin 0.8s linear infinite;
        }
      `}</style>

      <div className="sans w-full max-w-md px-6">
        {result.state === "verifying" && (
          <div className="flex flex-col items-center text-center">
            <CellTag>EMAIL · VERIFYING</CellTag>
            <div className="ledger-spinner my-8" />
            <p className="serif text-xl font-medium">Verifying your email</p>
            <p className="mono text-xs mt-2" style={{ color: "#8A93A2" }}>
              Just a moment…
            </p>
          </div>
        )}

        {result.state === "success" && (
          <div className="border" style={{ borderColor: "var(--rule)" }}>
            <div className="flex flex-col items-center text-center p-10">
              <CheckCircle2
                size={36}
                style={{ color: "var(--green)" }}
                strokeWidth={1.5}
              />
              <div className="mt-4">
                <CellTag>EMAIL · VERIFIED</CellTag>
              </div>
              <p className="serif text-2xl font-semibold mt-4">
                You&apos;re all set
              </p>
              <p className="text-sm mt-2" style={{ color: "#6B7688" }}>
                Your email has been verified. You can sign in now.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => router.push("/auth")}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--green)" }}
              >
                Sign in <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {result.state === "failed" && (
          <div className="border" style={{ borderColor: "var(--rule)" }}>
            <div className="flex flex-col items-center text-center p-10">
              <XCircle
                size={36}
                style={{ color: "#B42318" }}
                strokeWidth={1.5}
              />
              <div className="mt-4">
                <CellTag>EMAIL · NOT VERIFIED</CellTag>
              </div>
              <p className="serif text-2xl font-semibold mt-4">
                Verification failed
              </p>
              <p className="text-sm mt-2 max-w-xs" style={{ color: "#6B7688" }}>
                {result.message}
              </p>
            </div>

            <div
              className="p-6 pt-0 border-t"
              style={{ borderColor: "var(--rule)" }}
            >
              {resendStatus === "sent" ? (
                <p
                  className="text-sm text-center pt-6"
                  style={{ color: "var(--green)" }}
                >
                  A new verification link has been sent to {resendEmail}.
                </p>
              ) : (
                <form onSubmit={handleResend} className="pt-6 space-y-3">
                  <label
                    className="mono text-[11px] tracking-widest uppercase block"
                    style={{ color: "#6B7688" }}
                  >
                    Resend verification link
                  </label>
                  <input
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="auth-input w-full px-3.5 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                  />
                  <button
                    type="submit"
                    disabled={resendStatus === "sending"}
                    className="w-full py-3 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "var(--green)" }}
                  >
                    {resendStatus === "sending" ? "Sending…" : "Resend link"}
                  </button>
                  {resendStatus === "error" && (
                    <p className="text-xs" style={{ color: "#B42318" }}>
                      Couldn&lsquo;t resend — check the email address and try
                      again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
