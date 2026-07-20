import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import CellTag from "./CellTag";
import { ICourse } from "@/store/courses";

// export interface ICourse {
//   id: string;
//   title: string;
//   description: string;
//   thumbnail: string;
//   price: string;
//   isPublished: boolean;
//   categoryId: string;
//   instructorId: string;
// }
export default function SingleCourse({ course }: { course: ICourse }) {
  // const Icon = course.icon;

  return (
    <div
      className="row-hover grid md:grid-cols-[64px_1fr_260px] gap-6 md:gap-10 py-14 border-b"
      style={{ borderColor: "var(--rule)" }}
    >
      <div className="hidden md:flex flex-col items-start">
        <span className="mono text-sm" style={{ color: "var(--gold)" }}>
          {/* {course.category.name} */}
        </span>
        <div
          className="mt-3 w-px flex-1"
          style={{ background: "var(--rule)" }}
        />
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <CellTag color="#052073">{course.id}</CellTag>
          <span
            className="mono text-[11px] tracking-widest uppercase"
            style={{ color: "#052073" }}
          >
            {course.category.name}
          </span>
        </div>
        <h2 className="serif text-3xl md:text-4xl font-semibold">
          {course.title}
        </h2>
        <p
          className="mt-4 leading-relaxed max-w-xl"
          style={{ color: "#4B5768" }}
        >
          {course.description}
        </p>

        <div
          className="mt-6 flex flex-wrap gap-5 mono text-xs"
          style={{ color: "#6B7688" }}
        >
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={14} /> Certificate
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} /> Online
          </span>
        </div>

        <div className="mt-8">
          <h4
            className="mono text-[11px] tracking-widest uppercase mb-3"
            style={{ color: "var(--ink)" }}
          >
            Learning Outcomes
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "#354154" }}>
            {course.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "#052073" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div
          className="border p-6 flex flex-col items-start h-full"
          style={{
            borderColor: "var(--rule)",
            background: "var(--green-tint)",
          }}
        >
          {/* <Icon size={26} style={{ color: "#052073" }} /> */}
          <div
            className="mt-6 mono text-[11px] tracking-widest uppercase"
            style={{ color: "#6B7688" }}
          >
            Tuition
          </div>
          <div
            className="mono text-3xl font-medium mt-1"
            style={{ color: "var(--ink)" }}
          >
            ₦{course.price}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className="mt-6 mono text-xs inline-flex items-center gap-1.5 pb-0.5 border-b"
            style={{ color: "#052073", borderColor: "#052073" }}
          >
            Enroll now <ArrowUpRight size={13} />
          </Link>
          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "#6B7688" }}
          >
            Downloadable certificate issued on successful completion.
          </p>
        </div>
      </div>
    </div>
  );
}
