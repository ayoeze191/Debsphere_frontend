// app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Tag, Users, CreditCard, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
];

function CellTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wider border"
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        color: "var(--green)",
        borderColor: "var(--rule)",
        background: "var(--paper)",
      }}
    >
      {children}
    </span>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .serif { font-family: 'Fraunces', serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .sans { font-family: 'IBM Plex Sans', sans-serif; }
        .nav-row:hover { background: var(--green-tint); }
      `}</style>

      <div className="sans flex min-h-screen">
        {/* Sidebar */}
        <aside
          className="w-64 flex-shrink-0 border-r flex flex-col"
          style={{ borderColor: "var(--rule)" }}
        >
          <div
            className="px-6 py-6 border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex items-center justify-center border"
                style={{ borderColor: "var(--green)" }}
              >
                <span
                  className="serif font-semibold text-sm"
                  style={{ color: "var(--green)" }}
                >
                  D
                </span>
              </div>
              <span className="serif text-base font-semibold">Debsphere</span>
            </div>
            <div className="mt-4">
              <CellTag>ADMIN</CellTag>
            </div>
          </div>

          <nav className="flex-1 py-4">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-row flex items-center gap-3 px-6 py-3 text-sm transition-colors"
                  style={{
                    color: active ? "var(--green)" : "var(--ink)",
                    background: active ? "var(--green-tint)" : "transparent",
                    borderRight: active
                      ? "2px solid var(--green)"
                      : "2px solid transparent",
                  }}
                >
                  <item.icon size={17} strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div
            className="px-6 py-4 border-t"
            style={{ borderColor: "var(--rule)" }}
          >
            <button
              className="flex items-center gap-3 text-sm w-full"
              style={{ color: "#6B7688" }}
            >
              <LogOut size={16} strokeWidth={1.5} /> Sign out
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
