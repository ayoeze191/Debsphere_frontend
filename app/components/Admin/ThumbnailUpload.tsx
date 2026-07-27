"use client";

import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import AdminAPI from "@/services/admin";

export function ThumbnailUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const signature = await AdminAPI.createUploadSignature("image");
      const { cloudName, apiKey, timestamp, folder, signature: valueSignature } = signature.data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("folder", folder);
      formData.append("signature", valueSignature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );
      if (!response.ok) throw new Error("Cloudinary rejected the upload");
      const result = await response.json();
      onChange(result.secure_url);
    } catch (err) {
      console.error(err);
      setError("Unable to upload the image. Check the Cloudinary server settings.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Upload an image or paste its URL"
          className="admin-input w-full px-3.5 py-2.5 border bg-transparent text-sm"
          style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
            event.currentTarget.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-2 border px-3 text-xs disabled:opacity-50"
          style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
        >
          <ImagePlus size={14} /> {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      {value && (
        <img src={value} alt="Course thumbnail preview" className="h-28 w-48 border object-cover" style={{ borderColor: "var(--rule)" }} />
      )}
      {error && <p className="text-xs" style={{ color: "#B42318" }}>{error}</p>}
    </div>
  );
}
