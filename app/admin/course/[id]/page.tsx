"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save, CheckCircle2 } from "lucide-react";
import AdminAPI from "@/services/admin";
import { ConfirmModal } from "@/app/components/Admin/ConfirmModal";
import { AttachVideo } from "@/app/components/Admin/AttachVideo";
import { ThumbnailUpload } from "@/app/components/Admin/ThumbnailUpload";

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

function sectionRef(position: number) {
  return String.fromCharCode(64 + position);
}

export default function CourseEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "course" | "section" | "lesson";
    id: string;
    label: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  async function load() {
    try {
      const [courseRes, catRes, userRes] = await Promise.all([
        AdminAPI.getCourse(id),
        AdminAPI.listCategories(),
        AdminAPI.listUsers(),
      ]);
      setCourse(courseRes.data.course);
      setCategories(catRes.data.categories);
      setInstructors(
        userRes.data.users.filter((u: any) => u.role === "INSTRUCTOR"),
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  function updateCourseField(key: string, value: any) {
    setCourse((c: any) => ({ ...c, [key]: value }));
    setSaved(false);
  }

  async function saveCourse() {
    setSaving(true);
    try {
      await AdminAPI.updateCourse(id, {
        title: course.title,
        slug: course.slug,
        description: course.description,
        thumbnail: course.thumbnail,
        price: Number(course.price),
        duration: course.duration || undefined,
        categoryId: course.categoryId || undefined,
        instructorId: course.instructorId,
        isPublished: course.isPublished,
      });
      setSaved(true);
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Unable to save course details.");
    } finally {
      setSaving(false);
    }
  }

  async function addSection() {
    if (!newSectionTitle.trim()) return;
    try {
      const res = await AdminAPI.createSection(id, {
        title: newSectionTitle.trim(),
        position: course.sections.length + 1,
      });
      setCourse((c: any) => ({
        ...c,
        sections: [...c.sections, { ...res.data.section, lessons: [] }],
      }));
      setNewSectionTitle("");
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Unable to create section.");
    }
  }

  async function saveSectionTitle(sectionId: string, title: string) {
    try {
      await AdminAPI.updateSection(sectionId, { title });
    } catch (err) {
      console.error(err);
    }
  }

  async function addLesson(sectionId: string, sectionIndex: number) {
    const title = prompt("Lesson title:");
    if (!title?.trim()) return;
    const minutes = prompt("Duration in minutes:", "5");
    try {
      const section = course.sections[sectionIndex];
      const res = await AdminAPI.createLesson(sectionId, {
        title: title.trim(),
        duration: Number(minutes || 0) * 60,
        position: section.lessons.length + 1,
      });
      setCourse((c: any) => ({
        ...c,
        sections: c.sections.map((s: any, i: number) =>
          i === sectionIndex
            ? { ...s, lessons: [...s.lessons, res.data.lesson] }
            : s,
        ),
      }));
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Unable to create lesson.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === "course") {
        await AdminAPI.deleteCourse(deleteTarget.id);
        router.push("/admin/courses");
        return;
      }
      if (deleteTarget.type === "section") {
        await AdminAPI.deleteSection(deleteTarget.id);
        setCourse((c: any) => ({
          ...c,
          sections: c.sections.filter((s: any) => s.id !== deleteTarget.id),
        }));
      }
      if (deleteTarget.type === "lesson") {
        await AdminAPI.deleteLesson(deleteTarget.id);
        setCourse((c: any) => ({
          ...c,
          sections: c.sections.map((s: any) => ({
            ...s,
            lessons: s.lessons.filter((l: any) => l.id !== deleteTarget.id),
          })),
        }));
      }
      setDeleteTarget(null);
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Unable to delete.");
    } finally {
      setDeleting(false);
    }
  }

  if (!course) {
    return (
      <div className="sans p-8">
        <p className="text-sm" style={{ color: "#9AA3B2" }}>
          Loading course…
        </p>
      </div>
    );
  }

  return (
    <div className="sans">
      <style>{`.admin-input:focus { outline: none; border-color: var(--green) !important; }`}</style>

      <div
        className="flex items-center justify-between px-8 py-5 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/courses")}
            style={{ color: "#6B7688" }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <CellTag>{course.isPublished ? "PUBLISHED" : "DRAFT"}</CellTag>
            <h1 className="serif text-xl font-semibold mt-1">{course.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              setDeleteTarget({
                type: "course",
                id: course.id,
                label: course.title,
              })
            }
            className="px-5 py-2.5 mono text-xs tracking-widest uppercase border"
            style={{ borderColor: "#B42318", color: "#B42318" }}
          >
            Delete course
          </button>
          <button
            onClick={saveCourse}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-white mono text-xs tracking-widest uppercase disabled:opacity-50"
            style={{ backgroundColor: "var(--green)" }}
          >
            {saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl px-8 py-10 space-y-16">
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
              value={course.title}
              onChange={(e) => updateCourseField("title", e.target.value)}
            />
            <Field
              label="Slug"
              value={course.slug}
              onChange={(e) => updateCourseField("slug", e.target.value)}
            />
            <label className="block">
              <span
                className="mono text-[11px] tracking-widest uppercase block mb-2"
                style={{ color: "#6B7688" }}
              >
                Description
              </span>
              <textarea
                value={course.description}
                onChange={(e) =>
                  updateCourseField("description", e.target.value)
                }
                rows={3}
                className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm resize-none"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              />
            </label>
            <label className="block">
              <span className="mono text-[11px] tracking-widest uppercase block mb-2" style={{ color: "#6B7688" }}>
                Thumbnail
              </span>
              <ThumbnailUpload value={course.thumbnail} onChange={(url) => updateCourseField("thumbnail", url)} />
            </label>

            <div className="grid sm:grid-cols-3 gap-5">
              <Field
                label="Price (₦)"
                type="number"
                value={course.price}
                onChange={(e) => updateCourseField("price", e.target.value)}
              />
              <Field
                label="Duration"
                value={course.duration ?? ""}
                onChange={(e) => updateCourseField("duration", e.target.value)}
              />
              <label className="block">
                <span
                  className="mono text-[11px] tracking-widest uppercase block mb-2"
                  style={{ color: "#6B7688" }}
                >
                  Category
                </span>
                <select
                  value={course.categoryId ?? ""}
                  onChange={(e) =>
                    updateCourseField("categoryId", e.target.value)
                  }
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
                value={course.instructorId}
                onChange={(e) =>
                  updateCourseField("instructorId", e.target.value)
                }
                className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              >
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.firstName} {i.lastName}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={course.isPublished}
                onChange={(e) =>
                  updateCourseField("isPublished", e.target.checked)
                }
                style={{ accentColor: "var(--green)" }}
              />
              <span className="text-sm" style={{ color: "var(--ink)" }}>
                Published
              </span>
            </label>
          </div>
        </section>

        {/* B — Curriculum */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <CellTag>B</CellTag>
            <h2
              className="mono text-[11px] tracking-widest uppercase"
              style={{ color: "var(--ink)" }}
            >
              Curriculum
            </h2>
          </div>

          <div className="space-y-8">
            {course.sections.map((section: any, sIdx: number) => (
              <div
                key={section.id}
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
                    {sectionRef(section.position)}
                  </span>
                  <input
                    defaultValue={section.title}
                    onBlur={(e) => saveSectionTitle(section.id, e.target.value)}
                    className="admin-input flex-1 bg-transparent text-sm font-medium border-none px-0 py-1"
                    style={{ color: "var(--ink)" }}
                  />
                  <button
                    onClick={() =>
                      setDeleteTarget({
                        type: "section",
                        id: section.id,
                        label: section.title,
                      })
                    }
                    style={{ color: "#9AA3B2" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div
                  className="divide-y"
                  style={{ borderColor: "var(--rule)" }}
                >
                  {section.lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-3 px-5 py-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span
                          className="mono text-xs flex-shrink-0"
                          style={{ color: "var(--green)" }}
                        >
                          {sectionRef(section.position)}
                          {lesson.position}
                        </span>
                        <span
                          className="text-sm truncate"
                          style={{ color: "var(--ink)" }}
                        >
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="w-56">
                          <AttachVideo
                            lessonId={lesson.id}
                            existingVideo={lesson.video}
                            onAttached={(video) =>
                              setCourse((c: any) => ({
                                ...c,
                                sections: c.sections.map((s: any) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        lessons: s.lessons.map((l: any) =>
                                          l.id === lesson.id
                                            ? { ...l, video }
                                            : l,
                                        ),
                                      }
                                    : s,
                                ),
                              }))
                            }
                          />
                        </div>
                        <button
                          onClick={() =>
                            setDeleteTarget({
                              type: "lesson",
                              id: lesson.id,
                              label: lesson.title,
                            })
                          }
                          style={{ color: "#9AA3B2" }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addLesson(section.id, sIdx)}
                    className="flex items-center gap-2 px-5 py-3 mono text-xs tracking-widest uppercase w-full text-left"
                    style={{ color: "var(--green)" }}
                  >
                    <Plus size={14} /> Add lesson
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3">
              <input
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="New section title"
                className="admin-input flex-1 px-3.5 py-2.5 border bg-transparent text-sm"
                style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              />
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-5 py-2.5 text-white mono text-xs tracking-widest uppercase"
                style={{ backgroundColor: "var(--green)" }}
              >
                <Plus size={14} /> Add section
              </button>
            </div>
          </div>
        </section>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title={`Delete this ${deleteTarget?.type}?`}
        message={`"${deleteTarget?.label}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        confirming={deleting}
      />
    </div>
  );
}
