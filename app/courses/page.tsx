import {
  Users,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import CellTag from "@/app/components/CellTag";
import Courses from "@/app/components/Courses";

export default function CoursesPage() {
  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root {
          --paper: #FBFAF7;
          --ink: #10203A;
          --green: #1F6F54;
          --green-tint: #E9F1EC;
          --gold: #AD8330;
          --rule: #DCE0D8;
        }
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        .grid-bg {
          background-image:
            linear-gradient(var(--rule) 1px, transparent 1px),
            linear-gradient(90deg, var(--rule) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .row-hover { transition: background-color 0.2s ease; }
        .row-hover:hover { background-color: var(--green-tint); }
      `}</style>

      <div className="sans">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
            <div className="flex items-center gap-3 mb-6">
              <CellTag color="#052073">LEDGER · 2026</CellTag>
              <span
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "#052073" }}
              >
                Our Programs
              </span>
            </div>
            <h1 className="serif text-5xl md:text-7xl leading-[1.05] font-semibold max-w-3xl">
              Practical skills,
              <br />
              <span style={{ color: "#052073" }}>properly accounted for.</span>
            </h1>
            <p
              className="mt-6 text-lg max-w-xl leading-relaxed"
              style={{ color: "#4B5768" }}
            >
              Debsphere Academy delivers practical, industry-focused training
              designed to equip learners with the skills, confidence, and
              experience needed to excel in today&apos;s workforce.
            </p>
            <div
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 mono text-xs"
              style={{ color: "#6B7688" }}
            >
              <span>03 PROGRAMS LIVE</span>
              <span className="hidden sm:inline">·</span>
              <span>CERTIFICATE ON COMPLETION</span>
              <span className="hidden sm:inline">·</span>
              <span>100% ONLINE</span>
            </div>
          </div>
        </section>

        {/* Course Ledger */}
        <Courses />

        {/* Event Section */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <CellTag color="#052073">D1</CellTag>
            <span
              className="mono text-[11px] tracking-widest uppercase"
              style={{ color: "#052073" }}
            >
              Event
            </span>
          </div>
          <h2 className="serif text-3xl md:text-4xl font-semibold max-w-xl">
            From Skills to <span style={{ color: "#052073" }}>Strategy</span>
          </h2>
          <p className="mt-2 mono text-xs" style={{ color: "#6B7688" }}>
            Building Careers That Matter
          </p>

          <div className="mt-10 border" style={{ borderColor: "var(--rule)" }}>
            <div
              className="flex flex-wrap items-center gap-6 px-6 py-4 border-b mono text-xs"
              style={{ borderColor: "var(--rule)", color: "#6B7688" }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> September 7, 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} /> Virtual Webinar
              </span>
            </div>
            <div className="px-6 py-6">
              <p className="leading-relaxed" style={{ color: "#354154" }}>
                <strong style={{ color: "var(--ink)" }}>
                  From Skills to Strategy: Building Careers That Matter
                </strong>{" "}
                was a career development webinar equipping students and young
                professionals with the strategies needed to build meaningful,
                sustainable careers in the digital age.
              </p>
              <p className="mt-3 leading-relaxed" style={{ color: "#354154" }}>
                The session explored how learners can move beyond simply
                acquiring skills to strategically positioning themselves for
                growth, employability, and long-term success.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="max-w-6xl mx-auto px-6 py-20 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <CellTag color="#052073">E1</CellTag>
            <span
              className="mono text-[11px] tracking-widest uppercase"
              style={{ color: "#052073" }}
            >
              Contact
            </span>
          </div>
          <h2 className="serif text-3xl md:text-4xl font-semibold mb-10">
            Get in <span style={{ color: "#052073" }}>touch</span>
          </h2>

          <div
            className="grid sm:grid-cols-3 border-t border-l"
            style={{ borderColor: "var(--rule)" }}
          >
            <a
              href="mailto:debsphere005@gmail.com"
              className="row-hover border-b border-r p-6 flex flex-col gap-2"
              style={{ borderColor: "var(--rule)" }}
            >
              <Mail size={18} style={{ color: "#052073" }} />
              <span
                className="mono text-[11px] tracking-widest uppercase mt-2"
                style={{ color: "#6B7688" }}
              >
                Email
              </span>
              <span className="text-sm" style={{ color: "var(--ink)" }}>
                debsphere005@gmail.com
              </span>
            </a>
            <a
              href="tel:08150658570"
              className="row-hover border-b border-r p-6 flex flex-col gap-2"
              style={{ borderColor: "var(--rule)" }}
            >
              <Phone size={18} style={{ color: "#052073" }} />
              <span
                className="mono text-[11px] tracking-widest uppercase mt-2"
                style={{ color: "#6B7688" }}
              >
                Phone
              </span>
              <span className="text-sm" style={{ color: "var(--ink)" }}>
                0815 065 8570
              </span>
            </a>
            <div
              className="border-b border-r p-6 flex flex-col gap-2"
              style={{ borderColor: "var(--rule)" }}
            >
              <Users size={18} style={{ color: "#052073" }} />
              <span
                className="mono text-[11px] tracking-widest uppercase mt-2"
                style={{ color: "#6B7688" }}
              >
                Social
              </span>
              <div className="flex gap-4 text-sm">
                <a href="#" style={{ color: "var(--ink)" }}>
                  Instagram
                </a>
                <a href="#" style={{ color: "var(--ink)" }}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="max-w-6xl mx-auto px-6 py-8 text-center mono text-xs"
          style={{ color: "#8A93A2" }}
        >
          © 2026 Debsphere Academy — bridging the gap between classroom and
          industry.
        </footer>
      </div>
    </div>
  );
}
