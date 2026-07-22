"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus, Check, X } from "lucide-react";
import AdminAPI from "@/services/admin";
import DataTable, { Column } from "./../../components/Admin/DataTable";
import { ConfirmModal } from "./../../components/Admin/ConfirmModal";
import { Category } from "@/types/course";
import { AxiosError } from "axios";
type ErrorResponse = {
  message: string;
};

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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const res = await AdminAPI.listCategories();
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    function run() {
      load();
    }
    run();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await AdminAPI.createCategory({ name: newName.trim() });
      setCategories((prev) => [...prev, res.data.category]);
      setNewName("");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message ?? "Unable to create category.");
      } else {
        alert("Unable to create category.");
      }
    } finally {
      setCreating(false);
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditValue(cat.name);
  }

  async function saveEdit(id: string) {
    try {
      const res = await AdminAPI.updateCategory(id, { name: editValue.trim() });
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? res.data.category : c)),
      );
      setEditingId(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message ?? "Unable to create category.");
      } else {
        alert("Unable to Save Edit.");
      }
    }
  }

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await AdminAPI.deleteCategory(toDelete.id);
      setCategories((prev) => prev.filter((c) => c.id !== toDelete.id));
      setToDelete(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message ?? "Unable to handle Delete.");
      } else {
        alert("Unable to create category.");
      }
    } finally {
      setDeleting(false);
    }
  }

  const columns: Column<Category>[] = [
    {
      header: "Name",
      cell: (c) =>
        editingId === c.id ? (
          <div className="flex items-center gap-2">
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border px-2 py-1 text-sm bg-transparent"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
              autoFocus
            />
            <button
              onClick={() => saveEdit(c.id)}
              style={{ color: "var(--green)" }}
            >
              <Check size={15} />
            </button>
            <button
              onClick={() => setEditingId(null)}
              style={{ color: "#9AA3B2" }}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => startEdit(c)}
            className="text-left hover:underline"
          >
            {c.name}
          </button>
        ),
    },
    {
      header: "Courses",
      cell: (c) => c._count?.courses ?? 0,
    },
  ];

  return (
    <div className="sans">
      <div
        className="px-8 py-6 border-b"
        style={{ borderColor: "var(--rule)" }}
      >
        <CellTag>CATEGORIES</CellTag>
        <h1 className="serif text-2xl font-semibold mt-2">Categories</h1>
      </div>

      <div className="p-8 space-y-6">
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name"
            className="flex-1 border px-3.5 py-2.5 text-sm bg-transparent"
            style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
          />
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 px-5 py-2.5 text-white mono text-xs tracking-widest uppercase disabled:opacity-50"
            style={{ backgroundColor: "var(--green)" }}
          >
            <Plus size={14} /> Add
          </button>
        </form>

        <DataTable
          columns={columns}
          rows={categories}
          actions={(c) => (
            <button
              onClick={() => setToDelete(c)}
              style={{ color: "#9AA3B2" }}
              title="Delete category"
            >
              <Trash2 size={15} />
            </button>
          )}
        />
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Delete this category?"
        message={`"${toDelete?.name}" will be removed. Courses in it will become uncategorized.`}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
        confirming={deleting}
      />
    </div>
  );
}
