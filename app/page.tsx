import Link from "next/link";
import { Award, Layers, Users, ArrowRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import CellTag from "./components/CellTag";

export default function Home() {
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
        .grid-bg {
          background-image:
            linear-gradient(#E8EAF3 1px, transparent 1px),
            linear-gradient(90deg, #E8EAF3 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse 60% 55% at 50% 45%, transparent 40%, black 100%);
          mask-image: radial-gradient(ellipse 60% 55% at 50% 45%, transparent 40%, black 100%);
        }
        .social-cell:hover {
          background: var(--green-tint);
          border-color: var(--green) !important;
        }
        .cta-primary:hover { opacity: 0.9; }
        .cta-secondary:hover { background: var(--green-tint); }
      `}</style>

      <div className="sans">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none z-0" />
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <CellTag>STATUS · ENROLLING NOW</CellTag>
              <span
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--green)" }}
              >
                Data Science &amp; Business Academy
              </span>
            </div>

            <h1 className="serif text-6xl md:text-8xl font-semibold leading-[1.02]">
              Skills that move
              <br />
              you <span style={{ color: "var(--green)" }}>forward.</span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#4B5768" }}
            >
              Debsphere Academy bridges the gap between classroom learning and
              industry experience — practical, industry-relevant skills for the
              global workforce, taught by people who've done the work.
            </p>

            <div
              className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 mono text-xs"
              style={{ color: "#6B7688" }}
            >
              <span className="flex items-center gap-2">
                <Layers size={15} style={{ color: "var(--green)" }} /> 3 LIVE
                COURSES
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <Users size={15} style={{ color: "var(--green)" }} /> 12+
                MENTORS
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <Award size={15} style={{ color: "var(--green)" }} />
                CERTIFICATE ON COMPLETION
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses"
                className="cta-primary flex items-center justify-center gap-2 px-8 py-3.5 text-white mono text-xs tracking-widest uppercase transition-opacity"
                style={{ backgroundColor: "var(--green)" }}
              >
                Browse courses <ArrowRight size={14} />
              </Link>
              <Link
                href="/auth"
                className="cta-secondary flex items-center justify-center gap-2 px-8 py-3.5 mono text-xs tracking-widest uppercase border transition-colors"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              >
                Sign in
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-16 flex items-center justify-center gap-3">
              {[
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/debsphere_academy?igsh=YnFrejRibnFhN2o0",
                },
                { icon: FaTwitter, href: "#" },
                { icon: FaYoutube, href: "#" },
                { icon: FaLinkedin, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="social-cell w-11 h-11 flex items-center justify-center border transition-colors"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <Icon size={17} color="var(--green)" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="max-w-6xl mx-auto px-6 py-8 text-center mono text-xs"
          style={{ color: "#8A93A2" }}
        >
          © 2026 Debsphere Academy — data science, redefined.
        </footer>
      </div>
    </div>
  );
}
