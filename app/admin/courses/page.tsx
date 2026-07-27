"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminAPI from "@/services/admin";
import type { AdminCourse } from "@/types/admin";
import DataTable, { type Column } from "@/app/components/Admin/DataTable";
import { ConfirmModal } from "@/app/components/Admin/ConfirmModal";

function CellTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center border px-2 py-0.5 text-[11px] tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--green)", borderColor: "var(--rule)", background: "var(--paper)" }}>{children}</span>;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<AdminCourse[] | null>(null);
  const [toDelete, setToDelete] = useState<AdminCourse | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await AdminAPI.listCourses();
        setCourses(response.data.courses);
      } catch (error) {
        console.error(error);
        setCourses([]);
      }
    }
    void loadCourses();
  }, []);

  async function deleteCourse() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await AdminAPI.deleteCourse(toDelete.id);
      setCourses((current) => current?.filter((course) => course.id !== toDelete.id) ?? null);
      setToDelete(null);
    } catch (error) {
      console.error(error);
      alert("Unable to delete this course. It may have records that need attention.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: Column<AdminCourse>[] = [
    { header: "Course", cell: (course) => <Link href={`/admin/course/${course.id}`} className="font-medium hover:underline">{course.title}</Link> },
    { header: "Owner", cell: (course) => <span>{course.instructor.firstName} {course.instructor.lastName}</span> },
    { header: "Category", cell: (course) => course.category?.name ?? "Uncategorized" },
    { header: "Price", cell: (course) => <span className="mono">₦{Number(course.price).toLocaleString()}</span> },
    { header: "Content", cell: (course) => `${course._count.sections} sections · ${course._count.enrollments} learners` },
    { header: "Status", cell: (course) => <span className="mono text-[10px] tracking-widest" style={{ color: course.isPublished ? "var(--green)" : "#AD8330" }}>{course.isPublished ? "PUBLISHED" : "DRAFT"}</span> },
  ];

  return <div className="sans">
    <div className="flex items-center justify-between border-b px-8 py-6" style={{ borderColor: "var(--rule)" }}>
      <div><CellTag>COURSES</CellTag><h1 className="serif mt-2 text-2xl font-semibold">Courses</h1><p className="mt-1 text-sm" style={{ color: "#6B7688" }}>Manage every course, its owner, content, and publishing state.</p></div>
      <Link href="/admin/course/new" className="flex items-center gap-2 px-5 py-2.5 text-white mono text-xs tracking-widest uppercase" style={{ backgroundColor: "var(--green)" }}><Plus size={14} /> Add course</Link>
    </div>
    <div className="p-8"><DataTable columns={columns} rows={courses} emptyLabel="No courses yet. Create the first one to get started." actions={(course) => <><Link href={`/admin/course/${course.id}`} title="Edit course" style={{ color: "var(--green)" }}><Pencil size={15} /></Link><button onClick={() => setToDelete(course)} title="Delete course" style={{ color: "#B42318" }}><Trash2 size={15} /></button></>} /></div>
    <ConfirmModal open={Boolean(toDelete)} title="Delete this course?" message={`This permanently removes “${toDelete?.title ?? "this course"}”, its lessons, enrollments, payments, and certificates.`} onConfirm={deleteCourse} onCancel={() => setToDelete(null)} confirming={deleting} />
  </div>;
}
