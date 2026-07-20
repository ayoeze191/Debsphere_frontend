"use client";

import Link from "next/link";
import Loading, { Skeleton } from "./Loading";
import {
  Clock,
  Award,
  Layers,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import CoursesAPI from "@/services/courses";
import { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  thumbnail?: string;
  category?: {
    name: string;
  };
  instructor?: {
    name: string;
  };
  outcomes: string[];
  sections: {
    id: string;
    position: number;
    title: string;
    lessons: {
      id: string;
      position: number;
      title: string;
      description?: string;
      duration: number;
    }[];
  }[];
}
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
  // 1 -> A, 2 -> B, 3 -> C ...
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

export default function CoursePage({ slug }: { slug: string }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const getCourse = async () => {
    setLoading(true);
    try {
      const res = await CoursesAPI.getSingleCourse(slug);
      console.log(res.data.course);
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      await getCourse();
    };
    fetchCourse();
  }, [slug]);

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
        .row-hover { transition: background-color 0.2s ease; }
        .row-hover:hover { background-color: var(--green-tint); }
        details > summary { list-style: none; cursor: pointer; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary .chev { transform: rotate(90deg); }
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
                <CellTag>COURSE</CellTag>
                <span
                  className="mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--green)" }}
                >
                  <Loading
                    data={course}
                    skeleton={<Skeleton className="h-3 w-24" />}
                  >
                    {(c) => <>{c.category?.name ?? "Uncategorized"}</>}
                  </Loading>
                </span>
              </div>

              <Loading
                data={course}
                skeleton={<Skeleton className="h-11 w-2/3" />}
              >
                {(c) => (
                  <h1 className="serif text-4xl md:text-5xl font-semibold leading-[1.1]">
                    {c.title}
                  </h1>
                )}
              </Loading>

              <Loading
                data={course}
                skeleton={
                  <div className="mt-5 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                }
              >
                {(c) => (
                  <p
                    className="mt-5 text-lg leading-relaxed"
                    style={{ color: "#4B5768" }}
                  >
                    {c.description}
                  </p>
                )}
              </Loading>

              <Loading
                data={course}
                skeleton={
                  <div className="mt-8 flex flex-wrap gap-6">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                }
              >
                {(c) => {
                  const totalLessons = c.sections.reduce(
                    (sum, s) => sum + s.lessons.length,
                    0,
                  );
                  const totalSeconds = c.sections.reduce(
                    (sum, s) =>
                      sum + s.lessons.reduce((ls, l) => ls + l.duration, 0),
                    0,
                  );
                  return (
                    <div
                      className="mt-8 flex flex-wrap gap-6 mono text-xs"
                      style={{ color: "#6B7688" }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {c.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Layers size={14} /> {c.sections.length} sections ·{" "}
                        {totalLessons} lessons
                      </span>
                      <span className="flex items-center gap-1.5">
                        <PlayCircle size={14} />{" "}
                        {formatTotalDuration(totalSeconds)} total
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Award size={14} /> Certificate
                      </span>
                    </div>
                  );
                }}
              </Loading>

              <Loading
                data={course}
                skeleton={
                  <div
                    className="mt-8 flex items-center gap-3 border-t pt-6"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <Skeleton className="w-10 h-10" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                }
              >
                {(c) =>
                  c.instructor ? (
                    <div
                      className="mt-8 flex items-center gap-3 border-t pt-6"
                      style={{ borderColor: "var(--rule)" }}
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center border mono text-xs"
                        style={{
                          borderColor: "var(--rule)",
                          color: "var(--green)",
                        }}
                      >
                        {c.instructor.name?.charAt(0) ?? "?"}
                      </div>
                      <div>
                        <div
                          className="text-sm font-medium"
                          style={{ color: "var(--ink)" }}
                        >
                          {c.instructor.name}
                        </div>
                        <div className="text-xs" style={{ color: "#8A93A2" }}>
                          Instructor
                        </div>
                      </div>
                    </div>
                  ) : null
                }
              </Loading>

              <div className="mt-10">
                <h4
                  className="mono text-[11px] tracking-widest uppercase mb-3"
                  style={{ color: "var(--ink)" }}
                >
                  What you&apos;ll learn
                </h4>
                <Loading
                  data={course}
                  skeleton={
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-3.5 w-full" />
                      ))}
                    </div>
                  }
                >
                  {(c) => (
                    <ul
                      className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm"
                      style={{ color: "#354154" }}
                    >
                      {c.outcomes.map((item) => (
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
                  )}
                </Loading>
              </div>
            </div>

            {/* Sticky purchase panel */}
            <div>
              <Loading
                data={course}
                skeleton={
                  <div
                    className="border"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <Skeleton className="w-full h-44" />
                    <div
                      className="p-6 space-y-3"
                      style={{ background: "var(--green-tint)" }}
                    >
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-8 w-28" />
                      <Skeleton className="h-11 w-full mt-4" />
                    </div>
                  </div>
                }
              >
                {(c) => (
                  <div
                    className="border sticky top-24"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    {c.thumbnail && (
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        className="w-full h-44 object-cover"
                      />
                    )}
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
                        ₦{c.price.toLocaleString()}
                      </div>
                      <Link
                        href={`/courses/${slug}/checkout`}
                        className="mt-6 w-full py-3.5 text-white mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "var(--green)" }}
                      >
                        Enroll now <ArrowRight size={14} />
                      </Link>
                      <p
                        className="mt-4 text-xs leading-relaxed"
                        style={{ color: "#6B7688" }}
                      >
                        Certificate issued on completion · Lifetime access
                      </p>
                    </div>
                  </div>
                )}
              </Loading>
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

          <Loading
            data={course}
            skeleton={
              <div className="border-t" style={{ borderColor: "var(--rule)" }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-2 py-5 border-b"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            }
          >
            {(c) => (
              <div className="border-t" style={{ borderColor: "var(--rule)" }}>
                {c.sections.map((section) => {
                  const ref = sectionRef(section.position);
                  const sectionSeconds = section.lessons.reduce(
                    (s, l) => s + l.duration,
                    0,
                  );
                  return (
                    <details
                      key={section.id}
                      className="border-b"
                      style={{ borderColor: "var(--rule)" }}
                      open
                    >
                      <summary className="row-hover flex items-center justify-between px-2 py-5">
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
                          <ArrowRight
                            size={13}
                            className="chev transition-transform"
                            style={{ color: "var(--green)" }}
                          />
                        </div>
                      </summary>

                      <div className="pb-2">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
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
                              {lesson.description && (
                                <div
                                  className="text-xs mt-1"
                                  style={{ color: "#8A93A2" }}
                                >
                                  {lesson.description}
                                </div>
                              )}
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
            )}
          </Loading>
        </section>

        {/* Footer CTA */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div
            className="border p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ borderColor: "var(--rule)" }}
          >
            <Loading
              data={course}
              skeleton={
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
              }
            >
              {(c) => {
                const totalLessons = c.sections.reduce(
                  (sum, s) => sum + s.lessons.length,
                  0,
                );
                return (
                  <div>
                    <h3 className="serif text-2xl font-semibold">
                      Ready to get started?
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "#6B7688" }}>
                      Join {totalLessons} lessons across {c.sections.length}{" "}
                      sections.
                    </p>
                  </div>
                );
              }}
            </Loading>
            <Link
              href={`/courses/${slug}/checkout`}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--green)" }}
            >
              Enroll now <ArrowRight size={16} />
            </Link>
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
