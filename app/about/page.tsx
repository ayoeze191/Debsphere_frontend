// app/about/page.tsx (About Page)
import Link from "next/link";
import {
  Users,
  Target,
  Layers,
  Award,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const LogoColor = "#6C3CE1";

export default function About() {
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
            Debsphere <span className="font-medium">Academy</span>
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

      {/* About Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl">
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: LogoColor }}
          >
            About Debsphere
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mt-2">
            Where data minds <br />
            <span style={{ color: LogoColor }}>converge.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Debsphere Academy is a modern online learning platform dedicated to
            bridging the gap between classroom learning and industry experience.
            We empower students, graduates, young professionals, career
            switchers, and aspiring leaders with practical, industry-relevant
            skills.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: Users,
              label: "Community",
              value: "500+",
              desc: "active waitlist members",
            },
            {
              icon: Award,
              label: "Expertise",
              value: "12+",
              desc: "industry mentors",
            },
            {
              icon: BarChart3,
              label: "Impact",
              value: "8+",
              desc: "data projects launched",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/60 border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${LogoColor}10` }}
              >
                <stat.icon
                  size={24}
                  style={{ color: LogoColor }}
                  strokeWidth={1.5}
                />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-800">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <span
              className="text-sm font-medium tracking-wider uppercase"
              style={{ color: LogoColor }}
            >
              Our Story
            </span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              Born from a simple desire to help.
            </h2>
            <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
              <p>
                The journey began when a friend asked me to teach him how to use
                Microsoft Excel for data cleaning. As I prepared to guide him, I
                had a simple realization: if one person needed this knowledge,
                there were countless others who could benefit from it too.
              </p>
              <p>
                Instead of teaching just one person, I decided to open the
                opportunity to anyone willing to learn. That decision led to the
                launch of the very first cohort of Debsphere Academy. What
                started as a small training session soon became a thriving
                learning community.
              </p>
              <p>
                One of the most rewarding parts of our story is that the friend
                who inspired this journey became our very first student. Today,
                through his resilience and dedication, he serves as our Chief
                Operating Officer.
              </p>
              <p className="text-sm text-gray-500 mt-6">
                — Deborah Olabode <br />
                <span className="text-xs">
                  Founder &amp; Executive Director, Debsphere Academy
                </span>
              </p>
            </div>
          </div>
          <div>
            <span
              className="text-sm font-medium tracking-wider uppercase"
              style={{ color: LogoColor }}
            >
              Our Vision
            </span>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              Bridging the gap.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              To bridge the gap between classroom learning and industry
              experience by equipping individuals with practical,
              industry-relevant skills, real-world exposure, and career
              opportunities that prepare them to excel in the global workforce.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We envision a world where education goes beyond theory — where
              learning is applied, innovation is nurtured, and every learner
              graduates with the confidence, competence, and experience needed
              to thrive.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${LogoColor}10` }}
              >
                <Target
                  size={24}
                  style={{ color: LogoColor }}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">Mission-driven</div>
                <div className="text-sm text-gray-500">
                  Practical skills for real-world impact
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: LogoColor }}
          >
            What we offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            Built for <span style={{ color: LogoColor }}>excellence</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Practical Curriculum",
              desc: "Courses designed for real-world application, not just theory. Learn skills employers actually need.",
            },
            {
              title: "Expert Mentorship",
              desc: "Learn from industry veterans who bring years of experience and practical insights to every session.",
            },
            {
              title: "Career-Focused",
              desc: "From skills to strategy — we prepare you for career growth, employability, and long-term success.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm"
            >
              <CheckCircle
                size={20}
                style={{ color: LogoColor }}
                className="mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: `${LogoColor}08` }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${LogoColor}, transparent 70%)`,
            }}
          />
          <div className="relative z-10">
            <Sparkles
              size={28}
              style={{ color: LogoColor }}
              className="mx-auto mb-4"
              strokeWidth={1.5}
            />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ready to shape your future with data?
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Join the waitlist and be the first to access our programs,
              community, and resources.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 rounded-xl text-white font-medium transition-all hover:shadow-lg active:scale-[0.98]"
              style={{ backgroundColor: LogoColor }}
            >
              Join the waitlist <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>© 2026 Debsphere Academy — data science, redefined.</p>
      </footer>
    </div>
  );
}
