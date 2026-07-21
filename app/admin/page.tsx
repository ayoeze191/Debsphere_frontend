export default function AdminPage() {
  return null;
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Plus, Trash2, GripVertical, ArrowLeft } from "lucide-react";
// import AdminAPI from "@/services/admin";

// function CellTag({ children }: { children: React.ReactNode }) {
//   return (
//     <span
//       className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wider border"
//       style={{
//         fontFamily: "'IBM Plex Mono', monospace",
//         color: "var(--green)",
//         borderColor: "var(--rule)",
//         background: "var(--paper)",
//       }}
//     >
//       {children}
//     </span>
//   );
// }

// function Field({
//   label,
//   ...props
// }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
//   return (
//     <label className="block">
//       <span className="mono text-[11px] tracking-widest uppercase block mb-2" style={{ color: "#6B7688" }}>
//         {label}
//       </span>
//       <input
//         {...props}
//         className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
//         style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//       />
//     </label>
//   );
// }

// function slugify(text: string) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// function sectionRef(position: number) {
//   return String.fromCharCode(64 + position);
// }

// const emptyLesson = () => ({ title: "", description: "", duration: "" });
// const emptySection = () => ({ title: "", lessons: [emptyLesson()] });

// export default function NewCoursePage() {
//   const router = useRouter();
//   const [saving, setSaving] = useState(false);
//   const [slugTouched, setSlugTouched] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [instructors, setInstructors] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     description: "",
//     thumbnail: "",
//     price: "",
//     duration: "",
//     categoryId: "",
//     instructorId: "",
//     isPublished: false,
//     outcomes: [""],
//     sections: [emptySection()],
//   });

//   useEffect(() => {
//     async function loadOptions() {
//       try {
//         const [catRes, instRes] = await Promise.all([
//           AdminAPI.getCategories(),
//           AdminAPI.getInstructors(),
//         ]);
//         setCategories(catRes.data);
//         setInstructors(instRes.data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     loadOptions();
//   }, []);

//   function updateField(key: string, value: any) {
//     setForm((f) => ({ ...f, [key]: value }));
//   }

//   function updateTitle(title: string) {
//     setForm((f) => ({
//       ...f,
//       title,
//       slug: slugTouched ? f.slug : slugify(title),
//     }));
//   }

//   // Outcomes
//   function updateOutcome(index: number, value: string) {
//     setForm((f) => ({ ...f, outcomes: f.outcomes.map((o, i) => (i === index ? value : o)) }));
//   }
//   function addOutcome() {
//     setForm((f) => ({ ...f, outcomes: [...f.outcomes, ""] }));
//   }
//   function removeOutcome(index: number) {
//     setForm((f) => ({ ...f, outcomes: f.outcomes.filter((_, i) => i !== index) }));
//   }

//   // Sections
//   function updateSectionTitle(index: number, title: string) {
//     setForm((f) => ({
//       ...f,
//       sections: f.sections.map((s, i) => (i === index ? { ...s, title } : s)),
//     }));
//   }
//   function addSection() {
//     setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }));
//   }
//   function removeSection(index: number) {
//     setForm((f) => ({ ...f, sections: f.sections.filter((_, i) => i !== index) }));
//   }

//   // Lessons
//   function updateLesson(sectionIndex: number, lessonIndex: number, key: string, value: string) {
//     setForm((f) => ({
//       ...f,
//       sections: f.sections.map((s, si) =>
//         si === sectionIndex
//           ? { ...s, lessons: s.lessons.map((l, li) => (li === lessonIndex ? { ...l, [key]: value } : l)) }
//           : s
//       ),
//     }));
//   }
//   function addLesson(sectionIndex: number) {
//     setForm((f) => ({
//       ...f,
//       sections: f.sections.map((s, si) => (si === sectionIndex ? { ...s, lessons: [...s.lessons, emptyLesson()] } : s)),
//     }));
//   }
//   function removeLesson(sectionIndex: number, lessonIndex: number) {
//     setForm((f) => ({
//       ...f,
//       sections: f.sections.map((s, si) =>
//         si === sectionIndex ? { ...s, lessons: s.lessons.filter((_, li) => li !== lessonIndex) } : s
//       ),
//     }));
//   }

//   async function handleSubmit(e: React.FormEvent, publish: boolean) {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload = {
//         title: form.title,
//         slug: form.slug,
//         description: form.description,
//         thumbnail: form.thumbnail,
//         price: Number(form.price),
//         duration: form.duration || null,
//         categoryId: form.categoryId || null,
//         instructorId: form.instructorId,
//         isPublished: publish,
//         outcomes: form.outcomes.filter((o) => o.trim() !== ""),
//         sections: form.sections
//           .filter((s) => s.title.trim() !== "")
//           .map((s, sIdx) => ({
//             title: s.title,
//             position: sIdx + 1,
//             lessons: s.lessons
//               .filter((l) => l.title.trim() !== "")
//               .map((l, lIdx) => ({
//                 title: l.title,
//                 description: l.description || null,
//                 duration: Number(l.duration) * 60 || 0, // minutes -> seconds
//                 position: lIdx + 1,
//               })),
//           })),
//       };

