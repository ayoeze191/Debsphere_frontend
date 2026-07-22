"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth";
import { useAuthStore } from "@/store/auth";

function CellTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center border px-2 py-0.5 text-[11px] tracking-wider"
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

export default function AdminLoginPage() {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await AuthService.login(email, password);
      const { token, user } = response.data;

      if (user.role?.toUpperCase() !== "ADMIN") {
        setError("This account does not have administrator access.");
        return;
      }

      setUser(user);
      setToken(token);
      router.replace("/admin");
    } catch (error) {
      console.error(error);
      setError("Incorrect email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center p-4"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="sans w-full max-w-md">
        <div className="mb-10 flex items-center justify-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center border"
            style={{ borderColor: "var(--green)" }}
          >
            <span className="serif text-lg font-semibold" style={{ color: "var(--green)" }}>
              D
            </span>
          </div>
          <span className="serif text-xl">Debsphere Administration</span>
        </div>

        <section className="border" style={{ borderColor: "var(--rule)" }}>
          <header className="border-b p-8 text-center" style={{ borderColor: "var(--rule)" }}>
            <div className="mb-4 flex justify-center">
              <CellTag>ADMIN · SIGN IN</CellTag>
            </div>
            <ShieldCheck className="mx-auto mb-4" size={28} style={{ color: "var(--green)" }} />
            <h1 className="serif text-2xl font-semibold">Administrator access</h1>
            <p className="mt-2 text-sm" style={{ color: "#6B7688" }}>
              Sign in with an account assigned the administrator role.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5 p-8">
            <label className="block">
              <span className="mono mb-2 block text-[11px] uppercase tracking-widest" style={{ color: "#6B7688" }}>
                Email
              </span>
              <span className="relative block">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "#9AA3B2" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="w-full border bg-transparent py-3 pl-10 pr-4 text-sm"
                  style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                />
              </span>
            </label>

            <label className="block">
              <span className="mono mb-2 block text-[11px] uppercase tracking-widest" style={{ color: "#6B7688" }}>
                Password
              </span>
              <span className="relative block">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16} style={{ color: "#9AA3B2" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full border bg-transparent py-3 pl-10 pr-10 text-sm"
                  style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ color: "#9AA3B2" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>

            {error && <p className="text-sm" style={{ color: "#B42318" }}>{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 py-3 mono text-xs uppercase tracking-widest text-white disabled:opacity-60"
              style={{ background: "var(--green)" }}
            >
              {submitting ? "Signing in…" : <>Sign in <ArrowRight size={14} /></>}
            </button>
          </form>

          <footer className="border-t p-6 text-center text-sm" style={{ borderColor: "var(--rule)", color: "#6B7688" }}>
            Not an administrator? <Link href="/auth" className="font-medium" style={{ color: "var(--green)" }}>Learner sign in</Link>
          </footer>
        </section>
      </div>
    </main>
  );
}
