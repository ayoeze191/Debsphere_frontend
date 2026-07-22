"use client";

import { useEffect, useState } from "react";
import AdminAPI from "@/services/admin";
import type { AdminPayment, PaymentStatus } from "@/types/admin";
import DataTable, { type Column } from "@/app/components/Admin/DataTable";

const STATUSES: PaymentStatus[] = ["PENDING", "SUCCESS", "FAILED"];

function CellTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center border px-2 py-0.5 text-[11px] tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--green)", borderColor: "var(--rule)", background: "var(--paper)" }}>{children}</span>;
}

function StatusPill({ status }: { status: PaymentStatus }) {
  const color = status === "SUCCESS" ? "var(--green)" : status === "FAILED" ? "#B42318" : "#AD8330";
  return <span className="mono border px-2 py-0.5 text-[10px] tracking-widest uppercase" style={{ color, borderColor: color }}>{status}</span>;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<AdminPayment[] | null>(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const response = await AdminAPI.listPayments();
        setPayments(response.data.payments);
      } catch (error) {
        console.error(error);
        setPayments([]);
      }
    }

    void loadPayments();
  }, []);

  async function handleStatusChange(id: string, status: PaymentStatus) {
    const previousPayments = payments;
    setPayments((currentPayments) => currentPayments?.map((payment) => payment.id === id ? { ...payment, status } : payment) ?? null);
    try {
      await AdminAPI.updatePayment(id, status);
    } catch (error) {
      console.error(error);
      setPayments(previousPayments);
    }
  }

  const columns: Column<AdminPayment>[] = [
    { header: "Reference", cell: (payment) => <span className="mono text-xs">{payment.reference}</span> },
    { header: "Course", cell: (payment) => payment.course?.title ?? "—" },
    { header: "Name", cell: (payment) => payment.fullName },
    { header: "Email", cell: (payment) => payment.email },
    { header: "Amount", cell: (payment) => <span className="mono">₦{Number(payment.amount).toLocaleString()}</span> },
    { header: "Status", cell: (payment) => <div className="flex items-center gap-2"><StatusPill status={payment.status} /><select value={payment.status} onChange={(event) => handleStatusChange(payment.id, event.target.value as PaymentStatus)} className="mono border bg-transparent px-1 py-0.5 text-[10px]" style={{ borderColor: "var(--rule)", color: "#9AA3B2" }}>{STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</select></div> },
  ];

  return <div className="sans"><div className="border-b px-8 py-6" style={{ borderColor: "var(--rule)" }}><CellTag>PAYMENTS</CellTag><h1 className="serif mt-2 text-2xl font-semibold">Payments</h1><p className="mt-1 text-sm" style={{ color: "#6B7688" }}>Manually overriding status bypasses Paystack verification. Use it only to correct a stuck record.</p></div><div className="p-8"><DataTable columns={columns} rows={payments} /></div></div>;
}
