"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaBriefcase,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaUpload,
  FaSpinner,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import type { JobOpening } from "@/components/careers/JobListings";

interface Props {
  job: JobOpening;
  onClose: () => void;
}

interface Stage1Data {
  full_name: string;
  email: string;
  phone: string;
  location: string;
}

interface Stage2Data {
  experience_years: string;
  current_role: string;
  cover_letter: string;
  portfolio_url: string;
  resume_file: File | null;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500";
const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

export default function ApplicationModal({ job, onClose }: Props) {
  const [stage, setStage] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [stage1, setStage1] = useState<Stage1Data>({
    full_name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [stage2, setStage2] = useState<Stage2Data>({
    experience_years: "",
    current_role: "",
    cover_letter: "",
    portfolio_url: "",
    resume_file: null,
  });

  const [errors1, setErrors1] = useState<Partial<Stage1Data>>({});
  const [errors2, setErrors2] = useState<Partial<Record<keyof Stage2Data, string>>>({});

  // ── Stage 1 Validation ──────────────────────────────────────
  const validateStage1 = () => {
    const e: Partial<Stage1Data> = {};
    if (!stage1.full_name.trim()) e.full_name = "Full name is required";
    if (!stage1.email.trim() || !/\S+@\S+\.\S+/.test(stage1.email))
      e.email = "Valid email is required";
    if (!stage1.phone.trim() || stage1.phone.trim().length < 10)
      e.phone = "Valid phone number is required";
    if (!stage1.location.trim()) e.location = "Location is required";
    setErrors1(e);
    return Object.keys(e).length === 0;
  };

  // ── Stage 2 Validation ──────────────────────────────────────
  const validateStage2 = () => {
    const e: Partial<Record<keyof Stage2Data, string>> = {};
    if (!stage2.experience_years) e.experience_years = "Please select experience";
    if (!stage2.current_role.trim()) e.current_role = "Current role / qualification is required";
    if (!stage2.cover_letter.trim() || stage2.cover_letter.trim().length < 50)
      e.cover_letter = "Please write at least 50 characters";
    if (!stage2.resume_file) e.resume_file = "Resume / CV is required";
    setErrors2(e);
    return Object.keys(e).length === 0;
  };

  // ── Handle Stage 1 → 2 ─────────────────────────────────────
  const handleNext = () => {
    if (validateStage1()) setStage(2);
  };

  // ── Final Submit ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStage2()) return;
    setSubmitting(true);

    try {
      let resume_url = "";

      // 1. Upload resume to Supabase Storage
      if (stage2.resume_file) {
        const ext = stage2.resume_file.name.split(".").pop();
        const fileName = `${Date.now()}_${stage1.full_name.replace(/\s+/g, "_")}.${ext}`;
        setUploadProgress(30);

        const { data: storageData, error: storageError } = await supabase.storage
          .from("resumes")
          .upload(`applications/${fileName}`, stage2.resume_file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (storageError) {
          // If storage bucket doesn't exist, continue without URL
          console.warn("Resume upload skipped:", storageError.message);
        } else if (storageData) {
          const { data: urlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(`applications/${fileName}`);
          resume_url = urlData?.publicUrl ?? "";
        }
        setUploadProgress(60);
      }

      // 2. Insert application into Supabase
      const { error: dbError } = await supabase.from("job_applications").insert([
        {
          job_id: job.id,
          job_title: job.title,
          full_name: stage1.full_name,
          email: stage1.email,
          phone: stage1.phone,
          location: stage1.location,
          experience_years: stage2.experience_years,
          current_role: stage2.current_role,
          cover_letter: stage2.cover_letter,
          portfolio_url: stage2.portfolio_url || null,
          resume_url: resume_url || null,
          status: "pending",
        },
      ]);

      setUploadProgress(100);
      if (dbError) throw dbError;

      setSuccess(true);
    } catch (err) {
      console.error("Application error:", err);
      alert("Something went wrong. Please try again or email us directly at yumiturobotics@gmail.com");
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(12,26,46,0.7)", backdropFilter: "blur(8px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col"
        >
          {/* ── Header ─────────────────────────────────────── */}
          <div
            className="px-8 pt-7 pb-5 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0C1A2E, #0E4A6E)",
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-1">
                  Apply for Position
                </p>
                <h2 className="text-white font-heading font-bold text-xl leading-tight">
                  {job.title}
                </h2>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaMapMarkerAlt className="text-[10px]" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaClock className="text-[10px]" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <FaUsers className="text-[10px]" />
                    {job.openings} Opening{job.openings > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <FaTimes />
              </button>
            </div>

            {/* Stage progress indicator */}
            {!success && (
              <div className="flex items-center gap-3">
                {[
                  { num: 1, label: "Personal Info", icon: FaUser },
                  { num: 2, label: "Professional Details", icon: FaBriefcase },
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                        style={{
                          background:
                            stage >= s.num
                              ? "linear-gradient(135deg, #00D4FF, #0077B6)"
                              : "rgba(255,255,255,0.1)",
                          color: stage >= s.num ? "#fff" : "rgba(255,255,255,0.4)",
                        }}
                      >
                        {stage > s.num ? <FaCheck className="text-[10px]" /> : s.num}
                      </div>
                      <span
                        className="text-xs font-medium hidden sm:block transition-colors duration-300"
                        style={{ color: stage >= s.num ? "#fff" : "rgba(255,255,255,0.4)" }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i === 0 && (
                      <div
                        className="flex-1 h-px w-8 sm:w-12 transition-all duration-300"
                        style={{
                          background: stage > 1 ? "#00D4FF" : "rgba(255,255,255,0.15)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Body ───────────────────────────────────────── */}
          <div className="overflow-y-auto flex-1 px-8 py-6">
            {/* SUCCESS STATE */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #0077B6)" }}
                >
                  <FaCheck className="text-white text-3xl" />
                </div>
                <h3 className="font-heading font-bold text-2xl mb-2" style={{ color: "#0C1A2E" }}>
                  Application Submitted!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
                  Thank you, <strong>{stage1.full_name}</strong>! We&apos;ve received your
                  application for <strong>{job.title}</strong>. Our team will review it and reach
                  out to you within <strong>3–5 working days</strong>.
                </p>
                <p className="text-gray-400 text-xs mb-6">
                  You&apos;ll receive an update at{" "}
                  <span className="text-cyan-600 font-medium">{stage1.email}</span>
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0E4A6E, #00D4FF)" }}
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <AnimatePresence mode="wait">
                  {/* ── STAGE 1 ── */}
                  {stage === 1 && (
                    <motion.div
                      key="stage1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div
                        className="flex items-center gap-2 mb-4 p-3 rounded-xl"
                        style={{ background: "rgba(14,74,110,0.06)", border: "1px solid rgba(14,74,110,0.12)" }}
                      >
                        <FaUser className="text-blue-600 text-sm" />
                        <span className="text-sm font-semibold" style={{ color: "#0C1A2E" }}>
                          Step 1 of 2 — Personal Information
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className={labelClass}>Full Name *</label>
                          <input
                            id="app-full-name"
                            type="text"
                            placeholder="Your full name"
                            value={stage1.full_name}
                            onChange={(e) => {
                              setStage1({ ...stage1, full_name: e.target.value });
                              if (errors1.full_name) setErrors1({ ...errors1, full_name: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors1.full_name ? "#ef4444" : "#e5e7eb",
                            }}
                          />
                          {errors1.full_name && (
                            <p className="text-red-500 text-xs mt-1">{errors1.full_name}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input
                            id="app-email"
                            type="email"
                            placeholder="you@example.com"
                            value={stage1.email}
                            onChange={(e) => {
                              setStage1({ ...stage1, email: e.target.value });
                              if (errors1.email) setErrors1({ ...errors1, email: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors1.email ? "#ef4444" : "#e5e7eb",
                            }}
                          />
                          {errors1.email && (
                            <p className="text-red-500 text-xs mt-1">{errors1.email}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className={labelClass}>Phone Number *</label>
                          <input
                            id="app-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={stage1.phone}
                            onChange={(e) => {
                              setStage1({ ...stage1, phone: e.target.value });
                              if (errors1.phone) setErrors1({ ...errors1, phone: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors1.phone ? "#ef4444" : "#e5e7eb",
                            }}
                          />
                          {errors1.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors1.phone}</p>
                          )}
                        </div>

                        {/* Location */}
                        <div>
                          <label className={labelClass}>Current Location *</label>
                          <input
                            id="app-location"
                            type="text"
                            placeholder="City, State"
                            value={stage1.location}
                            onChange={(e) => {
                              setStage1({ ...stage1, location: e.target.value });
                              if (errors1.location) setErrors1({ ...errors1, location: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors1.location ? "#ef4444" : "#e5e7eb",
                            }}
                          />
                          {errors1.location && (
                            <p className="text-red-500 text-xs mt-1">{errors1.location}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STAGE 2 ── */}
                  {stage === 2 && (
                    <motion.div
                      key="stage2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div
                        className="flex items-center gap-2 mb-4 p-3 rounded-xl"
                        style={{ background: "rgba(14,74,110,0.06)", border: "1px solid rgba(14,74,110,0.12)" }}
                      >
                        <FaBriefcase className="text-blue-600 text-sm" />
                        <span className="text-sm font-semibold" style={{ color: "#0C1A2E" }}>
                          Step 2 of 2 — Professional Details
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Experience */}
                        <div>
                          <label htmlFor="app-experience" className={labelClass}>
                            Years of Experience *
                          </label>
                          <select
                            id="app-experience"
                            value={stage2.experience_years}
                            onChange={(e) => {
                              setStage2({ ...stage2, experience_years: e.target.value });
                              if (errors2.experience_years) setErrors2({ ...errors2, experience_years: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors2.experience_years ? "#ef4444" : "#e5e7eb",
                              color: stage2.experience_years ? "#111827" : "#9ca3af",
                            }}
                          >
                            <option value="">Select experience</option>
                            <option value="fresher">Fresher</option>
                            <option value="0-1">Less than 1 year</option>
                            <option value="1-2">1 – 2 years</option>
                            <option value="2-3">2 – 3 years</option>
                            <option value="3-5">3 – 5 years</option>
                            <option value="5+">5+ years</option>
                          </select>
                          {errors2.experience_years && (
                            <p className="text-red-500 text-xs mt-1">{errors2.experience_years}</p>
                          )}
                        </div>

                        {/* Current role */}
                        <div>
                          <label className={labelClass}>Current Role / Qualification *</label>
                          <input
                            id="app-current-role"
                            type="text"
                            placeholder="e.g. B.Tech ECE Graduate"
                            value={stage2.current_role}
                            onChange={(e) => {
                              setStage2({ ...stage2, current_role: e.target.value });
                              if (errors2.current_role) setErrors2({ ...errors2, current_role: undefined });
                            }}
                            className={inputClass}
                            style={{
                              borderColor: errors2.current_role ? "#ef4444" : "#e5e7eb",
                            }}
                          />
                          {errors2.current_role && (
                            <p className="text-red-500 text-xs mt-1">{errors2.current_role}</p>
                          )}
                        </div>
                      </div>

                      {/* Cover letter */}
                      <div>
                        <label className={labelClass}>
                          Why do you want to join VTS? *
                        </label>
                        <textarea
                          id="app-cover-letter"
                          rows={4}
                          placeholder="Tell us about your passion for STEM education, your experience, and why you're the right fit for this role..."
                          value={stage2.cover_letter}
                          onChange={(e) => {
                            setStage2({ ...stage2, cover_letter: e.target.value });
                            if (errors2.cover_letter) setErrors2({ ...errors2, cover_letter: undefined });
                          }}
                          className={`${inputClass} resize-none`}
                          style={{
                            borderColor: errors2.cover_letter ? "#ef4444" : "#e5e7eb",
                          }}
                        />
                        <div className="flex items-center justify-between mt-1">
                          {errors2.cover_letter ? (
                            <p className="text-red-500 text-xs">{errors2.cover_letter}</p>
                          ) : (
                            <span />
                          )}
                          <p className="text-gray-400 text-xs text-right">
                            {stage2.cover_letter.length} chars (min 50)
                          </p>
                        </div>
                      </div>

                      {/* Portfolio */}
                      <div>
                        <label className={labelClass}>LinkedIn / Portfolio URL (Optional)</label>
                        <input
                          id="app-portfolio"
                          type="url"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={stage2.portfolio_url}
                          onChange={(e) => setStage2({ ...stage2, portfolio_url: e.target.value })}
                          className={inputClass}
                          style={{ borderColor: "#e5e7eb" }}
                        />
                      </div>

                      {/* Resume upload */}
                      <div>
                        <label className={labelClass}>Resume / CV *</label>
                        <label
                          htmlFor="app-resume"
                          className="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-cyan-400 hover:bg-cyan-50/50"
                          style={{
                            borderColor: errors2.resume_file ? "#ef4444" : stage2.resume_file ? "#00D4FF" : "#d1d5db",
                            background: stage2.resume_file ? "rgba(0,212,255,0.04)" : "transparent",
                          }}
                        >
                          {stage2.resume_file ? (
                            <div className="text-center">
                              <FaCheck className="text-cyan-500 text-xl mx-auto mb-1" />
                              <p className="text-sm font-medium text-cyan-700">{stage2.resume_file.name}</p>
                              <p className="text-xs text-gray-400">
                                {(stage2.resume_file.size / 1024 / 1024).toFixed(2)} MB · Click to change
                              </p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <FaUpload className="text-gray-400 text-xl mx-auto mb-2" />
                              <p className="text-sm text-gray-500">
                                <span className="font-semibold text-cyan-600">Click to upload</span> or drag & drop
                              </p>
                              <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX · Max 5MB</p>
                            </div>
                          )}
                        </label>
                        <input
                          id="app-resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            if (file && file.size > 5 * 1024 * 1024) {
                              alert("File size must be less than 5MB");
                              return;
                            }
                            setStage2({ ...stage2, resume_file: file });
                            if (errors2.resume_file) setErrors2({ ...errors2, resume_file: undefined });
                          }}
                        />
                        {errors2.resume_file && (
                          <p className="text-red-500 text-xs mt-1">{errors2.resume_file}</p>
                        )}
                      </div>

                      {/* Upload progress */}
                      {submitting && uploadProgress > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs text-gray-500">Submitting application...</p>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(90deg, #00D4FF, #0077B6)" }}
                              initial={{ width: "0%" }}
                              animate={{ width: `${uploadProgress}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Footer Buttons ──────────────────────────── */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
                  {stage === 2 ? (
                    <button
                      type="button"
                      onClick={() => setStage(1)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      style={{ border: "1px solid #e5e7eb" }}
                    >
                      <FaArrowLeft className="text-xs" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {stage === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      id="careers-next-btn"
                      className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                      style={{
                        background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
                        boxShadow: "0 4px 15px rgba(0,212,255,0.25)",
                      }}
                    >
                      Continue
                      <FaArrowRight className="text-xs" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      id="careers-submit-btn"
                      disabled={submitting}
                      className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{
                        background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
                        boxShadow: "0 4px 15px rgba(0,212,255,0.25)",
                      }}
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="text-xs animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaCheck className="text-xs" />
                          Submit Application
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
