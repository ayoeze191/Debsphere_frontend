import { Users, Award, BarChart3 } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Active waitlist members" },
  { icon: Award, value: "12+", label: "Industry mentors" },
  { icon: BarChart3, value: "8+", label: "Data projects launched" },
];

export default function AboutStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 px-5 py-5 rounded-2xl"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(5,32,115,0.06)",
          }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#E9FBF2" }}
          >
            <stat.icon size={20} style={{ color: "#0FAE68" }} strokeWidth={2} />
          </div>
          <div>
            <div
              className="display font-bold text-xl"
              style={{ color: "#0B1B4B" }}
            >
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: "#6B7280" }}>
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
