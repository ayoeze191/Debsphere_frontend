import {
  Sparkles,
  Layers,
  Award,
  Wifi,
  Calendar,
  Users,
  Mail,
  Phone,
} from "lucide-react";
import Courses from "@/app/components/Courses";

export default function CoursesPage() {
  return (
    <div style={{ background: "#FAF8F3" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .sans { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Sora', sans-serif; }
      `}</style>

      <div className="sans">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#E9FBF2", color: "#0FAE68" }}
          >
            <Sparkles size={13} /> Our programs
          </span>
          <h1
            className="display font-extrabold leading-[1.08] mb-6 max-w-2xl"
            style={{ fontSize: "44px", color: "#0B1B4B" }}
          >
            Practical skills, built for the{" "}
            <span style={{ color: "#0FAE68" }}>real world.</span>
          </h1>
          <p
            className="text-lg leading-relaxed mb-8 max-w-xl"
            style={{ color: "#5B6472" }}
          >
            Debsphere Academy delivers practical, industry-focused training
            designed to equip learners with the skills, confidence, and
            experience needed to excel in today&apos;s workforce.
          </p>
          <div
            className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
            style={{ color: "#6B7280" }}
          >
            <span className="flex items-center gap-2">
              <Layers size={16} style={{ color: "#0FAE68" }} /> 3 programs live
            </span>
            <span className="flex items-center gap-2">
              <Award size={16} style={{ color: "#0FAE68" }} /> Certificate on
              completion
            </span>
            <span className="flex items-center gap-2">
              <Wifi size={16} style={{ color: "#0FAE68" }} /> 100% online
            </span>
          </div>
        </div>

        {/* Course listing */}
        <Courses />

        {/* Event Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#0FAE68" }}
          >
            Event
          </span>
          <h2
            className="display font-bold text-3xl mt-2 mb-1"
            style={{ color: "#0B1B4B" }}
          >
            From skills to strategy
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            Building careers that matter
          </p>

          <div
            className="rounded-3xl p-8"
            style={{
              background: "white",
              boxShadow: "0 4px 24px rgba(5,32,115,0.06)",
            }}
          >
            <div
              className="flex flex-wrap items-center gap-6 text-sm mb-5"
              style={{ color: "#6B7280" }}
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={15} /> September 7, 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={15} /> Virtual webinar
              </span>
            </div>
            <p className="leading-relaxed mb-3" style={{ color: "#3F4756" }}>
              <strong style={{ color: "#0B1B4B" }}>
                From Skills to Strategy: Building Careers That Matter
              </strong>{" "}
              was a career development webinar equipping students and young
              professionals with the strategies needed to build meaningful,
              sustainable careers in the digital age.
            </p>
            <p className="leading-relaxed" style={{ color: "#3F4756" }}>
              The session explored how learners can move beyond simply acquiring
              skills to strategically positioning themselves for growth,
              employability, and long-term success.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#0FAE68" }}
          >
            Contact
          </span>
          <h2
            className="display font-bold text-3xl mt-2 mb-8"
            style={{ color: "#0B1B4B" }}
          >
            Get in touch
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="mailto:debsphere005@gmail.com"
              className="rounded-2xl p-6 flex flex-col gap-2 transition-transform hover:-translate-y-1"
              style={{
                background: "white",
                boxShadow: "0 4px 20px rgba(5,32,115,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "#E9FBF2" }}
              >
                <Mail size={17} style={{ color: "#0FAE68" }} />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-2"
                style={{ color: "#6B7280" }}
              >
                Email
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#0B1B4B" }}
              >
                debsphere005@gmail.com
              </span>
            </a>

            <a
              href="tel:08150658570"
              className="rounded-2xl p-6 flex flex-col gap-2 transition-transform hover:-translate-y-1"
              style={{
                background: "white",
                boxShadow: "0 4px 20px rgba(5,32,115,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "#E9FBF2" }}
              >
                <Phone size={17} style={{ color: "#0FAE68" }} />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-2"
                style={{ color: "#6B7280" }}
              >
                Phone
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#0B1B4B" }}
              >
                0815 065 8570
              </span>
            </a>

            <div
              className="rounded-2xl p-6 flex flex-col gap-2"
              style={{
                background: "white",
                boxShadow: "0 4px 20px rgba(5,32,115,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "#E9FBF2" }}
              >
                <Users size={17} style={{ color: "#0FAE68" }} />
              </div>
              <span
                className="text-xs font-semibold tracking-widest uppercase mt-2"
                style={{ color: "#6B7280" }}
              >
                Social
              </span>
              <div
                className="flex gap-4 text-sm font-medium"
                style={{ color: "#0B1B4B" }}
              >
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="max-w-6xl mx-auto px-6 py-8 text-center text-xs"
          style={{ color: "#9CA3AF" }}
        >
          © 2026 Debsphere Academy — bridging the gap between classroom and
          industry.
        </footer>
      </div>
    </div>
  );
}
