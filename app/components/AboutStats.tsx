import type { LucideIcon } from "lucide-react";
import { Award, BarChart3, Users } from "lucide-react";

interface Stat {
  ref: string;
  icon: LucideIcon;
  label: string;
  value: string;
  desc: string;
}

const stats: Stat[] = [
  { ref: "A1", icon: Users, label: "Community", value: "500+", desc: "active waitlist members" },
  { ref: "A2", icon: Award, label: "Expertise", value: "12+", desc: "industry mentors" },
  { ref: "A3", icon: BarChart3, label: "Impact", value: "8+", desc: "data projects launched" },
];

export default function AboutStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-16 border-t border-l" style={{ borderColor: "var(--rule)" }}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.ref} className="row-hover border-b border-r p-6" style={{ borderColor: "var(--rule)" }}>
            <div className="flex items-center justify-between">
              <Icon size={20} style={{ color: "var(--green)" }} strokeWidth={1.5} />
              <span className="mono text-[11px]" style={{ color: "var(--gold)" }}>{stat.ref}</span>
            </div>
            <div className="mono text-3xl font-medium mt-5" style={{ color: "var(--ink)" }}>{stat.value}</div>
            <div className="text-sm font-medium mt-1" style={{ color: "var(--ink)" }}>{stat.label}</div>
            <div className="text-sm mt-0.5" style={{ color: "#8A93A2" }}>{stat.desc}</div>
          </div>
        );
      })}
    </div>
  );
}
