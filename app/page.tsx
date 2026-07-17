// app/page.tsx (Landing Page)
import Link from "next/link";
import { Mail, Send, Users, Sparkles, ArrowRight } from "lucide-react";

const LogoColor = "#6C3CE1";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: LogoColor }}
          >
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span
            className="text-2xl font-light tracking-tight"
            style={{ color: LogoColor }}
          >
            {/* Debsphere <span className="font-medium">Academy</span> */}
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#6C3CE1] transition-colors">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#6C3CE1] transition-colors"
          >
            About
          </Link>
          <Link
            href="/courses"
            className="hover:text-[#6C3CE1] transition-colors"
          >
            Courses
          </Link>
          <Link
            href="#contact"
            className="hover:text-[#6C3CE1] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
          style={{ borderColor: `${LogoColor}30`, color: LogoColor }}
        >
          <Sparkles size={16} strokeWidth={1.5} />
          <span className="text-xs font-medium tracking-wide">
            Data Science &amp; Business Academy
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-gray-900">
          Coming <span style={{ color: LogoColor }}>Soon.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Debsphere Academy bridges the gap between classroom learning and
          industry experience. Equipping you with practical, industry-relevant
          skills for the global workforce.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#6C3CE1]" />
            <span>500+ waitlist</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-[#6C3CE1]" />
            <span>Weekly insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#6C3CE1]" />
            <span>Expert-led</span>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="w-full max-w-xl mx-auto mt-12">
          <form className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 transition-shadow text-gray-800"
                style={{ borderColor: `${LogoColor}40` }}
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: LogoColor }}
            >
              <span>Join Waitlist</span>
              <Send size={18} strokeWidth={1.5} />
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            No spam, only data-driven updates. Unsubscribe anytime.
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-16 flex items-center justify-center gap-6">
          {/* <a href="#" className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-[#6C3CE1] hover:border-[#6C3CE1]/40 transition-all duration-200">
            <Instagram size={22} strokeWidth={1.5} />
          </a>
          <a href="#" className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-[#6C3CE1] hover:border-[#6C3CE1]/40 transition-all duration-200">
            <Twitter size={22} strokeWidth={1.5} />
          </a>
          <a href="#" className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-[#6C3CE1] hover:border-[#6C3CE1]/40 transition-all duration-200">
            <Youtube size={22} strokeWidth={1.5} />
          </a>
          <a href="#" className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-[#6C3CE1] hover:border-[#6C3CE1]/40 transition-all duration-200">
            <Linkedin size={22} strokeWidth={1.5} />
          </a> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>© 2026 Debsphere Academy — data science, redefined.</p>
      </footer>
    </div>
  );
}
