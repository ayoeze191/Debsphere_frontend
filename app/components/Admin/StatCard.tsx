// components/admin/StatCard.tsx
export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; strokeWidth?: number }>;
}) {
  return (
    <div className="border-b border-r p-6" style={{ borderColor: "var(--rule)" }}>
      <Icon size={18} style={{ color: "var(--green)" }} strokeWidth={1.5} />
      <div className="mono text-3xl font-medium mt-4" style={{ color: "var(--ink)" }}>{value}</div>
      <div className="text-sm mt-0.5" style={{ color: "#8A93A2" }}>{label}</div>
    </div>
  );
}