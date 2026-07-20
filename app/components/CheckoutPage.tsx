"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Loading, { Skeleton } from "../components/Loading";
import { ArrowLeft, ShieldCheck, Award, Layers, Lock } from "lucide-react";
import CoursesAPI from "@/services/courses";
import PaymentApi from "@/services/payment";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnail?: string;
  category?: {
    name: string;
  };
  instructor?: {
    name: string;
  };
  outcomes: string[];
  sections: {
    id: string;
    position: number;
    title: string;
    lessons: {
      id: string;
      position: number;
      title: string;
      description?: string;
      duration: number;
    }[];
  }[];
}
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

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span
        className="mono text-[11px] tracking-widest uppercase block mb-2"
        style={{ color: "#6B7688" }}
      >
        {label}
      </span>
      <input
        {...props}
        className="checkout-input w-full px-4 py-3.5 border bg-transparent sans text-sm"
        style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
      />
    </label>
  );
}

export default function CheckoutPage({ slug }: { slug: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await CoursesAPI.getSingleCourse(slug);
      console.log(res.data.course);
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const req = PaymentApi.initiatePayment({ slug, ...form });
      console.log(req);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      await getCourse();
    };
    fetchCourse();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // const handlePay = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!course) return;
  //   setSubmitting(true);
  // };

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        .checkout-input:focus { outline: none; border-color: var(--green) !important; }
      `}</style>

      <div className="sans">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase"
            style={{ color: "#6B7688" }}
          >
            <ArrowLeft size={14} /> Back to course
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-3 mb-2">
            <CellTag>CHECKOUT</CellTag>
            <span
              className="mono text-[11px] tracking-widest uppercase"
              style={{ color: "var(--green)" }}
            >
              Step 1 of 1 · Payment details
            </span>
          </div>
          <h1 className="serif text-4xl font-semibold mb-10">
            Complete your{" "}
            <span style={{ color: "var(--green)" }}>enrollment</span>
          </h1>

          <div className="grid md:grid-cols-[1fr_380px] gap-12">
            {/* Form */}
            <form onSubmit={handlePay} className="space-y-6">
              <div className="space-y-5">
                <h3
                  className="mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--ink)" }}
                >
                  A1 · Your details
                </h3>
                <Field
                  label="Full name"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Ada Okafor"
                />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                  />
                  <Field
                    label="Phone number"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0801 234 5678"
                  />
                </div>
              </div>

              <div
                className="pt-6 border-t"
                style={{ borderColor: "var(--rule)" }}
              >
                <h3
                  className="mono text-[11px] tracking-widest uppercase mb-5"
                  style={{ color: "var(--ink)" }}
                >
                  B1 · Payment method
                </h3>
                <label
                  className="flex items-center gap-4 border p-5 cursor-pointer"
                  style={{
                    borderColor: "var(--green)",
                    background: "var(--green-tint)",
                  }}
                >
                  <input
                    type="radio"
                    name="method"
                    defaultChecked
                    className="accent-current"
                  />
                  <div className="flex-1">
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--ink)" }}
                    >
                      Card / Bank Transfer / USSD
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#6B7688" }}
                    >
                      Processed securely via Paystack
                    </div>
                  </div>
                  <Lock size={16} style={{ color: "var(--green)" }} />
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !course}
                className="w-full py-4 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--green)" }}
              >
                <Loading data={course} skeleton={<>Loading course…</>}>
                  {(c) => (
                    <>
                      {submitting
                        ? "Processing…"
                        : `Pay ₦${c.price.toLocaleString()}`}
                    </>
                  )}
                </Loading>
              </button>

              <p
                className="text-xs text-center leading-relaxed"
                style={{ color: "#9AA3B2" }}
              >
                By completing this purchase you agree to Debsphere
                Academy&apos;s Terms of Service and Refund Policy.
              </p>
            </form>

            {/* Order summary — receipt style */}
            <div>
              <div
                className="border sticky top-6"
                style={{ borderColor: "var(--rule)" }}
              >
                <Loading
                  data={course}
                  skeleton={
                    <div>
                      <Skeleton className="w-full h-36" />
                      <div className="p-6 space-y-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                        <Skeleton className="h-3 w-full mt-6" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-6 w-full mt-4" />
                      </div>
                    </div>
                  }
                >
                  {(c) => (
                    <>
                      {c.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.thumbnail}
                          alt={c.title}
                          className="w-full h-36 object-cover"
                        />
                      )}
                      <div className="p-6">
                        <div
                          className="mono text-[11px] tracking-widest uppercase"
                          style={{ color: "var(--green)" }}
                        >
                          {c.category?.name ?? "Course"}
                        </div>
                        <h3
                          className="serif text-lg font-semibold mt-1 leading-snug"
                          style={{ color: "var(--ink)" }}
                        >
                          {c.title}
                        </h3>

                        <div
                          className="mt-4 flex flex-wrap gap-4 mono text-[11px]"
                          style={{ color: "#8A93A2" }}
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers size={12} /> {c.sections?.length ?? 0}{" "}
                            sections
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Award size={12} /> Certificate
                          </span>
                        </div>

                        {/* Receipt */}
                        <div
                          className="mt-6 pt-5 border-t space-y-3"
                          style={{ borderColor: "var(--rule)" }}
                        >
                          <div className="flex justify-between text-sm">
                            <span style={{ color: "#6B7688" }}>Course fee</span>
                            <span
                              className="mono"
                              style={{ color: "var(--ink)" }}
                            >
                              ₦{c.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span style={{ color: "#6B7688" }}>
                              Processing fee
                            </span>
                            <span
                              className="mono"
                              style={{ color: "var(--ink)" }}
                            >
                              ₦0
                            </span>
                          </div>
                        </div>

                        <div
                          className="mt-4 pt-4 border-t flex justify-between items-baseline"
                          style={{ borderColor: "var(--rule)" }}
                        >
                          <span
                            className="mono text-[11px] tracking-widest uppercase"
                            style={{ color: "var(--ink)" }}
                          >
                            Total due
                          </span>
                          <span
                            className="mono text-2xl font-medium"
                            style={{ color: "var(--ink)" }}
                          >
                            ₦{c.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Loading>

                <div
                  className="flex items-center gap-2 px-6 py-4 border-t mono text-[11px]"
                  style={{
                    borderColor: "var(--rule)",
                    background: "var(--green-tint)",
                    color: "var(--green)",
                  }}
                >
                  <ShieldCheck size={14} /> Secured checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
