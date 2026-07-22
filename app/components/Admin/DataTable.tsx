"use client";

export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse ${className}`}
      style={{ background: "var(--rule)" }}
    />
  );
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  actions,
  emptyLabel = "No records yet.",
}: {
  columns: Column<T>[];
  rows: T[] | null; // null = still loading
  actions?: (row: T) => React.ReactNode;
  emptyLabel?: string;
}) {
  return (
    <div className="border" style={{ borderColor: "var(--rule)" }}>
      <div
        className="grid mono text-[11px] tracking-widest uppercase"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, 1fr)${actions ? " 100px" : ""}`,
          color: "#6B7688",
          background: "var(--green-tint)",
        }}
      >
        {columns.map((col) => (
          <div
            key={col.header}
            className="px-4 py-3 border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            {col.header}
          </div>
        ))}
        {actions && (
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "var(--rule)" }}
          />
        )}
      </div>

      {rows === null ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grid items-center border-b"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, 1fr)${actions ? " 100px" : ""}`,
              borderColor: "var(--rule)",
            }}
          >
            {columns.map((_, ci) => (
              <div key={ci} className="px-4 py-3">
                <Skeleton className="h-3.5 w-3/4" />
              </div>
            ))}
            {actions && <div className="px-4 py-3" />}
          </div>
        ))
      ) : rows.length === 0 ? (
        <div
          className="px-4 py-10 text-center text-sm"
          style={{ color: "#9AA3B2" }}
        >
          {emptyLabel}
        </div>
      ) : (
        rows.map((row) => (
          <div
            key={row.id}
            className="grid items-center border-b text-sm"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, 1fr)${actions ? " 100px" : ""}`,
              borderColor: "var(--rule)",
              color: "var(--ink)",
            }}
          >
            {columns.map((col) => (
              <div
                key={col.header}
                className={`px-4 py-3 truncate ${col.className ?? ""}`}
              >
                {col.cell(row)}
              </div>
            ))}
            {actions && (
              <div className="px-4 py-3 flex items-center gap-3">
                {actions(row)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
