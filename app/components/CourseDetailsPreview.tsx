"use client";

import {
  Clock,
  Layers,
  PlayCircle,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const course = {
  title: "Complete TypeScript for Beginners",
  description:
    "Learn TypeScript fundamentals and build confidence writing safer JavaScript applications.",
  thumbnail:
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
  price: 8000,
  duration: "6 Weeks",
  category: { name: "Programming" },
  instructor: { name: "Adaeze Okoye" },
  outcomes: [
    "Understand TypeScript fundamentals",
    "Write type-safe JavaScript applications",
    "Build reusable interfaces and generics",
    "Configure TypeScript projects from scratch",
    "Develop a complete TypeScript application",
  ],
  sections: [
    {
      title: "Getting Started",
      position: 1,
      lessons: [
        {
          title: "Welcome to the course",
          description: "What you will learn and how to use this course.",
          duration: 180,
          position: 1,
        },
        {
          title: "Setting up TypeScript",
          description:
            "Install Node.js, TypeScript, and configure your first project.",
          duration: 420,
          position: 2,
        },
      ],
    },
    {
      title: "TypeScript Fundamentals",
      position: 2,
      lessons: [
        {
          title: "Types and Type Inference",
          description: "Use primitive types, arrays, and inferred values.",
          duration: 600,
          position: 1,
        },
        {
          title: "Interfaces and Objects",
          description: "Model reliable object shapes with interfaces.",
          duration: 540,
          position: 2,
        },
        {
          title: "Functions and Generics",
          description: "Write reusable, strongly typed functions.",
          duration: 720,
          position: 3,
        },
      ],
    },
    {
      title: "Building a Small Project",
      position: 3,
      lessons: [
        {
          title: "Planning the Project",
          description: "Define the data structures and the app flow.",
          duration: 360,
          position: 1,
        },
        {
          title: "Putting It All Together",
          description: "Build and review a small TypeScript application.",
          duration: 900,
          position: 2,
        },
      ],
    },
  ],
};

function CellTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wider border"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: "var(--green)",
        borderColor: "var(--rule)",
        background: "var(--paper)",
      }}
    >
      {children}
    </span>
  );
}

function sectionRef(position: number) {
  return String.fromCharCode(64 + position);
}

function formatLessonDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTotalDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export default function CoursePagePreview() {
  const totalLessons = course.sections.reduce(
    (sum, s) => sum + s.lessons.length,
    0,
  );
  const totalSeconds = course.sections.reduce(
    (sum, s) => sum + s.lessons.reduce((ls, l) => ls + l.duration, 0),
    0,
  );

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root {
          --paper: #FBFAF7; --ink: #10203A; --green: #052073;
          --green-tint: #E8EAF3; --gold: #AD8330; --rule: #DDE0E8;
        }
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        .row-hover { transition: background-color 0.2s ease; }
        .row-hover:hover { background-color: var(--green-tint); }
      `}</style>

      <div className="sans">
        {/* Hero */}
        <section
          className="max-w-6xl mx-auto px-6 py-14 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="grid md:grid-cols-[1fr_360px] gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CellTag>
                  <>COURSE</>
                </CellTag>
                <span
                  className="mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--green)" }}
                >
                  {course.category.name}
                </span>
              </div>

              <h1 className="serif text-4xl md:text-5xl font-semibold leading-[1.1]">
                {course.title}
              </h1>

              <p
                className="mt-5 text-lg leading-relaxed"
                style={{ color: "#4B5768" }}
              >
                {course.description}
              </p>

              <div
                className="mt-8 flex flex-wrap gap-6 mono text-xs"
                style={{ color: "#6B7688" }}
              >
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers size={14} /> {course.sections.length} sections ·{" "}
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1.5">
                  <PlayCircle size={14} /> {formatTotalDuration(totalSeconds)}{" "}
                  total
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={14} /> Certificate
                </span>
              </div>

              <div
                className="mt-8 flex items-center gap-3 border-t pt-6"
                style={{ borderColor: "var(--rule)" }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center border mono text-xs"
                  style={{ borderColor: "var(--rule)", color: "var(--green)" }}
                >
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--ink)" }}
                  >
                    {course.instructor.name}
                  </div>
                  <div className="text-xs" style={{ color: "#8A93A2" }}>
                    Instructor
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h4
                  className="mono text-[11px] tracking-widest uppercase mb-3"
                  style={{ color: "var(--ink)" }}
                >
                  What you&apos;ll learn
                </h4>
                <ul
                  className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm"
                  style={{ color: "#354154" }}
                >
                  {course.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--green)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="border" style={{ borderColor: "var(--rule)" }}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-44 object-cover"
                />
                <div
                  className="p-6"
                  style={{ background: "var(--green-tint)" }}
                >
                  <div
                    className="mono text-[11px] tracking-widest uppercase"
                    style={{ color: "#6B7688" }}
                  >
                    Tuition
                  </div>
                  <div
                    className="mono text-3xl font-medium mt-1"
                    style={{ color: "var(--ink)" }}
                  >
                    ₦{course.price.toLocaleString()}
                  </div>
                  <button
                    className="mt-6 w-full py-3.5 text-white mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--green)" }}
                  >
                    Enroll now <ArrowRight size={14} />
                  </button>
                  <p
                    className="mt-4 text-xs leading-relaxed"
                    style={{ color: "#6B7688" }}
                  >
                    Certificate issued on completion · Lifetime access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-2">
            <CellTag>CURRICULUM</CellTag>
          </div>
          <h2 className="serif text-3xl font-semibold mb-10">
            Course <span style={{ color: "var(--green)" }}>contents</span>
          </h2>

          <div className="border-t" style={{ borderColor: "var(--rule)" }}>
            {course.sections.map((section) => {
              const ref = sectionRef(section.position);
              const sectionSeconds = section.lessons.reduce(
                (s, l) => s + l.duration,
                0,
              );
              return (
                <details
                  key={section.position}
                  className="border-b"
                  style={{ borderColor: "var(--rule)" }}
                  open
                >
                  <summary
                    className="row-hover flex items-center justify-between px-2 py-5"
                    style={{ listStyle: "none", cursor: "pointer" }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="mono text-sm w-6"
                        style={{ color: "var(--gold)" }}
                      >
                        {ref}
                      </span>
                      <span
                        className="font-medium"
                        style={{ color: "var(--ink)" }}
                      >
                        {section.title}
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-4 mono text-xs"
                      style={{ color: "#8A93A2" }}
                    >
                      <span>{section.lessons.length} lessons</span>
                      <span>{formatTotalDuration(sectionSeconds)}</span>
                    </div>
                  </summary>

                  <div className="pb-2">
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.position}
                        className="row-hover flex items-start gap-4 px-2 py-4 pl-12 border-t"
                        style={{ borderColor: "var(--rule)" }}
                      >
                        <span
                          className="mono text-xs mt-0.5"
                          style={{ color: "var(--green)" }}
                        >
                          {ref}
                          {lesson.position}
                        </span>
                        <div className="flex-1">
                          <div
                            className="text-sm font-medium"
                            style={{ color: "var(--ink)" }}
                          >
                            {lesson.title}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "#8A93A2" }}
                          >
                            {lesson.description}
                          </div>
                        </div>
                        <span
                          className="mono text-xs whitespace-nowrap"
                          style={{ color: "#8A93A2" }}
                        >
                          {formatLessonDuration(lesson.duration)}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

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
