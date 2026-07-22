"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Avoids a flash of "Sign In" before a localStorage-persisted auth store
  // has rehydrated on the client — unrelated to which route we're on, so
  // this always fires once on mount regardless of isDashboard.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    function run() {
      setMounted(true);
    }
    run();
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--paper)", borderColor: "var(--rule)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="w-fit h-fit">
          <Image
            src={"/Debsphere_Logo.png"}
            alt="Debsphere Academy"
            className="w-[72px] h-[72px] object-contain"
            width={72}
            height={72}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 mono text-xs tracking-widest uppercase">
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/courses", label: "Courses" },
            { href: "#contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-6 transition-colors"
              style={{ color: "var(--ink)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--green)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA only shows once mounted (avoids the hydration flash) AND
            when we're not already inside the dashboard (no point telling
            someone to "Continue Learning" while they're already there). */}
        {mounted && !isDashboard && (
          <div className="hidden md:flex items-center">
            <Link
              href={user ? "/dashboard/learn" : "/auth"}
              className="flex items-center gap-2 px-5 py-2.5 mono text-xs tracking-widest uppercase border transition-colors"
              style={{
                borderColor: "var(--green)",
                color: user ? "var(--green)" : "white",
                background: user ? "transparent" : "var(--green)",
              }}
            >
              {user ? "Continue Learning" : "Sign In"} <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* mobile menu placeholder - wire up to your existing mobile nav */}
        <button
          className="md:hidden mono text-xs tracking-widest uppercase"
          style={{ color: "var(--ink)" }}
        >
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
