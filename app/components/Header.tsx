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
  const isAdmin = pathname.startsWith("/admin");

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

  if (isAdmin) return null;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "#FAF8F3",
        borderBottom: "1px solid rgba(11,27,75,0.08)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .header-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="header-sans max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="w-fit h-fit">
          <Image
            src={"/Debsphere_Logo.png"}
            alt="Debsphere Academy"
            className="w-[64px] h-[64px] object-contain"
            width={64}
            height={64}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
              style={{ color: "#0B1B4B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0FAE68")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#0B1B4B")}
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#0FAE68" }}
            >
              {user ? "Continue Learning" : "Sign in"} <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* mobile menu placeholder - wire up to your existing mobile nav */}
        <button
          className="md:hidden text-sm font-medium"
          style={{ color: "#0B1B4B" }}
        >
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
