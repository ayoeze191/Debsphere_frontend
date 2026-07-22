"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  CheckCircle2,
  Circle,
  ArrowRight,
} from "lucide-react";
import { DiChrome } from "react-icons/di";
import authService from "@/services/auth";
import { toast, Toaster } from "sonner";
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

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
      });
    }
  };

  const isPasswordValid = Object.values(passwordStrength).every(Boolean);
  const isFormValid =
    formData.firstName.length > 0 &&
    formData.lastName.length > 0 &&
    formData.email.length > 0 &&
    isPasswordValid &&
    formData.password === formData.confirmPassword &&
    acceptTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!acceptTerms) {
      setFormError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Signin Successful");
      router.push("/auth");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setFormError(
        error?.response?.data?.message ??
          "Unable to create your account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const requirements = [
    { key: "hasMinLength", label: "At least 8 characters" },
    { key: "hasUpperCase", label: "One uppercase letter" },
    { key: "hasLowerCase", label: "One lowercase letter" },
    { key: "hasNumber", label: "One number" },
  ] as const;

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Toaster />
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
              <CellTag>AUTH · SIGN UP</CellTag>
            </div>
            <h1 className="serif text-2xl font-semibold">Create an account</h1>
            <p className="text-sm mt-2" style={{ color: "#6B7688" }}>
              Start your learning journey with Debsphere Academy
            </p>
          </div>

          <div className="p-8 space-y-5">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="google-btn w-full h-11 flex border-[var(--rule)] text-[var-(--link)] items-center justify-center gap-2 border text-sm hover:bg-white transition-colors disabled:opacity-50"
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
                Or create an account
              </span>
              <div
                className="flex-1 h-px"
                style={{ background: "var(--rule)" }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mono text-[11px] tracking-widest uppercase block mb-2"
                    style={{ color: "#6B7688" }}
                  >
                    First name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                      style={{ color: "#9AA3B2" }}
                    />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="auth-input w-full pl-10 pr-3 py-3 border bg-transparent text-sm"
                      style={{
                        borderColor: "var(--rule)",
                        color: "var(--ink)",
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mono text-[11px] tracking-widest uppercase block mb-2"
                    style={{ color: "#6B7688" }}
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="auth-input w-full px-3 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="auth-input w-full pl-10 pr-4 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "#9AA3B2" }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="auth-input w-full pl-10 pr-10 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                    minLength={8}
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

                {formData.password.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {requirements.map((r) => {
                      const met = passwordStrength[r.key];
                      return (
                        <div
                          key={r.key}
                          className="flex items-center gap-2 text-xs"
                        >
                          {met ? (
                            <CheckCircle2
                              size={13}
                              style={{ color: "var(--green)" }}
                            />
                          ) : (
                            <Circle
                              size={13}
                              style={{ color: "var(--rule)" }}
                            />
                          )}
                          <span
                            style={{ color: met ? "var(--ink)" : "#9AA3B2" }}
                          >
                            {r.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                    style={{ color: "#9AA3B2" }}
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="auth-input w-full pl-10 pr-10 py-3 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9AA3B2" }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword.length > 0 &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-xs mt-1.5" style={{ color: "#B42318" }}>
                      Passwords do not match
                    </p>
                  )}
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4"
                  style={{ accentColor: "var(--green)" }}
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B7688" }}
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="hover:underline"
                    style={{ color: "var(--green)" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="hover:underline"
                    style={{ color: "var(--green)" }}
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {formError && (
                <p className="text-xs" style={{ color: "#B42318" }}>
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full h-11 flex items-center justify-center gap-2 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--green)" }}
              >
                {isLoading ? (
                  <>
                    <span className="ledger-spinner" /> Creating account…
                  </>
                ) : (
                  <>
                    Create account <ArrowRight size={14} />
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
              Already have an account?{" "}
              <Link
                href="/auth"
                className="font-medium"
                style={{ color: "var(--green)" }}
              >
                Sign in
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
