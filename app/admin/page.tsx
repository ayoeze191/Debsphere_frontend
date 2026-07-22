// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Layers, CreditCard, DollarSign } from "lucide-react";
import AdminAPI from "@/services/admin";
import type { AdminDashboardStats } from "@/types/admin";
import { StatCard } from "../components/Admin/StatCard";

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

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await AdminAPI.getDashboard();
        setStats(res.data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    load();
  }, []);

  return (
    <div className="sans">
      <div
        className="px-8 py-6 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <CellTag>OVERVIEW</CellTag>
        <h1 className="serif text-2xl font-semibold mt-2">Dashboard</h1>
      </div>

      <div className="p-8">
        {error && (
          <p className="mb-4 text-sm" style={{ color: "#B42318" }}>
            Dashboard statistics could not be loaded. Please refresh and try again.
          </p>
        )}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 border-t border-l"
          style={{ borderColor: "var(--rule)" }}
        >
          <StatCard
            label="Total users"
            value={stats ? stats.users : "—"}
            icon={Users}
          />
          <StatCard
            label="Published courses"
            value={stats ? `${stats.publishedCourses}/${stats.courses}` : "—"}
            icon={BookOpen}
          />
          <StatCard
            label="Enrollments"
            value={stats ? stats.enrollments : "—"}
            icon={Layers}
          />
          <StatCard
            label="Successful payments"
            value={stats ? stats.successfulPayments : "—"}
            icon={CreditCard}
          />
          <StatCard
            label="Revenue"
            value={stats ? `₦${Number(stats.revenue).toLocaleString()}` : "—"}
            icon={DollarSign}
          />
        </div>
      </div>
    </div>
  );
}
