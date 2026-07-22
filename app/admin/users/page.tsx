"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import AdminAPI from "@/services/admin";
import type { AdminRole, AdminUser } from "@/types/admin";
import DataTable, { type Column } from "@/app/components/Admin/DataTable";
import { ConfirmModal } from "@/app/components/Admin/ConfirmModal";

const ROLES: AdminRole[] = ["STUDENT", "INSTRUCTOR", "ADMIN"];

function CellTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center border px-2 py-0.5 text-[11px] tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--green)", borderColor: "var(--rule)", background: "var(--paper)" }}>{children}</span>;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [toDelete, setToDelete] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await AdminAPI.listUsers();
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    }

    void loadUsers();
  }, []);

  async function handleRoleChange(id: string, role: AdminRole) {
    const previousUsers = users;
    setUsers((currentUsers) => currentUsers?.map((user) => user.id === id ? { ...user, role } : user) ?? null);
    try {
      await AdminAPI.updateUser(id, { role });
    } catch (error) {
      console.error(error);
      setUsers(previousUsers);
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await AdminAPI.deleteUser(toDelete.id);
      setUsers((currentUsers) => currentUsers?.filter((user) => user.id !== toDelete.id) ?? null);
      setToDelete(null);
    } catch (error) {
      console.error(error);
      alert("Unable to delete this user.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: Column<AdminUser>[] = [
    { header: "Name", cell: (user) => `${user.firstName} ${user.lastName}` },
    { header: "Email", cell: (user) => user.email },
    { header: "Role", cell: (user) => <select value={user.role} onChange={(event) => handleRoleChange(user.id, event.target.value as AdminRole)} className="mono border bg-transparent px-2 py-1 text-xs" style={{ borderColor: "var(--rule)", color: "var(--ink)" }}>{ROLES.map((role) => <option key={role} value={role}>{role}</option>)}</select> },
    { header: "Enrollments", cell: (user) => user._count?.enrollments ?? 0 },
    { header: "Courses taught", cell: (user) => user._count?.courses ?? 0 },
  ];

  return <div className="sans"><div className="border-b px-8 py-6" style={{ borderColor: "var(--rule)" }}><CellTag>USERS</CellTag><h1 className="serif mt-2 text-2xl font-semibold">Users</h1></div><div className="p-8"><DataTable columns={columns} rows={users} actions={(user) => <button onClick={() => setToDelete(user)} style={{ color: "#9AA3B2" }} title="Delete user"><Trash2 size={15} /></button>} /></div><ConfirmModal open={Boolean(toDelete)} title="Delete this user?" message={`This permanently removes ${toDelete?.firstName ?? "this user"} and cannot be undone.`} onConfirm={handleDelete} onCancel={() => setToDelete(null)} confirming={deleting} /></div>;
}
