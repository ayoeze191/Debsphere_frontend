import { CheckCircle2 } from "lucide-react";

const offerings = [
  { ref: "C1", title: "Practical Curriculum", desc: "Courses designed for real-world application, not just theory. Learn skills employers actually need." },
  { ref: "C2", title: "Expert Mentorship", desc: "Learn from industry veterans who bring years of experience and practical insights to every session." },
  { ref: "C3", title: "Career-Focused", desc: "From skills to strategy — we prepare you for career growth, employability, and long-term success." },
];

export default function OfferingsGrid() {
  return (
    <div className="grid md:grid-cols-3 border-t border-l" style={{ borderColor: "var(--rule)" }}>
      {offerings.map((item) => (
        <div key={item.ref} className="row-hover border-b border-r p-7" style={{ borderColor: "var(--rule)" }}>
          <div className="flex items-center justify-between mb-5">
            <CheckCircle2 size={20} style={{ color: "var(--green)" }} strokeWidth={1.5} />
            <span className="mono text-[11px]" style={{ color: "var(--gold)" }}>{item.ref}</span>
          </div>
          <h3 className="text-lg font-semibold" style={{ color: "var(--ink)" }}>{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7688" }}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
