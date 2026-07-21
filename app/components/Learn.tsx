"use client";
import { useEffect, useMemo, useState } from "react";
import { PlayCircle, CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import CoursesAPI from "@/services/courses";
import type { Enrollment } from "@/types/course";

const FILTERS = ["All", "In Progress", "Completed"];

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

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 border" style={{ borderColor: "var(--rule)" }}>
      <div
        className="h-full"
        style={{ width: `${value}%`, background: "var(--green)" }}
      />
    </div>
  );
}

function Skeleton({ className = "" }) {
  return (
    <span
      className={`block animate-pulse ${className}`}
      style={{ background: "var(--rule)" }}
    />
  );
}

export default function LearnPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchEnrollments() {
      try {
        const res = await CoursesAPI.getEnrolledCourse();
        setEnrollments(res.data.enrolledCourses);
      } catch (err) {
        console.error(err);
        setEnrollments([]); // fail closed to an empty list, not a stuck spinner
      }
    }
    fetchEnrollments();
  }, []);

  const filtered = useMemo(() => {
    if (!enrollments) return null;
    if (filter === "All") return enrollments;
    if (filter === "Completed")
      return enrollments.filter((enrollment) => enrollment.progress >= 100);
    return enrollments.filter((enrollment) => enrollment.progress < 100);
  }, [enrollments, filter]);

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
      `}</style>

      <div className="sans">
        {/* Header + stats */}
        <section
          className="max-w-6xl mx-auto px-6 py-14 border-b"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <CellTag>MY LEARNING</CellTag>
          </div>
          <h1 className="serif text-4xl md:text-5xl font-semibold leading-[1.1]">
            Continue where{" "}
            <span style={{ color: "var(--green)" }}>you left off.</span>
          </h1>

          {enrollments === null ? (
            <div
              className="grid grid-cols-3 mt-12 border-t border-l"
              style={{ borderColor: "var(--rule)" }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="border-b border-r p-6"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <Skeleton className="h-3 w-16 mb-4" />
                  <Skeleton className="h-8 w-12" />
                </div>
              ))}
            </div>
          ) : (
            (() => {
              const total = enrollments.length;
              const completed = enrollments.filter(
                (e) => e.progress >= 100,
              ).length;
              const inProgress = total - completed;
              const stats = [
                { label: "Enrolled", value: total, icon: BookOpen },
                { label: "In Progress", value: inProgress, icon: PlayCircle },
                { label: "Completed", value: completed, icon: CheckCircle2 },
              ];
              return (
                <div
                  className="grid grid-cols-3 mt-12 border-t border-l"
                  style={{ borderColor: "var(--rule)" }}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="border-b border-r p-6"
                      style={{ borderColor: "var(--rule)" }}
                    >
                      <s.icon
                        size={18}
                        style={{ color: "var(--green)" }}
                        strokeWidth={1.5}
                      />
                      <div
                        className="mono text-3xl font-medium mt-4"
                        style={{ color: "var(--ink)" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-sm mt-0.5"
                        style={{ color: "#8A93A2" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()
          )}
        </section>

        {/* Filters + course grid */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center gap-6 mb-10 mono text-xs tracking-widest uppercase">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="pb-2 border-b-2 transition-colors"
                style={{
                  color: filter === f ? "var(--green)" : "#9AA3B2",
                  borderColor: filter === f ? "var(--green)" : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {filtered === null ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="border"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <Skeleton className="w-full h-40" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="border py-20 flex flex-col items-center text-center"
              style={{ borderColor: "var(--rule)" }}
            >
              <CellTag>NO RESULTS</CellTag>
              <p className="mt-4 max-w-sm" style={{ color: "#6B7688" }}>
                {filter === "All"
                  ? "You haven't enrolled in any courses yet."
                  : `No courses match "${filter}" right now.`}
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-white mono text-xs tracking-widest uppercase"
                style={{ backgroundColor: "var(--green)" }}
              >
                Browse courses <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((enrollment) => {
                const c = enrollment.course;
                const isComplete = enrollment.progress >= 100;
                return (
                  <div
                    key={enrollment.id}
                    className="border"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <div className="relative">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-full h-40 object-cover"
                      />
                      {isComplete && (
                        <span
                          className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 mono text-[10px] tracking-widest uppercase text-white"
                          style={{ background: "var(--green)" }}
                        >
                          <CheckCircle2 size={11} /> Complete
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div
                        className="mono text-[11px] tracking-widest uppercase"
                        style={{ color: "var(--green)" }}
                      >
                        {c.category?.name ?? "Course"}
                      </div>
                      <h3
                        className="serif text-lg font-semibold mt-1 leading-snug"
                        style={{ color: "var(--ink)" }}
                      >
                        {c.title}
                      </h3>
                      <div
                        className="mt-4 flex items-center justify-between mono text-[11px]"
                        style={{ color: "#8A93A2" }}
                      >
                        <span>
                          {enrollment.completedLessons}/
                          {enrollment.totalLessons} lessons
                        </span>
                        <span style={{ color: "var(--green)" }}>
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={enrollment.progress} />
                      </div>
                      {enrollment.lastLesson && !isComplete && (
                        <p
                          className="text-xs mt-4"
                          style={{ color: "#8A93A2" }}
                        >
                          Last: {enrollment.lastLesson.title}
                        </p>
                      )}
                      <a
                        href={`/dashboard/learn/${c.slug}/${enrollment.lastLessonId}`}
                        className="mt-6 flex items-center justify-center gap-2 py-3 mono text-xs tracking-widest uppercase border transition-colors"
                        style={{
                          borderColor: "var(--green)",
                          color: isComplete ? "var(--green)" : "white",
                          background: isComplete
                            ? "transparent"
                            : "var(--green)",
                        }}
                      >
                        {isComplete ? "Review course" : "Resume learning"}{" "}
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
