// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { DiChrome } from "react-icons/di";
import { useRouter, useSearchParams } from "next/navigation";
import authService from "./../../services/auth";
import { useAuthStore } from "@/store/auth";

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

export default function LoginPage() {
  const authStore = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const data = await authService.login(email, password);
      authStore.setUser(data.data.user);
      authStore.setToken(data.data.token);
      router.push("/");
    } catch {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [params]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        .auth-input:focus { outline: none; border-color: var(--green) !important; }
        .google-btn:hover { background: var(--green-tint); border-color: var(--green) !important; }
        @keyframes ledger-spin { to { transform: rotate(360deg); } }
        .ledger-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          animation: ledger-spin 0.7s linear infinite;
        }
      `}</style>

      <div className="sans w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div
            className="w-10 h-10 flex items-center justify-center border"
            style={{ borderColor: "var(--green)" }}
          >
            <span
              className="serif font-semibold text-lg"
              style={{ color: "var(--green)" }}
            >
              D
            </span>
          </div>
          <span className="serif text-xl" style={{ color: "var(--ink)" }}>
            Debsphere <span className="font-semibold">Academy</span>
          </span>
        </div>

        <div className="border" style={{ borderColor: "var(--rule)" }}>
          <div
            className="text-center p-8 pb-6 border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="flex justify-center mb-4">
              <CellTag>AUTH · SIGN IN</CellTag>
            </div>
            <h1 className="serif text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm mt-2" style={{ color: "#6B7688" }}>
              Sign in to your account to continue learning
            </p>
          </div>

          <div className="p-8 space-y-5">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="google-btn w-full h-11 flex items-center justify-center gap-2 border text-sm transition-colors disabled:opacity-50"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            >
              <DiChrome
                className="h-5 w-5"
                style={{ color: "var(--green)" }}
                aria-hidden="true"
              />
              Continue with Google
            </button>

            <div className="relative flex items-center py-1">
              <div
                className="flex-1 h-px"
                style={{ background: "var(--rule)" }}
              />
              <span
                className="mono text-[10px] tracking-widest uppercase px-3"
                style={{ color: "#9AA3B2" }}
              >
                Or continue with email
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "var(--rule)" }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "#9AA3B2" }}
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input w-full pl-10 pr-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="mono text-[11px] tracking-widest uppercase"
                    style={{ color: "#6B7688" }}
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="mono text-[11px]"
                    style={{ color: "var(--green)" }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "#9AA3B2" }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input w-full pl-10 pr-10 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9AA3B2" }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs" style={{ color: "#B42318" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 flex items-center justify-center gap-2 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: "var(--green)" }}
              >
                {isLoading ? (
                  <>
                    <span className="ledger-spinner" /> Signing in…
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div
            className="flex flex-col items-center gap-4 p-8 pt-6 border-t"
            style={{ borderColor: "var(--rule)" }}
          >
            <p className="text-sm" style={{ color: "#6B7688" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium"
                style={{ color: "var(--green)" }}
              >
                Sign up for free
              </Link>
            </p>
            <div
              className="flex items-center gap-4 mono text-[11px]"
              style={{ color: "#9AA3B2" }}
            >
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <p
          className="text-center mono text-[11px] mt-8"
          style={{ color: "#9AA3B2" }}
        >
          © 2026 Debsphere Academy. All rights reserved.
        </p>
      </div>
    </div>
  );
}
