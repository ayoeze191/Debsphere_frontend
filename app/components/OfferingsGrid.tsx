import { BookOpen, Users, TrendingUp } from "lucide-react";

const offerings = [
  {
    icon: BookOpen,
    title: "Practical Curriculum",
    desc: "Courses designed for real-world application, not just theory. Learn skills employers actually need.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    desc: "Learn from industry veterans who bring years of experience and practical insights to every session.",
  },
  {
    icon: TrendingUp,
    title: "Career-Focused",
    desc: "From skills to strategy — we prepare you for career growth, employability, and long-term success.",
  },
];

export default function OfferingsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {offerings.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl p-7"
          style={{
            background: "white",
            boxShadow: "0 4px 24px rgba(5,32,115,0.06)",
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: "#0B1B4B" }}
          >
            <item.icon size={22} color="white" strokeWidth={2} />
          </div>
          <h3
            className="display font-bold text-lg mb-2"
            style={{ color: "#0B1B4B" }}
          >
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