//       const res = await AdminAPI.createCourse(payload);
//       router.push(`/admin/courses/${res.data.id}`);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="sans">
//       <style>{`
//         .admin-input:focus { outline: none; border-color: var(--green) !important; }
//       `}</style>

//       {/* Top bar */}
//       <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "var(--rule)" }}>
//         <div className="flex items-center gap-4">
//           <button onClick={() => router.back()} style={{ color: "#6B7688" }}>
//             <ArrowLeft size={18} />
//           </button>
//           <div>
//             <div className="flex items-center gap-2">
//               <CellTag>NEW COURSE</CellTag>
//             </div>
//             <h1 className="serif text-xl font-semibold mt-1">Add a course</h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={(e) => handleSubmit(e, false)}
//             disabled={saving}
//             className="px-5 py-2.5 mono text-xs tracking-widest uppercase border disabled:opacity-50"
//             style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//           >
//             Save draft
//           </button>
//           <button
//             onClick={(e) => handleSubmit(e, true)}
//             disabled={saving}
//             className="px-5 py-2.5 text-white mono text-xs tracking-widest uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
//             style={{ backgroundColor: "var(--green)" }}
//           >
//             {saving ? "Saving…" : "Publish course"}
//           </button>
//         </div>
//       </div>

//       <form className="max-w-4xl px-8 py-10 space-y-16" onSubmit={(e) => e.preventDefault()}>
//         {/* A — Course details */}
//         <section>
//           <div className="flex items-center gap-3 mb-8">
//             <CellTag>A</CellTag>
//             <h2 className="mono text-[11px] tracking-widest uppercase" style={{ color: "var(--ink)" }}>
//               Course details
//             </h2>
//           </div>

//           <div className="space-y-5">
//             <Field label="Title" value={form.title} onChange={(e) => updateTitle(e.target.value)} placeholder="Complete TypeScript for Beginners" />
//             <Field
//               label="Slug"
//               value={form.slug}
//               onChange={(e) => {
//                 setSlugTouched(true);
//                 updateField("slug", e.target.value);
//               }}
//               placeholder="complete-typescript-for-beginners"
//             />

//             <label className="block">
//               <span className="mono text-[11px] tracking-widest uppercase block mb-2" style={{ color: "#6B7688" }}>
//                 Description
//               </span>
//               <textarea
//                 value={form.description}
//                 onChange={(e) => updateField("description", e.target.value)}
//                 rows={3}
//                 className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm resize-none"
//                 style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                 placeholder="Learn TypeScript fundamentals and build confidence writing safer JavaScript applications."
//               />
//             </label>

//             <Field
//               label="Thumbnail URL"
//               value={form.thumbnail}
//               onChange={(e) => updateField("thumbnail", e.target.value)}
//               placeholder="https://…"
//             />

//             <div className="grid sm:grid-cols-3 gap-5">
//               <Field label="Price (₦)" type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} placeholder="8000" />
//               <Field label="Duration" value={form.duration} onChange={(e) => updateField("duration", e.target.value)} placeholder="6 Weeks" />

//               <label className="block">
//                 <span className="mono text-[11px] tracking-widest uppercase block mb-2" style={{ color: "#6B7688" }}>
//                   Category
//                 </span>
//                 <select
//                   value={form.categoryId}
//                   onChange={(e) => updateField("categoryId", e.target.value)}
//                   className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
//                   style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                 >
//                   <option value="">— Uncategorized —</option>
//                   {categories.map((c: any) => (
//                     <option key={c.id} value={c.id}>{c.name}</option>
//                   ))}
//                 </select>
//               </label>
//             </div>

//             <label className="block">
//               <span className="mono text-[11px] tracking-widest uppercase block mb-2" style={{ color: "#6B7688" }}>
//                 Instructor
//               </span>
//               <select
//                 value={form.instructorId}
//                 onChange={(e) => updateField("instructorId", e.target.value)}
//                 className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
//                 style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                 required
//               >
//                 <option value="">Select an instructor…</option>
//                 {instructors.map((i: any) => (
//                   <option key={i.id} value={i.id}>{i.firstName} {i.lastName}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//         </section>

//         {/* B — Outcomes */}
//         <section>
//           <div className="flex items-center gap-3 mb-8">
//             <CellTag>B</CellTag>
//             <h2 className="mono text-[11px] tracking-widest uppercase" style={{ color: "var(--ink)" }}>
//               Learning outcomes
//             </h2>
//           </div>

