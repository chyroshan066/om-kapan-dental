"use client";

import { useRef, useState } from "react";
import type { DoctorRecord } from "@/types/doctor";
import { PencilSimple, Trash, ArrowUp, ArrowDown, Plus, X } from "@phosphor-icons/react";

interface DoctorsManagerProps {
  initialDoctors: DoctorRecord[];
}

interface UploadSignature {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
}

interface DoctorFormValues {
  name: string;
  qualification: string;
  nmc_no: string;
}

const EMPTY_FORM: DoctorFormValues = { name: "", qualification: "", nmc_no: "" };

// Uploads directly to Cloudinary from the browser using a short-lived
// signature from our own API — same two-step flow the gallery upload
// uses, so a photo never has to pass through (and get capped by)
// Vercel's serverless request body limit.
async function uploadToCloudinary(file: File, sig: UploadSignature) {
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    throw new Error("Photo upload failed. Please try again.");
  }

  const data = await res.json();
  return { img: data.secure_url as string, public_id: data.public_id as string };
}

async function getUploadSignature(): Promise<UploadSignature> {
  const res = await fetch("/api/admin/doctors/upload-signature", {
    method: "POST",
  });
  if (!res.ok) throw new Error("Could not start upload.");
  return res.json();
}

function DoctorForm({
  title,
  initialValues,
  requirePhoto,
  submitLabel,
  onCancel,
  onSubmit,
}: {
  title: string;
  initialValues: DoctorFormValues;
  requirePhoto: boolean;
  submitLabel: string;
  onCancel?: () => void;
  onSubmit: (
    values: DoctorFormValues,
    photo: { img: string; public_id: string } | null
  ) => Promise<void>;
}) {
  const [values, setValues] = useState<DoctorFormValues>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!values.name.trim() || !values.qualification.trim() || !values.nmc_no.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (requirePhoto && !file) {
      setError("Please choose a photo.");
      return;
    }

    setIsSubmitting(true);
    try {
      let photo: { img: string; public_id: string } | null = null;
      if (file) {
        const sig = await getUploadSignature();
        photo = await uploadToCloudinary(file, sig);
      }
      await onSubmit(values, photo);
      setValues(EMPTY_FORM);
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 bg-white border border-gray-100 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-slate-800 font-bold">{title}</p>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="flex items-center justify-center w-7 h-7 rounded-full text-slate-400 hover:bg-gray-100 hover:text-slate-600"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-y-1.5 text-sm">
          <span className="font-bold text-slate-600">Name</span>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="Dr. Full Name"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-y-1.5 text-sm">
          <span className="font-bold text-slate-600">NMC No.</span>
          <input
            type="text"
            value={values.nmc_no}
            onChange={(e) => setValues((v) => ({ ...v, nmc_no: e.target.value }))}
            placeholder="12345"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-y-1.5 text-sm sm:col-span-2">
          <span className="font-bold text-slate-600">Qualification</span>
          <input
            type="text"
            value={values.qualification}
            onChange={(e) =>
              setValues((v) => ({ ...v, qualification: e.target.value }))
            }
            placeholder="Dental Surgeon (BDS)"
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-y-1.5 text-sm sm:col-span-2">
          <span className="font-bold text-slate-600">
            Photo{!requirePhoto && " (optional — leave blank to keep the current one)"}
          </span>
          <div className="flex items-center gap-x-4">
            {preview && (
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="" className="w-full h-full object-contain" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-bold file:text-primary hover:file:bg-primary/20"
            />
          </div>
        </label>
      </div>

      {error && <p className="text-sm font-bold text-red-500">{error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center h-11 px-8 bg-primary text-white text-sm font-bold rounded-xl transition-colors hover:bg-indigo-800 disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export function DoctorsManager({ initialDoctors }: DoctorsManagerProps) {
  const [doctors, setDoctors] = useState<DoctorRecord[]>(initialDoctors);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const persistOrder = async (next: DoctorRecord[]) => {
    setDoctors(next);
    await fetch("/api/admin/doctors/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((d) => d.id) }),
    });
  };

  const moveDoctor = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= doctors.length) return;
    const next = [...doctors];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    persistOrder(next);
  };

  const handleCreate = async (
    values: DoctorFormValues,
    photo: { img: string; public_id: string } | null
  ) => {
    if (!photo) throw new Error("Please choose a photo.");
    const res = await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, ...photo }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not add doctor.");
    setDoctors((prev) => [...prev, data.doctor]);
    setIsAdding(false);
  };

  const handleEdit = async (
    id: string,
    values: DoctorFormValues,
    photo: { img: string; public_id: string } | null
  ) => {
    const res = await fetch(`/api/admin/doctors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, ...(photo ?? {}) }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save changes.");
    setDoctors((prev) => prev.map((d) => (d.id === id ? data.doctor : d)));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this doctor from the site?")) return;
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/doctors/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not remove doctor.");
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-y-6">
      {isAdding ? (
        <DoctorForm
          title="Add a doctor"
          initialValues={EMPTY_FORM}
          requirePhoto
          submitLabel="Add doctor"
          onCancel={() => setIsAdding(false)}
          onSubmit={handleCreate}
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-x-2 h-11 px-8 self-start bg-primary text-white text-sm font-bold rounded-xl transition-colors hover:bg-indigo-800"
        >
          <Plus className="w-4 h-4" weight="bold" />
          Add doctor
        </button>
      )}

      <div className="flex flex-col gap-y-3">
        {doctors.length === 0 && !isAdding && (
          <p className="text-sm text-slate-800/60">No doctors added yet.</p>
        )}

        {doctors.map((doctor, index) =>
          editingId === doctor.id ? (
            <DoctorForm
              key={doctor.id}
              title={`Edit ${doctor.name}`}
              initialValues={{
                name: doctor.name,
                qualification: doctor.qualification,
                nmc_no: doctor.nmc_no,
              }}
              requirePhoto={false}
              submitLabel="Save changes"
              onCancel={() => setEditingId(null)}
              onSubmit={(values, photo) => handleEdit(doctor.id, values, photo)}
            />
          ) : (
            <div
              key={doctor.id}
              className="flex items-center gap-x-4 bg-white border border-gray-100 rounded-2xl p-4"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.img}
                  alt={doctor.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-slate-800 font-bold truncate">{doctor.name}</p>
                <p className="text-sm text-primary font-bold truncate">
                  {doctor.qualification}
                </p>
                <p className="text-xs text-slate-800/60">NMC No: {doctor.nmc_no}</p>
              </div>

              <div className="flex items-center gap-x-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveDoctor(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowUp className="w-4 h-4" weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDoctor(index, 1)}
                  disabled={index === doctors.length - 1}
                  aria-label="Move down"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 transition-colors hover:bg-gray-100 hover:text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <ArrowDown className="w-4 h-4" weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(doctor.id)}
                  aria-label={`Edit ${doctor.name}`}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <PencilSimple className="w-4 h-4" weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(doctor.id)}
                  disabled={pendingId === doctor.id}
                  aria-label={`Remove ${doctor.name}`}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash className="w-4 h-4" weight="bold" />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}