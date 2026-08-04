import Link from "next/link";
import { Target, Sparkles, ArrowRight } from "lucide-react";
import AboutStats from "../components/AboutStats";
import OfferingsGrid from "../components/OfferingsGrid";

export default function About() {
  return (
    <div style={{ background: "#FAF8F3" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .sans { font-family: 'Inter', sans-serif; }
        .display { font-family: 'Sora', sans-serif; }
      `}</style>

      <div className="sans">
        {/* About Hero */}
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
            style={{ background: "#E9FBF2", color: "#0FAE68" }}
          >
            <Sparkles size={13} /> About Debsphere
          </span>
          <h1
            className="display font-extrabold leading-[1.08] mb-6 max-w-2xl"
            style={{ fontSize: "44px", color: "#0B1B4B" }}
          >
            Where data minds <span style={{ color: "#0FAE68" }}>converge.</span>
          </h1>
          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "#5B6472" }}
          >
            Debsphere Academy is a modern online learning platform dedicated to
            bridging the gap between classroom learning and industry experience.
            We empower students, graduates, young professionals, career
            switchers, and aspiring leaders with practical, industry-relevant
            skills.
          </p>

          <AboutStats />
        </div>

        {/* Our Story / Vision */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-3xl p-8"
              style={{
                background: "white",
                boxShadow: "0 4px 24px rgba(5,32,115,0.06)",
              }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#0FAE68" }}
              >
                Our story
              </span>
              <h2
                className="display font-bold text-2xl mt-2 mb-4"
                style={{ color: "#0B1B4B" }}
              >
                Born from a simple desire to help.
              </h2>
              <div
                className="space-y-4 leading-relaxed text-sm"
                style={{ color: "#3F4756" }}
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
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid rgba(11,27,75,0.08)" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#0B1B4B" }}
                >
                  Deborah Olabode
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>
                  Founder &amp; Executive Director, Debsphere Academy
                </p>
              </div>
            </div>

            <div
              className="rounded-3xl p-8"
              style={{
                background: "white",
                boxShadow: "0 4px 24px rgba(5,32,115,0.06)",
              }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#0FAE68" }}
              >
                Our vision
              </span>
              <h2
                className="display font-bold text-2xl mt-2 mb-4"
                style={{ color: "#0B1B4B" }}
              >
                Bridging the gap.
              </h2>
              <p
                className="leading-relaxed text-sm mb-4"
                style={{ color: "#3F4756" }}
              >
                To bridge the gap between classroom learning and industry
                experience by equipping individuals with practical,
                industry-relevant skills, real-world exposure, and career
                opportunities that prepare them to excel in the global
                workforce.
              </p>
              <p
                className="leading-relaxed text-sm mb-6"
                style={{ color: "#3F4756" }}
              >
                We envision a world where education goes beyond theory — where
                learning is applied, innovation is nurtured, and every learner
                graduates with the confidence, competence, and experience needed
                to thrive.
              </p>
              <div
                className="flex items-center gap-4 rounded-2xl p-5"
                style={{ background: "#F5F9F7" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#E9FBF2" }}
                >
                  <Target
                    size={20}
                    style={{ color: "#0FAE68" }}
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#0B1B4B" }}
                  >
                    Mission-driven
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                    Practical skills for real-world impact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#0FAE68" }}
          >
            What we offer
          </span>
          <h2
            className="display font-bold text-3xl mt-2 mb-10"
            style={{ color: "#0B1B4B" }}
          >
            Built for excellence.
          </h2>
          <OfferingsGrid />
        </div>

        {/* CTA */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div
            className="rounded-[32px] p-12 md:p-16 text-center"
            style={{ background: "#0B1B4B" }}
          >
            <Sparkles
              size={26}
              style={{ color: "#1AE184" }}
              className="mx-auto mb-5"
              strokeWidth={2}
            />
            <h2 className="display font-bold text-3xl md:text-4xl text-white">
              Ready to shape your future with data?
            </h2>
            <p
              className="mt-3 max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Browse our programs and start building practical, real-world
              skills today.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "#0FAE68" }}
            >
              Browse courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer */}
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
