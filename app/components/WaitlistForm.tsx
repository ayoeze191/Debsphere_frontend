"use client";

import { Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function WaitlistForm() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const joinWaitlist = async (email: string) => {
    try {
      setLoading(true);
      await axios.post("/api/waitlist", {
        email,
      });
      setLoading(false);
      toast.success("Successfully Added");
      // return data;
    } catch (error) {
      toast.error("error!!, Coudn't add your mail");
      setLoading(false);
      console.error(error);
      throw error;
    }
    setEmail("");
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Unable to join the waitlist");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-14">
      <div
        className="mono text-[11px] tracking-widest uppercase mb-3 text-left"
        style={{ color: "#6B7688" }}
      >
        A1 · Join the waitlist
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row border"
        style={{ borderColor: "var(--rule)" }}
      >
        <div
          className="relative flex-1 border-b sm:border-b-0 sm:border-r"
          style={{ borderColor: "var(--rule)" }}
        >
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#9AA3B2" }}
            size={17}
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="waitlist-input w-full pl-12 pr-4 py-4 border-none bg-transparent sans text-sm"
            style={{ color: "var(--ink)" }}
            required
          />
        </div>
        <Button
          onClick={() => joinWaitlist(email)}
          className="px-8 py-4 text-white mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--green)" }}
        >
          {loading ? (
            "Loading....."
          ) : (
            <>
              <span>Join Waitlist</span>
              <Send size={15} strokeWidth={1.5} />
            </>
          )}
        </Button>
      </form>
      <p
        className="text-xs mt-4"
        style={{ color: status === "error" ? "#B42318" : "#9AA3B2" }}
      >
        {status === "success"
          ? "You’re on the waitlist — we’ll be in touch."
          : status === "error"
            ? "We couldn’t save your email. Please try again."
            : "No spam, only data-driven updates. Unsubscribe anytime."}
      </p>
    </div>
  );
}