//           <div className="space-y-3">
//             {form.outcomes.map((outcome, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <span className="mono text-xs w-6" style={{ color: "var(--gold)" }}>{i + 1}</span>
//                 <input
//                   value={outcome}
//                   onChange={(e) => updateOutcome(i, e.target.value)}
//                   placeholder="Understand TypeScript fundamentals"
//                   className="admin-input flex-1 px-3.5 py-2.5 border bg-transparent text-sm"
//                   style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                 />
//                 <button type="button" onClick={() => removeOutcome(i)} style={{ color: "#9AA3B2" }}>
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addOutcome}
//               className="flex items-center gap-2 mono text-xs tracking-widest uppercase mt-2"
//               style={{ color: "var(--green)" }}
//             >
//               <Plus size={14} /> Add outcome
//             </button>
//           </div>
//         </section>

//         {/* C — Curriculum */}
//         <section>
//           <div className="flex items-center gap-3 mb-8">
//             <CellTag>C</CellTag>
//             <h2 className="mono text-[11px] tracking-widest uppercase" style={{ color: "var(--ink)" }}>
//               Curriculum
//             </h2>
//           </div>

//           <div className="space-y-8">
//             {form.sections.map((section, sIdx) => (
//               <div key={sIdx} className="border" style={{ borderColor: "var(--rule)" }}>
//                 <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--rule)", background: "var(--green-tint)" }}>
//                   <span className="mono text-sm" style={{ color: "var(--gold)" }}>{sectionRef(sIdx + 1)}</span>
//                   <input
//                     value={section.title}
//                     onChange={(e) => updateSectionTitle(sIdx, e.target.value)}
//                     placeholder="Section title, e.g. Getting Started"
//                     className="admin-input flex-1 bg-transparent text-sm font-medium border-none px-0 py-1"
//                     style={{ color: "var(--ink)" }}
//                   />
//                   <button type="button" onClick={() => removeSection(sIdx)} style={{ color: "#9AA3B2" }}>
//                     <Trash2 size={16} />
//                   </button>
//                 </div>

//                 <div className="divide-y" style={{ borderColor: "var(--rule)" }}>
//                   {section.lessons.map((lesson, lIdx) => (
//                     <div key={lIdx} className="flex items-start gap-3 px-5 py-4" style={{ borderColor: "var(--rule)" }}>
//                       <GripVertical size={16} className="mt-2.5 flex-shrink-0" style={{ color: "#C7CCD4" }} />
//                       <span className="mono text-xs mt-2.5 w-8 flex-shrink-0" style={{ color: "var(--green)" }}>
//                         {sectionRef(sIdx + 1)}{lIdx + 1}
//                       </span>
//                       <div className="flex-1 grid sm:grid-cols-[1fr_100px] gap-3">
//                         <input
//                           value={lesson.title}
//                           onChange={(e) => updateLesson(sIdx, lIdx, "title", e.target.value)}
//                           placeholder="Lesson title"
//                           className="admin-input px-3 py-2 border bg-transparent text-sm"
//                           style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                         />
//                         <input
//                           value={lesson.duration}
//                           onChange={(e) => updateLesson(sIdx, lIdx, "duration", e.target.value)}
//                           placeholder="Mins"
//                           type="number"
//                           className="admin-input px-3 py-2 border bg-transparent text-sm mono"
//                           style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                         />
//                         <input
//                           value={lesson.description}
//                           onChange={(e) => updateLesson(sIdx, lIdx, "description", e.target.value)}
//                           placeholder="Short description (optional)"
//                           className="admin-input px-3 py-2 border bg-transparent text-sm sm:col-span-2"
//                           style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//                         />
//                       </div>
//                       <button type="button" onClick={() => removeLesson(sIdx, lIdx)} className="mt-2" style={{ color: "#9AA3B2" }}>
//                         <Trash2 size={15} />
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => addLesson(sIdx)}
//                     className="flex items-center gap-2 px-5 py-3 mono text-xs tracking-widest uppercase w-full text-left"
//                     style={{ color: "var(--green)" }}
//                   >
//                     <Plus size={14} /> Add lesson
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addSection}
//               className="flex items-center gap-2 px-5 py-3 mono text-xs tracking-widest uppercase border w-full justify-center"
//               style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
//             >
//               <Plus size={14} /> Add section
//             </button>
//           </div>

//           <p className="text-xs mt-6" style={{ color: "#9AA3B2" }}>
//             Video files are uploaded per lesson after the course is created — from the course edit screen.
//           </p>
//         </section>
//       </form>
//     </div>
//   );
// }
