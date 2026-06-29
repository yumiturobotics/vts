"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaBriefcase,
  FaCheckCircle,
  FaListUl,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";
import ApplicationModal from "@/components/careers/ApplicationModal";
import { useState } from "react";
import type { JobOpening } from "@/components/careers/JobListings";

interface Props {
  job: JobOpening;
  onClose: () => void;
}

export default function JobDetailModal({ job, onClose }: Props) {
  const [showApplication, setShowApplication] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!showApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            style={{ background: "rgba(12,26,46,0.65)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div
                className="px-8 pt-7 pb-6 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #0C1A2E, #0E4A6E)" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                      style={{
                        background: "rgba(0,212,255,0.15)",
                        color: "#00D4FF",
                        border: "1px solid rgba(0,212,255,0.25)",
                      }}
                    >
                      {job.department}
                    </span>
                    <h2 className="text-white font-heading font-bold text-xl md:text-2xl leading-tight mb-4">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: FaMapMarkerAlt, text: job.location },
                        { icon: FaBriefcase, text: job.experience },
                        { icon: FaClock, text: job.type },
                        { icon: FaUsers, text: `${job.openings} Opening${job.openings > 1 ? "s" : ""}` },
                      ].map((item) => (
                        <span
                          key={item.text}
                          className="flex items-center gap-1.5 text-gray-300 text-xs"
                        >
                          <item.icon className="text-cyan-400 text-[10px]" />
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-8 py-7 space-y-7">
                {/* Job Description */}
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-3 flex items-center gap-2"
                    style={{ color: "#0C1A2E" }}
                  >
                    <FaListUl className="text-cyan-500 text-sm" />
                    Job Description
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-3 flex items-center gap-2"
                    style={{ color: "#0C1A2E" }}
                  >
                    <FaCheckCircle className="text-green-500 text-sm" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2.5">
                    {job.responsibilities.map((r: string) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(34,197,94,0.1)" }}
                        >
                          <FaCheckCircle className="text-green-500 text-[9px]" />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Skills */}
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-3 flex items-center gap-2"
                    style={{ color: "#0C1A2E" }}
                  >
                    <FaTools className="text-orange-500 text-sm" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s: string) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
                        style={{
                          background: "rgba(14,74,110,0.08)",
                          color: "#0E4A6E",
                          border: "1px solid rgba(14,74,110,0.15)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h3
                    className="font-heading font-bold text-base mb-3 flex items-center gap-2"
                    style={{ color: "#0C1A2E" }}
                  >
                    <FaGraduationCap className="text-purple-500 text-sm" />
                    Eligibility
                  </h3>
                  <ul className="space-y-2">
                    {job.eligibility.map((e: string) => (
                      <li key={e} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(139,92,246,0.1)" }}
                        >
                          <FaGraduationCap className="text-purple-500 text-[9px]" />
                        </span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Footer */}
              <div
                className="px-8 py-5 flex items-center justify-between flex-shrink-0 border-t"
                style={{ borderColor: "#f3f4f6" }}
              >
                <p className="text-gray-400 text-xs">
                  Share via{" "}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/careers?job=${job.id}`
                      );
                    }}
                    className="text-cyan-500 hover:underline"
                  >
                    copy link
                  </button>
                </p>
                <button
                  id={`apply-btn-${job.id}`}
                  onClick={() => setShowApplication(true)}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
                    boxShadow: "0 4px 15px rgba(0,212,255,0.3)",
                  }}
                >
                  Apply Now →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showApplication && (
        <ApplicationModal job={job} onClose={onClose} />
      )}
    </>
  );
}
