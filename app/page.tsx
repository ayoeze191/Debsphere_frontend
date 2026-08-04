import Link from "next/link";
import {
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  Briefcase,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";

function AscendingBars({ height = 140 }: { height?: number }) {
  const bars = [14, 22, 18, 30, 26, 38, 34, 46, 42, 58, 54, 68];
  const max = Math.max(...bars);
  return (
    <svg
      viewBox={`0 0 ${bars.length * 16} ${height}`}
      width="100%"
      height={height}
      style={{ overflow: "visible" }}
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 16}
          y={height - (h / max) * height}
          width="9"
          height={(h / max) * height}
          rx="4"
          fill={i % 3 === 2 ? "#1AE184" : "rgba(255,255,255,0.25)"}
        />
      ))}
    </svg>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-2xl"
      style={{
        background: "white",
        boxShadow: "0 4px 20px rgba(5,32,115,0.06)",
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "#E9FBF2" }}
      >
        <Icon size={20} style={{ color: "#0FAE68" }} strokeWidth={2} />
      </div>
      <div>
        <div
          className="text-xl font-bold"
          style={{ color: "#0B1B4B", fontFamily: "'Sora', sans-serif" }}
        >
          {value}
        </div>
        <div className="text-xs" style={{ color: "#6B7280" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  href,
  tag,
  tagColor,
  tagBg,
  title,
  desc,
  price,
  icon: Icon,
}: {
  href: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  title: string;
  desc: string;
  price: string;
  icon: any;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl p-6 transition-transform hover:-translate-y-1"
      style={{
        background: "white",
        boxShadow: "0 4px 24px rgba(5,32,115,0.07)",
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "#0B1B4B" }}
      >
        <Icon size={22} color="white" strokeWidth={2} />
      </div>
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
        style={{ background: tagBg, color: tagColor }}
      >
        {tag}
      </span>
      <h3
        className="text-lg font-bold mb-2"
        style={{ color: "#0B1B4B", fontFamily: "'Sora', sans-serif" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
        {desc}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-lg font-bold"
          style={{ color: "#0B1B4B", fontFamily: "'Sora', sans-serif" }}
        >
          {price}
        </span>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#E9FBF2" }}
        >
          <ArrowRight size={16} style={{ color: "#0FAE68" }} />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#FAF8F3" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .sans { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Sora', sans-serif; }
      `}</style>

      <div className="sans">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{ background: "#E9FBF2", color: "#0FAE68" }}
            >
              <Sparkles size={13} /> Enrolling now — 3 courses live
            </span>
            <h1
              className="display font-extrabold leading-[1.05] mb-6"
              style={{ fontSize: "48px", color: "#0B1B4B" }}
            >
              Learn the skills that{" "}
              <span style={{ color: "#0FAE68" }}>move you forward.</span>
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "#5B6472", maxWidth: "440px" }}
            >
              Practical, industry-relevant courses in data, finance, and
              investing — taught by people who&apos;ve actually done the work.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/courses"
                className="px-7 py-4 rounded-full text-sm font-semibold text-white flex items-center gap-2"
                style={{ background: "#0FAE68" }}
              >
                Browse courses <ArrowRight size={15} />
              </Link>
              <Link
                href="/auth"
                className="px-7 py-4 rounded-full text-sm font-semibold"
                style={{
                  color: "#0B1B4B",
                  border: "1.5px solid rgba(11,27,75,0.13)",
                }}
              >
                Sign in
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {["#F4B183", "#9AD0EC", "#B39DDB", "#F48FB1"].map((c, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="text-sm" style={{ color: "#5B6472" }}>
                <span className="font-semibold" style={{ color: "#0B1B4B" }}>
                  500+ learners
                </span>{" "}
                already growing with us
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div
              className="rounded-[32px] p-8 pb-6"
              style={{ background: "#0B1B4B" }}
            >
              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  YOUR PROGRESS
                </span>
                <span
                  className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(26,225,132,0.15)",
                    color: "#1AE184",
                  }}
                >
                  <TrendingUp size={12} /> +64%
                </span>
              </div>
              <AscendingBars height={140} />
              <div
                className="mt-6 pt-5 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div>
                  <div className="display font-bold text-2xl text-white">
                    12
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Lessons completed
                  </div>
                </div>
                <div>
                  <div className="display font-bold text-2xl text-white">3</div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Certificates earned
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 flex items-center gap-3"
              style={{
                background: "white",
                boxShadow: "0 8px 30px rgba(5,32,115,0.12)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#E9FBF2" }}
              >
                <Award size={18} style={{ color: "#0FAE68" }} />
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: "#0B1B4B" }}>
                  Certified
                </div>
                <div className="text-xs" style={{ color: "#6B7280" }}>
                  On completion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} value="500+" label="Active learners" />
          <StatCard icon={Award} value="12+" label="Industry mentors" />
          <StatCard icon={BarChart3} value="3" label="Live courses" />
          <StatCard icon={Star} value="4.9" label="Average rating" />
        </div>

        {/* Courses */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="mb-8">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#0FAE68" }}
            >
              Our programs
            </span>
            <h2
              className="display font-bold text-3xl mt-2"
              style={{ color: "#0B1B4B" }}
            >
              Built for the real world.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <CourseCard
              href="/courses"
              icon={BarChart3}
              tag="Data & Analytics"
              tagColor="#7C3AED"
              tagBg="#F3EBFF"
              title="Microsoft Excel Course"
              desc="Data analysis, reporting, and automation for real workplace productivity."
              price="₦10,000"
            />
            <CourseCard
              href="/courses"
              icon={Briefcase}
              tag="Finance"
              tagColor="#0284C7"
              tagBg="#E6F5FD"
              title="QuickBooks Training"
              desc="Manage financial records and run essential bookkeeping with confidence."
              price="₦10,000"
            />
            <CourseCard
              href="/courses"
              icon={TrendingUp}
              tag="Investing"
              tagColor="#0FAE68"
              tagBg="#E9FBF2"
              title="Stock Market Masterclass"
              desc="Build a long-term investment portfolio using proven principles."
              price="₦5,000"
            />
          </div>
        </div>

        {/* Why us */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div
            className="rounded-[32px] p-10 md:p-14"
            style={{ background: "#0B1B4B" }}
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: "#1AE184" }}
                >
                  Why Debsphere
                </span>
                <h2 className="display font-bold text-3xl mt-3 mb-6 text-white">
                  Skills you can actually use on Monday morning.
                </h2>
                <div className="space-y-4">
                  {[
                    "Practical curriculum, not just theory",
                    "Learn from working industry mentors",
                    "Certificate issued on completion",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} style={{ color: "#1AE184" }} />
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* PLACEHOLDER TESTIMONIAL — replace with a real one before shipping */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="#1AE184"
                      style={{ color: "#1AE184" }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  "Placeholder quote — swap for a real student testimonial
                  before this ships."
                </p>
                <div className="text-sm font-semibold text-white">
                  Student name
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Course graduate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-6xl mx-auto px-6 pb-16 text-center">
          <h2
            className="display font-bold text-3xl mb-3"
            style={{ color: "#0B1B4B" }}
          >
            Ready to start growing?
          </h2>
          <p className="text-base mb-8" style={{ color: "#6B7280" }}>
            Join 500+ learners building real, practical skills.
          </p>
          <Link
            href="/courses"
            className="px-8 py-4 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2"
            style={{ background: "#0FAE68" }}
          >
            Browse courses <ArrowRight size={15} />
          </Link>
        </div>

        {/* Social Links */}
        <div className="max-w-6xl mx-auto px-6 pb-12 flex items-center justify-center gap-3">
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
              className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "white",
                boxShadow: "0 2px 10px rgba(5,32,115,0.06)",
              }}
            >
              <Icon size={16} color="#0B1B4B" />
            </a>
          ))}
        </div>

        <footer
          className="max-w-6xl mx-auto px-6 py-8 text-center text-xs"
          style={{ color: "#9CA3AF" }}
        >
          © 2026 Debsphere Academy — data science, redefined.
        </footer>
      </div>
    </div>
  );
}
