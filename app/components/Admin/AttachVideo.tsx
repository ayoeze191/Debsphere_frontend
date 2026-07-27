// components/admin/AttachVideo.tsx
"use client";

import { useRef, useState } from "react";
import { PlayCircle, Link2, Upload } from "lucide-react";
import AdminAPI from "@/services/admin";

export function AttachVideo({
  lessonId,
  existingVideo,
  onAttached,
}: {
  lessonId: string;
  existingVideo?: { originalUrl: string; status: string } | null;
  onAttached: (video: any) => void;
}) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function attachFromUrl(originalUrl: string) {
    setSaving(true);
    setError("");
    try {
      const res = await AdminAPI.createVideo(lessonId, { originalUrl });
      onAttached(res.data.video);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to attach this video.");
    } finally {
      setSaving(false);
      setProgress(0);
    }
  }

  async function handleFileUpload(file: File) {
    setSaving(true);
    setError("");
    setProgress(0);

    try {
      const signatureResponse = await AdminAPI.createUploadSignature("video");
      const { cloudName, apiKey, timestamp, folder, signature } = signatureResponse.data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("folder", folder);
      formData.append("signature", signature);

      // Plain XHR (not fetch) so we get real upload progress events.
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      );

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable)
          setProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          await attachFromUrl(data.secure_url);
        } else {
          setError("Upload to Cloudinary failed. Check the server configuration.");
          setSaving(false);
        }
      };

      xhr.onerror = () => {
        setError("Upload failed — check your connection and try again.");
        setSaving(false);
      };

      xhr.send(formData);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unable to prepare the Cloudinary upload.");
      setSaving(false);
    }
  }

  if (existingVideo) {
    return (
      <div
        className="flex items-center gap-2 text-xs"
        style={{ color: "var(--green)" }}
      >
        <PlayCircle size={14} /> Video attached ({existingVideo.status})
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-3 mono text-[10px] tracking-widest uppercase">
        <button
          type="button"
          onClick={() => setMode("upload")}
          style={{ color: mode === "upload" ? "var(--green)" : "#9AA3B2" }}
        >
          Upload file
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          style={{ color: mode === "url" ? "var(--green)" : "#9AA3B2" }}
        >
          Paste URL instead
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleFileUpload(e.target.files[0])
            }
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={saving}
            className="flex items-center gap-2 px-3 py-1.5 border text-xs disabled:opacity-50"
            style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
          >
            <Upload size={13} />
            {saving ? `Uploading… ${progress}%` : "Choose video file"}
          </button>
          {saving && (
            <div
              className="w-full h-1 mt-1.5 border"
              style={{ borderColor: "var(--rule)" }}
            >
              <div
                className="h-full transition-all"
                style={{ width: `${progress}%`, background: "var(--green)" }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Link2
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: "#9AA3B2" }}
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste hosted video URL"
              className="w-full pl-8 pr-2 py-1.5 border bg-transparent text-xs"
              style={{ borderColor: "var(--rule)", color: "var(--ink)" }}
            />
          </div>
          <button
            onClick={() => url.trim() && attachFromUrl(url.trim())}
            disabled={saving || !url.trim()}
            className="px-3 py-1.5 mono text-[10px] tracking-widest uppercase text-white disabled:opacity-50"
            style={{ backgroundColor: "var(--green)" }}
          >
            {saving ? "…" : "Attach"}
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs" style={{ color: "#B42318" }}>
          {error}
        </p>
      )}
    </div>
  );
}
