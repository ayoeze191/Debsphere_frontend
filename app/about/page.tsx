import Link from "next/link";
import { Target, Sparkles, ArrowRight } from "lucide-react";
import CellTag from "../components/CellTag";
import AboutStats from "../components/AboutStats";
import OfferingsGrid from "../components/OfferingsGrid";

export default function About() {
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
}
        .row-hover { transition: background-color 0.2s ease; }
        .row-hover:hover { background-color: var(--green-tint); }
      `}</style>

      <div className="sans">
        {/* About Hero */}
        <section
          className="relative border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          {/* background layer — pinned behind content, never covers text */}
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none z-0" />

          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <CellTag>ABOUT</CellTag>
              <span
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--green)" }}
              >
                Debsphere Academy
              </span>
            </div>
            <h1 className="serif text-5xl md:text-7xl font-semibold leading-[1.05] max-w-3xl">
              Where data minds
              <br />
              <span style={{ color: "var(--green)" }}>converge.</span>
            </h1>
            <p
              className="mt-6 text-lg max-w-2xl leading-relaxed"
              style={{ color: "#4B5768" }}
            >
              Debsphere Academy is a modern online learning platform dedicated
              to bridging the gap between classroom learning and industry
              experience. We empower students, graduates, young professionals,
              career switchers, and aspiring leaders with practical,
              industry-relevant skills.
            </p>

            {/* Stats */}
            <AboutStats />
          </div>
        </section>

        {/* Our Story / Vision */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CellTag>B1</CellTag>
                <span
                  className="mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--green)" }}
                >
                  Our Story
                </span>
              </div>
              <h2 className="serif text-3xl font-semibold">
                Born from a simple desire to help.
              </h2>
              <div
                className="mt-5 space-y-4 leading-relaxed"
                style={{ color: "#4B5768" }}
              >
                <p>
                  The journey began when a friend asked to be taught how to use
                  Microsoft Excel for data cleaning. While preparing to guide
                  him, one realization stood out: if one person needed this
                  knowledge, countless others could benefit from it too.
                </p>
                <p>
                  Instead of teaching just one person, the opportunity opened to
                  anyone willing to learn. That decision led to the launch of
                  the very first cohort of Debsphere Academy — what started as a
                  small training session soon became a thriving learning
                  community.
                </p>
                <p>
                  One of the most rewarding parts of the story is that the
                  friend who inspired this journey became our very first
                  student. Today, through his resilience and dedication, he
                  serves as our Chief Operating Officer.
                </p>
              </div>
              <div
                className="mt-6 pt-4 border-t"
                style={{ borderColor: "var(--rule)" }}
              >
                <p className="text-sm mono" style={{ color: "var(--ink)" }}>
                  Deborah Olabode
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#8A93A2" }}>
                  Founder &amp; Executive Director, Debsphere Academy
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <CellTag>B2</CellTag>
                <span
                  className="mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--green)" }}
                >
                  Our Vision
                </span>
              </div>
              <h2 className="serif text-3xl font-semibold">
                Bridging the gap.
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: "#4B5768" }}>
                To bridge the gap between classroom learning and industry
                experience by equipping individuals with practical,
                industry-relevant skills, real-world exposure, and career
                opportunities that prepare them to excel in the global
                workforce.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: "#4B5768" }}>
                We envision a world where education goes beyond theory — where
                learning is applied, innovation is nurtured, and every learner
                graduates with the confidence, competence, and experience needed
                to thrive.
              </p>
              <div
                className="mt-8 flex items-center gap-4 border p-5"
                style={{
                  borderColor: "var(--rule)",
                  background: "var(--green-tint)",
                }}
              >
                <Target
                  size={22}
                  style={{ color: "var(--green)" }}
                  strokeWidth={1.5}
                />
                <div>
                  <div
                    className="font-medium text-sm"
                    style={{ color: "var(--ink)" }}
                  >
                    Mission-driven
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "#6B7688" }}>
                    Practical skills for real-world impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section
          className="max-w-6xl mx-auto px-6 py-20 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <CellTag>C</CellTag>
            <span
              className="mono text-[11px] tracking-widest uppercase"
              style={{ color: "var(--green)" }}
            >
              What we offer
            </span>
          </div>
          <h2 className="serif text-3xl md:text-4xl font-semibold mb-12">
            Built for <span style={{ color: "var(--green)" }}>excellence</span>
          </h2>

          <OfferingsGrid />
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div
            className="border p-12 md:p-16 text-center"
            style={{ borderColor: "var(--rule)" }}
          >
            <Sparkles
              size={26}
              style={{ color: "var(--green)" }}
              className="mx-auto mb-5"
              strokeWidth={1.5}
            />
            <h2 className="serif text-3xl md:text-4xl font-semibold">
              Ready to shape your future with data?
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#6B7688" }}>
              Join the waitlist and be the first to access our programs,
              community, and resources.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--green)" }}
            >
              Join the waitlist <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
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
