import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Users,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { ICourse } from "@/store/courses";

// Simple deterministic color assignment per category name so the catalog
// doesn't look monotonous, without having to hardcode every possible
// category your admin might create.
const PALETTE = [
  { tag: "#7C3AED", tagBg: "#F3EBFF", tile: "#0B1B4B" },
  { tag: "#0284C7", tagBg: "#E6F5FD", tile: "#0B1B4B" },
  { tag: "#0FAE68", tagBg: "#E9FBF2", tile: "#0B1B4B" },
  { tag: "#DB2777", tagBg: "#FCE7F3", tile: "#0B1B4B" },
];

function styleForCategory(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export default function SingleCourse({ course }: { course: ICourse }) {
  const categoryName = course.category?.name ?? "Course";
  const colors = styleForCategory(categoryName);

  return (
    <div
      className="rounded-3xl p-6 md:p-8 mb-6 grid md:grid-cols-[1fr_260px] gap-8"
      style={{
        background: "white",
        boxShadow: "0 4px 24px rgba(5,32,115,0.06)",
      }}
    >
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: colors.tile }}
          >
            <Layers size={20} color="white" strokeWidth={2} />
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: colors.tagBg, color: colors.tag }}
          >
            {categoryName}
          </span>
        </div>

        <h2
          className="display font-bold text-2xl md:text-3xl mb-3"
          style={{ color: "#0B1B4B" }}
        >
          {course.title}
        </h2>
        <p
          className="leading-relaxed max-w-xl mb-5"
          style={{ color: "#5B6472" }}
        >
          {course.description}
        </p>

        <div
          className="flex flex-wrap gap-5 text-sm mb-6"
          style={{ color: "#6B7280" }}
        >
          <span className="flex items-center gap-1.5">
            <Clock size={15} /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={15} /> Certificate
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={15} /> Online
          </span>
        </div>

        <div>
          <h4
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#0B1B4B" }}
          >
            Learning outcomes
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "#3F4756" }}>
            {course.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "#0FAE68" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div
          className="rounded-2xl p-6 flex flex-col items-start h-full"
          style={{ background: "#F5F9F7" }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#6B7280" }}
          >
            Tuition
          </span>
          <div
            className="display font-bold text-3xl mt-1"
            style={{ color: "#0B1B4B" }}
          >
            ₦{course.price}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="mt-6 px-5 py-3 rounded-full text-sm font-semibold text-white flex items-center gap-2"
            style={{ background: "#0FAE68" }}
          >
            Enroll now <ArrowRight size={14} />
          </Link>
          <p
            className="mt-5 text-xs leading-relaxed"
            style={{ color: "#6B7280" }}
          >
            Downloadable certificate issued on successful completion.
          </p>
        </div>
      </div>
    </div>
  );
}
