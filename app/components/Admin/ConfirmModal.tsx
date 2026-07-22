"use client";

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirming,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirming?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className="w-full max-w-sm border"
        style={{ borderColor: "var(--rule)", background: "var(--paper)" }}
      >
        <div className="p-6">
          <h3
            className="serif text-lg font-semibold"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </h3>
          <p className="text-sm mt-2" style={{ color: "#6B7688" }}>
            {message}
          </p>
        </div>
        <div className="flex border-t" style={{ borderColor: "var(--rule)" }}>
          <button
            onClick={onCancel}
            className="flex-1 py-3 mono text-xs tracking-widest uppercase border-r"
            style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirming}
            className="flex-1 py-3 mono text-xs tracking-widest uppercase text-white disabled:opacity-50"
            style={{ backgroundColor: "#B42318" }}
          >
            {confirming ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
