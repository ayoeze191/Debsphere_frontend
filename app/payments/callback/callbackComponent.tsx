// app/payments/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PaymentApi from "@/services/payment";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

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
  | {
      state: "success";
      course: { slug: string; title: string };
      amount: number;
      reference: string;
    }
  | { state: "failed"; message: string; reference?: string };

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 6; // ~12s before falling back to a direct Paystack check

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Result>({ state: "verifying" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const reference =
        searchParams.get("reference") ?? searchParams.get("trxref");

      if (!reference) {
        setResult({ state: "failed", message: "No payment reference found." });
        return;
      }

      // 1. Poll our own DB — this is whatever the webhook already wrote.
      for (let attempt = 0; attempt < MAX_POLLS; attempt++) {
        if (cancelled) return;

        try {
          const res = await PaymentApi.checkPaymentStatus(reference);
          const data = res.data;

          if (data.success && data.status === "SUCCESS") {
            setResult({
              state: "success",
              course: data.course,
              amount: data.amount,
              reference,
            });
            return;
          }
          if (data.success && data.status === "FAILED") {
            setResult({
              state: "failed",
              message: "Payment was not successful.",
              reference,
            });
            return;
          }
          // status is PENDING — webhook hasn't landed yet, wait and retry
        } catch (err) {
          console.error(err);
        }

        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      }

      if (cancelled) return;

      // 2. Webhook hasn't landed after ~12s — self-heal by checking Paystack directly.
      try {
        const res = await PaymentApi.verifyPayment(reference);
        const data = res.data;

        if (data.success && data.status === "SUCCESS") {
          setResult({
            state: "success",
            course: data.course,
            amount: data.amount,
            reference,
          });
        } else {
          setResult({
            state: "failed",
            message:
              data.message ??
              "We couldn't confirm your payment yet. If you were charged, contact support with your reference below.",
            reference,
          });
        }
      } catch (err) {
        console.error(err);
        setResult({
          state: "failed",
          message:
            "We couldn't confirm your payment yet. If you were charged, contact support with your reference below.",
          reference,
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

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
          width: 40px; height: 40px;
          border: 2px solid var(--rule);
          border-top-color: var(--green);
          animation: ledger-spin 0.8s linear infinite;
        }
      `}</style>

      <div className="sans w-full max-w-md px-6">
        {result.state === "verifying" && (
          <div className="flex flex-col items-center text-center">
            <CellTag>PAYMENT · VERIFYING</CellTag>
            <div className="ledger-spinner my-8" />
            <p className="serif text-xl font-medium">Confirming your payment</p>
            <p className="mono text-xs mt-2" style={{ color: "#8A93A2" }}>
              This usually takes a few seconds…
            </p>
          </div>
        )}

        {result.state === "success" && (
          <div className="border" style={{ borderColor: "var(--rule)" }}>
            <div
              className="flex flex-col items-center text-center p-10 border-b"
              style={{ borderColor: "var(--rule)" }}
            >
              <CheckCircle2
                size={36}
                style={{ color: "var(--green)" }}
                strokeWidth={1.5}
              />
              <div className="mt-4">
                <CellTag>PAYMENT · CONFIRMED</CellTag>
              </div>
              <p className="serif text-2xl font-semibold mt-4">
                You&apos;re enrolled!
              </p>
              <p className="text-sm mt-2" style={{ color: "#6B7688" }}>
                {result.course.title}
              </p>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: "#6B7688" }}>Amount paid</span>
                <span className="mono" style={{ color: "var(--ink)" }}>
                  ₦{result.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: "#6B7688" }}>Reference</span>
                <span className="mono text-xs" style={{ color: "var(--ink)" }}>
                  {result.reference}
                </span>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/dashboard/learn}`}
                className="flex items-center justify-center gap-2 py-3.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--green)" }}
              >
                Start learning <ArrowRight size={14} />
              </Link>
              <Link
                href="/dashboard/learn"
                className="flex items-center justify-center gap-2 py-3.5 mt-3 mono text-xs tracking-widest uppercase border"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              >
                Go to My Learning
              </Link>
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
                <CellTag>PAYMENT · UNCONFIRMED</CellTag>
              </div>
              <p className="serif text-2xl font-semibold mt-4">
                Payment not confirmed
              </p>
              <p className="text-sm mt-2 max-w-xs" style={{ color: "#6B7688" }}>
                {result.message}
              </p>
              {result.reference && (
                <p className="mono text-xs mt-3" style={{ color: "#9AA3B2" }}>
                  Ref: {result.reference}
                </p>
              )}
            </div>
            <div className="p-6 pt-0 flex flex-col gap-3">
              <a
                href="mailto:debsphere005@gmail.com"
                className="py-3.5 text-center text-white mono text-xs tracking-widest uppercase"
                style={{ backgroundColor: "var(--green)" }}
              >
                Contact support
              </a>
              <Link
                href="/courses"
                className="py-3.5 text-center mono text-xs tracking-widest uppercase border"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              >
                Back to courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
