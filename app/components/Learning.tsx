// app/courses/[slug]/learn/[lessonId]/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  PlayCircle,
  Loader2,
} from "lucide-react";
import CoursesAPI from "@/services/courses";
import type { Course, LessonVideo as LessonVideoData } from "@/types/course";

/**
 * Assumed shape from CoursesAPI.getCourseForLearning(slug) — adjust to match your API:
 * {
 *   id, title, slug,
 *   sections: [{ id, title, position, lessons: [
 *     {
 *       id, title, description, duration, position,
 *       video: { hlsUrl, originalUrl, thumbnail, status } | null,
 *       progress: { watched: boolean, completedAt: string | null } | null  // scoped to current user
 *     }
 *   ]}]
 * }
 *
 * VideoStatus enum values assumed: "PROCESSING" | "READY" | "FAILED" — adjust to match your enum.
 */

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

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse ${className}`}
      style={{ background: "var(--rule)" }}
    />
  );
}

function LessonVideo({ video }: { video?: LessonVideoData | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !video?.hlsUrl || video.status !== "READY") return;
    const hlsUrl = video.hlsUrl;

    // Safari plays HLS natively — no library needed there.
    if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
      videoEl.src = hlsUrl;
      return;
    }

    // Chrome/Firefox/etc need hls.js. `npm install hls.js` if you haven't.
    let cancelled = false;
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(hlsUrl);
        hls.attachMedia(videoEl);
        hlsRef.current = hls;
      }
    });

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [video?.hlsUrl, video?.status]);

  if (!video) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <PlayCircle size={40} style={{ color: "#4B5768" }} strokeWidth={1} />
        <span className="mono text-xs" style={{ color: "#4B5768" }}>
          No video for this lesson
        </span>
      </div>
    );
  }

  if (video.status !== "READY") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-cover bg-center"
        style={
          video.thumbnail
            ? { backgroundImage: `url(${video.thumbnail})` }
            : undefined
        }
      >
        <div
          className="flex items-center gap-2 px-4 py-2 mono text-xs"
          style={{ background: "rgba(14,27,46,0.85)", color: "white" }}
        >
          <Loader2 size={14} className="animate-spin" />
          {video.status === "FAILED"
            ? "Video failed to process"
            : "Video is still processing…"}
        </div>
      </div>
    );
  }

  // READY but no hlsUrl yet (edge case) — fall back to the raw upload if playable directly.
  if (!video.hlsUrl && video.originalUrl) {
    return (
      <video
        src={video.originalUrl ?? undefined}
        controls
        poster={video.thumbnail ?? undefined}
        className="w-full h-full"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      controls
      poster={video.thumbnail ?? undefined}
      className="w-full h-full"
    />
  );
}

export default function LearnLessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await CoursesAPI.getCourseForLearning(slug);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourse();
  }, [slug]);

  // Flatten all lessons in order, tagged with their section ref, for prev/next + progress.
  const flatLessons = useMemo(() => {
    if (!course) return [];
    return course.sections.flatMap((section) =>
      section.lessons.map((lesson) => ({
        ...lesson,
        ref: `${sectionRef(section.position)}${lesson.position}`,
        sectionTitle: section.title,
        completed: Boolean(lesson.progress?.[0]?.completedAt),
      })),
    );
  }, [course]);

  const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = flatLessons[currentIndex];
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]
      : null;

  const completedCount = flatLessons.filter((l) => l.completed).length;
  const progressPct = flatLessons.length
    ? Math.round((completedCount / flatLessons.length) * 100)
    : 0;

  async function toggleComplete() {
    if (!currentLesson) return;
    setMarking(true);
    try {
      const nowComplete = !currentLesson.completed;
      await CoursesAPI.markLessonComplete(currentLesson.id, nowComplete);
      setCourse((previousCourse) => {
        if (!previousCourse) return previousCourse;

        return {
          ...previousCourse,
          sections: previousCourse.sections.map((section) => ({
          ...section,
          lessons: section.lessons.map((lesson) =>
            lesson.id === currentLesson.id
              ? {
                  ...lesson,
                  progress: [{
                    watched: nowComplete,
                    completedAt: nowComplete ? new Date().toISOString() : null,
                  }],
                }
              : lesson,
          ),
        })),
        };
      });
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(false);
    }
  }

  function goTo(id: string) {
    setSidebarOpen(false);
    router.push(`/dashboard/learn/${slug}/${id}`);
  }

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
        .row-hover { transition: background-color 0.15s ease; }
        .row-hover:hover { background-color: var(--green-tint); }
      `}</style>

      <div className="sans flex flex-col h-screen">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: "var(--rule)" }}
        >
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href={`/courses/${slug}`}
              className="flex-shrink-0"
              style={{ color: "#6B7688" }}
            >
              <ArrowLeft size={18} />
            </Link>
            <span
              className="font-medium text-sm truncate"
              style={{ color: "var(--ink)" }}
            >
              {course ? course.title : <Skeleton className="h-4 w-40" />}
            </span>
          </div>

          <div
            className="hidden sm:flex items-center gap-3 mono text-xs"
            style={{ color: "#8A93A2" }}
          >
            <div
              className="w-32 h-1.5 border"
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="h-full"
                style={{ width: `${progressPct}%`, background: "var(--green)" }}
              />
            </div>
            <span>{progressPct}%</span>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex-shrink-0"
            style={{ color: "var(--ink)" }}
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Sidebar — curriculum */}
          <aside
            className={`
              fixed md:static inset-y-0 left-0 z-40 w-80 flex-shrink-0 border-r
              overflow-y-auto transition-transform md:translate-x-0
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
            style={{ borderColor: "var(--rule)", background: "var(--paper)" }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b md:hidden"
              style={{ borderColor: "var(--rule)" }}
            >
              <CellTag>CURRICULUM</CellTag>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ color: "#6B7688" }}
              >
                <X size={18} />
              </button>
            </div>

            {!course ? (
              <div className="p-5 space-y-4">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            ) : (
              course.sections.map((section) => {
                const ref = sectionRef(section.position);
                return (
                  <div
                    key={section.id}
                    className="border-b"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    <div
                      className="flex items-center gap-3 px-5 py-3 mono text-xs"
                      style={{ color: "var(--gold)" }}
                    >
                      <span>{ref}</span>
                      <span
                        className="uppercase tracking-widest"
                        style={{ color: "#8A93A2" }}
                      >
                        {section.title}
                      </span>
                    </div>
                    {section.lessons.map((lesson) => {
                      const isActive = lesson.id === lessonId;
                      const isComplete =
                        lesson.progress?.[0]?.watched ?? false;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => goTo(lesson.id)}
                          className="row-hover w-full flex items-start gap-3 px-5 py-3 text-left"
                          style={{
                            background: isActive
                              ? "var(--green-tint)"
                              : "transparent",
                          }}
                        >
                          {isComplete ? (
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "var(--green)" }}
                            />
                          ) : (
                            <Circle
                              size={16}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "var(--rule)" }}
                            />
                          )}
                          <span
                            className="text-sm leading-snug"
                            style={{
                              color: isActive ? "var(--green)" : "var(--ink)",
                              fontWeight: isActive ? 500 : 400,
                            }}
                          >
                            {lesson.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </aside>

          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main lesson content */}
          <main className="flex-1 overflow-y-auto">
            {!currentLesson ? (
              <div className="max-w-3xl mx-auto px-6 py-14">
                <Skeleton className="w-full h-72 mb-8" />
                <Skeleton className="h-8 w-2/3 mb-3" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto px-6 py-10">
                <div
                  className="w-full aspect-video border mb-8"
                  style={{ borderColor: "var(--rule)", background: "#0E1B2E" }}
                >
                  <LessonVideo video={currentLesson.video} />
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <CellTag>{currentLesson.ref}</CellTag>
                  <span
                    className="mono text-[11px] tracking-widest uppercase"
                    style={{ color: "#8A93A2" }}
                  >
                    {currentLesson.sectionTitle}
                  </span>
                </div>

                <h1 className="serif text-3xl font-semibold leading-tight">
                  {currentLesson.title}
                </h1>
                {currentLesson.description && (
                  <p
                    className="mt-4 leading-relaxed"
                    style={{ color: "#4B5768" }}
                  >
                    {currentLesson.description}
                  </p>
                )}

                <button
                  onClick={toggleComplete}
                  disabled={marking}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 mono text-xs tracking-widest uppercase border transition-colors disabled:opacity-50"
                  style={{
                    borderColor: "var(--green)",
                    color: currentLesson.completed ? "var(--green)" : "white",
                    background: currentLesson.completed
                      ? "transparent"
                      : "var(--green)",
                  }}
                >
                  <CheckCircle2 size={14} />
                  {currentLesson.completed
                    ? "Marked complete"
                    : "Mark as complete"}
                </button>

                {/* Prev / Next */}
                <div
                  className="flex items-center justify-between mt-14 pt-6 border-t"
                  style={{ borderColor: "var(--rule)" }}
                >
                  {prevLesson ? (
                    <button
                      onClick={() => goTo(prevLesson.id)}
                      className="flex items-center gap-2 mono text-xs tracking-widest uppercase"
                      style={{ color: "var(--ink)" }}
                    >
                      <ChevronLeft size={14} /> {prevLesson.title}
                    </button>
                  ) : (
                    <span />
                  )}

                  {nextLesson && (
                    <button
                      onClick={() => goTo(nextLesson.id)}
                      className="flex items-center gap-2 mono text-xs tracking-widest uppercase"
                      style={{ color: "var(--green)" }}
                    >
                      {nextLesson.title} <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
