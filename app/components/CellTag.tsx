import type { ReactNode } from "react";

interface CellTagProps {
  children: ReactNode;
  color?: string;
}

export default function CellTag({ children, color = "var(--green)" }: CellTagProps) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wider border"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color,
        borderColor: "var(--rule)",
        background: "var(--paper)",
      }}
    >
      {children}
    </span>
  );
}
