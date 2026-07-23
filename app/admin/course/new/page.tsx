// app/admin/courses/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  GripVertical,
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertTriangle,
} from "lucide-react";
import AdminAPI from "@/services/admin";
import { AdminCategory, AdminUser } from "@/types/admin";
import { AxiosError } from "axios";

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

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span
        className="mono text-[11px] tracking-widest uppercase block mb-2"
        style={{ color: "#6B7688" }}
      >
        {label}
      </span>
      <input
        {...props}
        className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
        style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
      />
    </label>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sectionRef(position: number) {
  return String.fromCharCode(64 + position);
}

const emptyLesson = () => ({ title: "", description: "", duration: "" });
const emptySection = () => ({ title: "", lessons: [emptyLesson()] });

type Step = { label: string; status: "pending" | "active" | "done" | "error" };

export default function NewCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [instructors, setInstructors] = useState<AdminUser[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    price: "",
    duration: "",
    categoryId: "",
    instructorId: "",
    isPublished: false,
    outcomes: [""],
    sections: [emptySection()],
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        const [catRes, userRes] = await Promise.all([
          AdminAPI.listCategories(),
          AdminAPI.listUsers(),
        ]);
        setCategories(catRes.data.categories);
        // No dedicated "instructors" endpoint — filter the full user list.
        setInstructors(
          userRes.data.users.filter((u) => u.role === "INSTRUCTOR"),
        );
      } catch (err) {
        console.error(err);
      }
    }
    loadOptions();
  }, []);

  function updateField(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function updateTitle(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: slugTouched ? f.slug : slugify(title),
    }));
  }

  function updateOutcome(index: number, value: string) {
    setForm((f) => ({
      ...f,
      outcomes: f.outcomes.map((o, i) => (i === index ? value : o)),
    }));
  }
  function addOutcome() {
    setForm((f) => ({ ...f, outcomes: [...f.outcomes, ""] }));
  }
  function removeOutcome(index: number) {
    setForm((f) => ({
      ...f,
      outcomes: f.outcomes.filter((_, i) => i !== index),
    }));
  }

  function updateSectionTitle(index: number, title: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === index ? { ...s, title } : s)),
    }));
  }
  function addSection() {
    setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }));
  }
  function removeSection(index: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((_, i) => i !== index),
    }));
  }

  function updateLesson(
    sectionIndex: number,
    lessonIndex: number,
    key: string,
    value: string,
  ) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, si) =>
        si === sectionIndex
          ? {
              ...s,
              lessons: s.lessons.map((l, li) =>
                li === lessonIndex ? { ...l, [key]: value } : l,
              ),
            }
          : s,
      ),
    }));
  }
  function addLesson(sectionIndex: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, si) =>
        si === sectionIndex
          ? { ...s, lessons: [...s.lessons, emptyLesson()] }
          : s,
      ),
    }));
  }
  function removeLesson(sectionIndex: number, lessonIndex: number) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, si) =>
        si === sectionIndex
          ? { ...s, lessons: s.lessons.filter((_, li) => li !== lessonIndex) }
          : s,
      ),
    }));
  }

  function setStepStatus(index: number, status: Step["status"]) {
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, status } : s)),
    );
  }

  async function handleSubmit(e: React.FormEvent, publish: boolean) {
    e.preventDefault();
    setSubmitError("");

    const validSections = form.sections
      .filter((s) => s.title.trim() !== "")
      .map((s) => ({
        ...s,
        lessons: s.lessons.filter((l) => l.title.trim() !== ""),
      }));

    // Build the step list up front so the log renders immediately.
    const stepList: Step[] = [{ label: "Create course", status: "pending" }];
    validSections.forEach((s, si) => {
      stepList.push({
        label: `Create section ${sectionRef(si + 1)} — ${s.title}`,
        status: "pending",
      });
      s.lessons.forEach((l, li) => {
        stepList.push({
          label: `Create lesson ${sectionRef(si + 1)}${li + 1} — ${l.title}`,
          status: "pending",
        });
      });
    });
    setSteps(stepList);
    setSaving(true);

    let stepIndex = 0;
    try {
      // 1. Course itself — flat fields only, no nested sections/lessons/outcomes.
      setStepStatus(stepIndex, "active");
      const courseRes = await AdminAPI.createCourse({
        title: form.title,
        slug: form.slug,
        description: form.description,
        thumbnail: form.thumbnail,
        price: Number(form.price),
        instructorId: form.instructorId,
        categoryId: form.categoryId || undefined,
        duration: form.duration || undefined,
        isPublished: publish,
      });
      const courseId = courseRes.data.course.id;
      setStepStatus(stepIndex, "done");
      stepIndex++;

      // 2. Sections + lessons, sequentially — each lesson needs its parent
      //    section's real id, which we only get after that section is created.
      for (const section of validSections) {
        setStepStatus(stepIndex, "active");
        const sectionRes = await AdminAPI.createSection(courseId, {
          title: section.title,
          position: validSections.indexOf(section) + 1,
        });
        const sectionId = sectionRes.data.section.id;
        setStepStatus(stepIndex, "done");
        stepIndex++;

        for (const lesson of section.lessons) {
          setStepStatus(stepIndex, "active");
          await AdminAPI.createLesson(sectionId, {
            title: lesson.title,
            description: lesson.description || undefined,
            duration: Number(lesson.duration) * 60 || 0, // minutes -> seconds
            position: section.lessons.indexOf(lesson) + 1,
          });
          setStepStatus(stepIndex, "done");
          stepIndex++;
        }
      }

      router.push(`/admin/courses/${courseId}`);
    } catch (err) {
      setStepStatus(stepIndex, "error");

      if (err instanceof AxiosError) {
        setSubmitError(
          err.response?.data?.message ??
            "Something failed partway through. Whatever completed above already exists — open the course to finish manually.",
        );
      } else {
        setSubmitError(
          "Something failed partway through. Whatever completed above already exists — open the course to finish manually.",
        );
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="sans">
      <style>{`.admin-input:focus { outline: none; border-color: var(--green) !important; }`}</style>

      <div
        className="flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} style={{ color: "#6B7688" }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <CellTag>NEW COURSE</CellTag>
            <h1 className="serif text-xl font-semibold mt-1">Add a course</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={saving}
            className="px-5 py-2.5 mono text-xs tracking-widest uppercase border disabled:opacity-50"
            style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
          >
            Save draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={saving}
            className="px-5 py-2.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--green)" }}
          >
            {saving ? "Saving…" : "Publish course"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl px-8 py-10 grid md:grid-cols-[1fr_260px] gap-10">
        <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
          {/* A — Course details */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <CellTag>A</CellTag>
              <h2
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--ink)" }}
              >
                Course details
              </h2>
            </div>

            <div className="space-y-5">
              <Field
                label="Title"
                value={form.title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Complete TypeScript for Beginners"
              />
              <Field
                label="Slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  updateField("slug", e.target.value);
                }}
                placeholder="complete-typescript-for-beginners"
              />

              <label className="block">
                <span
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Description
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={3}
                  className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm resize-none"
                  style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                />
              </label>

              <Field
                label="Thumbnail URL"
                value={form.thumbnail}
                onChange={(e) => updateField("thumbnail", e.target.value)}
                placeholder="https://…"
              />

              <div className="grid sm:grid-cols-3 gap-5">
                <Field
                  label="Price (₦)"
                  type="number"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  placeholder="8000"
                />
                <Field
                  label="Duration"
                  value={form.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  placeholder="6 Weeks"
                />
                <label className="block">
                  <span
                    className="mono text-[11px] tracking-widest uppercase block mb-2"
                    style={{ color: "#6B7688" }}
                  >
                    Category
                  </span>
                  <select
                    value={form.categoryId}
                    onChange={(e) => updateField("categoryId", e.target.value)}
                    className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                  >
                    <option value="">— Uncategorized —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Instructor
                </span>
                <select
                  value={form.instructorId}
                  onChange={(e) => updateField("instructorId", e.target.value)}
                  className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
                  style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                  required
                >
                  <option value="">Select an instructor…</option>
                  {instructors.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.firstName} {i.lastName}
                    </option>
                  ))}
                </select>
                {instructors.length === 0 && (
                  <p className="text-xs mt-2" style={{ color: "#9AA3B2" }}>
                    No users with role INSTRUCTOR found — assign one from the
                    Users page first.
                  </p>
                )}
              </label>
            </div>
          </section>

          {/* B — Outcomes */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <CellTag>B</CellTag>
              <h2
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--ink)" }}
              >
                Learning outcomes
              </h2>
            </div>

            <div
              className="flex items-start gap-2 mb-6 p-3 border"
              style={{ borderColor: "#F0B429", background: "#FFF8E6" }}
            >
              <AlertTriangle
                size={15}
                className="mt-0.5 flex-shrink-0"
                style={{ color: "#946800" }}
              />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#946800" }}
              >
                Backend gap: your <code>createCourse</code>/
                <code>updateCourse</code> controllers don&apos;t read or save
                <code> outcomes</code> yet. Anything typed below won&apos;t
                persist until that&apos;s added server-side — see note after
                this form.
              </p>
            </div>

            <div className="space-y-3">
              {form.outcomes.map((outcome, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span
                    className="mono text-xs w-6"
                    style={{ color: "var(--gold)" }}
                  >
                    {i + 1}
                  </span>
                  <input
                    value={outcome}
                    onChange={(e) => updateOutcome(i, e.target.value)}
                    placeholder="Understand TypeScript fundamentals"
                    className="admin-input flex-1 px-3.5 py-2.5 border bg-transparent text-sm"
                    style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
                  />
                  <button
                    type="button"
                    onClick={() => removeOutcome(i)}
                    style={{ color: "#9AA3B2" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOutcome}
                className="flex items-center gap-2 mono text-xs tracking-widest uppercase mt-2"
                style={{ color: "var(--green)" }}
              >
                <Plus size={14} /> Add outcome
              </button>
            </div>
          </section>

          {/* C — Curriculum */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <CellTag>C</CellTag>
              <h2
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--ink)" }}
              >
                Curriculum
              </h2>
            </div>

            <div className="space-y-8">
              {form.sections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="border"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <div
                    className="flex items-center gap-3 px-5 py-4 border-b"
                    style={{
                      borderColor: "var(--rule)",
                      background: "var(--green-tint)",
                    }}
                  >
                    <span
                      className="mono text-sm"
                      style={{ color: "var(--gold)" }}
                    >
                      {sectionRef(sIdx + 1)}
                    </span>
                    <input
                      value={section.title}
                      onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
                      placeholder="Section title, e.g. Getting Started"
                      className="admin-input flex-1 bg-transparent text-sm font-medium border-none px-0 py-1"
                      style={{ color: "var(--ink)" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(sIdx)}
                      style={{ color: "#9AA3B2" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div
                    className="divide-y"
                    style={{ borderColor: "var(--rule)" }}
                  >
                    {section.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex items-start gap-3 px-5 py-4"
                        style={{ borderColor: "var(--rule)" }}
                      >
                        <GripVertical
                          size={16}
                          className="mt-2.5 flex-shrink-0"
                          style={{ color: "#C7CCD4" }}
                        />
                        <span
                          className="mono text-xs mt-2.5 w-8 flex-shrink-0"
                          style={{ color: "var(--green)" }}
                        >
                          {sectionRef(sIdx + 1)}
                          {lIdx + 1}
                        </span>
                        <div className="flex-1 grid sm:grid-cols-[1fr_100px] gap-3">
                          <input
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(sIdx, lIdx, "title", e.target.value)
                            }
                            placeholder="Lesson title"
                            className="admin-input px-3 py-2 border bg-transparent text-sm"
                            style={{
                              borderColor: "var(--rule)",
                              color: "var(--ink)",
                            }}
                          />
                          <input
                            value={lesson.duration}
                            onChange={(e) =>
                              updateLesson(
                                sIdx,
                                lIdx,
                                "duration",
                                e.target.value,
                              )
                            }
                            placeholder="Mins"
                            type="number"
                            className="admin-input px-3 py-2 border bg-transparent text-sm mono"
                            style={{
                              borderColor: "var(--rule)",
                              color: "var(--ink)",
                            }}
                          />
                          <input
                            value={lesson.description}
                            onChange={(e) =>
                              updateLesson(
                                sIdx,
                                lIdx,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Short description (optional)"
                            className="admin-input px-3 py-2 border bg-transparent text-sm sm:col-span-2"
                            style={{
                              borderColor: "var(--rule)",
                              color: "var(--ink)",
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLesson(sIdx, lIdx)}
                          className="mt-2"
                          style={{ color: "#9AA3B2" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addLesson(sIdx)}
                      className="flex items-center gap-2 px-5 py-3 mono text-xs tracking-widest uppercase w-full text-left"
                      style={{ color: "var(--green)" }}
                    >
                      <Plus size={14} /> Add lesson
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 px-5 py-3 mono text-xs tracking-widest uppercase border w-full justify-center"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              >
                <Plus size={14} /> Add section
              </button>
            </div>

            <p className="text-xs mt-6" style={{ color: "#9AA3B2" }}>
              Video files are attached per lesson after creation — there&apos;s
              no create-video endpoint in your admin controller yet, only{" "}
              <code>updateVideo</code> for an existing record. That upload flow
              needs building separately.
            </p>
          </section>
        </form>

        {/* Submission log — sticky, shows each sequential API call as it fires */}
        <div className="hidden md:block">
          <div
            className="sticky top-8 border"
            style={{ borderColor: "var(--rule)" }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: "var(--rule)" }}
            >
              <span
                className="mono text-[11px] tracking-widest uppercase"
                style={{ color: "#6B7688" }}
              >
                Submission log
              </span>
            </div>
            <div className="p-5 space-y-3 max-h-96 overflow-y-auto">
              {steps.length === 0 ? (
                <p className="text-xs" style={{ color: "#9AA3B2" }}>
                  Nothing submitted yet.
                </p>
              ) : (
                steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    {step.status === "done" ? (
                      <CheckCircle2
                        size={13}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--green)" }}
                      />
                    ) : step.status === "error" ? (
                      <AlertTriangle
                        size={13}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "#B42318" }}
                      />
                    ) : step.status === "active" ? (
                      <Circle
                        size={13}
                        className="mt-0.5 flex-shrink-0 animate-pulse"
                        style={{ color: "var(--gold)" }}
                      />
                    ) : (
                      <Circle
                        size={13}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "var(--rule)" }}
                      />
                    )}
                    <span
                      style={{
                        color:
                          step.status === "pending" ? "#9AA3B2" : "var(--ink)",
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                ))
              )}
            </div>
            {submitError && (
              <div
                className="px-5 py-4 border-t text-xs leading-relaxed"
                style={{ borderColor: "var(--rule)", color: "#B42318" }}
              >
                {submitError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
