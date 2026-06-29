"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaChalkboardTeacher,
  FaNetworkWired,
  FaArrowRight,
} from "react-icons/fa";
import JobDetailModal from "@/components/careers/JobDetailModal";

// ── Type exported so other files can import it ────────────────
export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  type: string;
  openings: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  eligibility: string[];
  icon: React.ElementType;
  color: string;
  accent: string;
}

// ── Job Data ──────────────────────────────────────────────────
const jobs: JobOpening[] = [
  {
    id: "technical-trainer-stem-lab",
    title: "Technical Trainer – STEM Lab",
    department: "Education & Training",
    location: "Across Tamil Nadu",
    experience: "Minimum 2 Years",
    type: "Full-Time",
    openings: 2,
    icon: FaChalkboardTeacher,
    color: "from-blue-500 to-cyan-500",
    accent: "rgba(59,130,246,0.08)",
    description:
      "We are looking for enthusiastic and technically skilled STEM Lab Trainers to deliver engaging hands-on training sessions for students in schools and educational institutions. The ideal candidate should have strong practical knowledge in electronics, robotics, IoT, embedded systems, and basic programming concepts, along with the ability to manage and inspire students effectively.",
    responsibilities: [
      "Conduct STEM lab sessions and workshops at schools and colleges",
      "Train students in robotics, electronics, IoT, and coding",
      "Support project-based learning activities",
      "Maintain STEM kits and lab equipment",
      "Coordinate with school management and faculty",
      "Prepare session reports and documentation",
      "Travel across Tamil Nadu for training programs",
    ],
    skills: [
      "Electronics & Embedded Systems",
      "Arduino / Raspberry Pi",
      "Robotics & IoT Basics",
      "Basic Programming Knowledge",
      "Good Communication Skills",
      "Student Management",
      "Presentation Skills",
    ],
    eligibility: [
      "BE / BTech / Diploma in ECE, EEE, CSE, Mechatronics, or related fields",
      "Minimum 2 years of relevant experience",
    ],
  },
  {
    id: "college-coordinator",
    title: "College Coordinator",
    department: "Operations & Coordination",
    location: "Across Tamil Nadu",
    experience: "Minimum 2 Years",
    type: "Full-Time",
    openings: 1,
    icon: FaNetworkWired,
    color: "from-orange-500 to-amber-500",
    accent: "rgba(245,124,0,0.08)",
    description:
      "We are seeking a highly organized and proactive College Coordinator to manage institutional communication, coordinate academic programs, and support STEM initiatives across colleges and educational institutions.",
    responsibilities: [
      "Coordinate with colleges and academic institutions",
      "Schedule workshops, events, and training sessions",
      "Manage communication with faculty and management teams",
      "Support partnership and onboarding activities",
      "Maintain reports, schedules, and operational documentation",
      "Travel across Tamil Nadu for institutional coordination",
    ],
    skills: [
      "Strong Communication & Coordination Skills",
      "Organizational & Time Management Skills",
      "Professional Presentation Ability",
      "Multi-tasking & Execution Capability",
    ],
    eligibility: [
      "Any Bachelor's Degree",
      "Minimum 2 years of experience in coordination, education operations, or related roles",
    ],
  },

  {
    id: "digital-marketing-social-media-manager",
    title: "Digital Marketing and Social Media Manager",
    department: "Marketing & Communications",
    location: "chennai and pondicherry",
    experience: "Minimum 2 Years",
    type: "Full-Time",
    openings: 2,
    icon: FaBriefcase,
    color: "from-pink-500 to-rose-500",
    accent: "rgba(244,114,182,0.08)",
    description:
      "We are looking for a creative and strategic Digital Marketing and Social Media Manager to lead our online presence and engagement efforts across various platforms.",
    responsibilities: [
      "Develop and execute digital marketing strategies",
      "Manage social media accounts and content creation",
      "Analyze performance metrics and optimize campaigns",
      "Collaborate with other departments to align marketing efforts",
      "Create engaging content for various digital channels",
    ],
    skills: [
      "Digital Marketing Strategy",
      "Social Media Management",
      "Content Creation & Copywriting",
      "Analytics & Data Interpretation",
      "Brand Management",
      "Communication & Collaboration",
    ],
    eligibility: [
      "Any Bachelor's Degree",
      "Minimum 2 years of experience in digital marketing or social media management",
    ],
  }
];

// ── Component ─────────────────────────────────────────────────
export default function JobListings() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  return (
    <section
      className="py-20"
      id="open-positions"
      style={{ background: "linear-gradient(180deg, #fff 0%, #f8fafc 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(14,74,110,0.07)",
              color: "#0E4A6E",
              border: "1px solid rgba(14,74,110,0.15)",
            }}
          >
            <FaBriefcase className="text-[10px]" />
            Open Positions · {jobs.reduce((acc, j) => acc + j.openings, 0)} Vacancies
          </span>
          <h2
            className="font-heading font-bold text-3xl md:text-4xl mb-4"
            style={{ color: "#0C1A2E" }}
          >
            Current{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Job Openings
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Explore open roles across Tamil Nadu. Click any position to view full details
            and apply directly through our portal.
          </p>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer bg-white"
              style={{
                border: "1px solid rgba(226,232,240,0.8)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onClick={() => setSelectedJob(job)}
            >
              {/* Card top accent strip */}
              <div
                className={`h-1.5 bg-gradient-to-r ${job.color} transition-all duration-300 group-hover:h-2`}
              />

              <div className="p-7">
                {/* Icon + department badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <job.icon className="text-2xl" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: job.accent,
                        color: job.color.includes("blue") || job.color.includes("cyan") ? "#1d4ed8" : job.color.includes("pink") || job.color.includes("rose") ? "#9d174d" : "#c2410c",
                        border: `1px solid ${job.color.includes("blue") || job.color.includes("cyan") ? "rgba(59,130,246,0.2)" : job.color.includes("pink") || job.color.includes("rose") ? "rgba(244,114,182,0.2)" : "rgba(245,124,0,0.2)"}`,
                      }}
                    >
                      {job.openings} Opening{job.openings > 1 ? "s" : ""}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(34,197,94,0.08)",
                        color: "#16a34a",
                        border: "1px solid rgba(34,197,94,0.2)",
                      }}
                    >
                      ● Hiring Now
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-heading font-bold text-xl mb-1 group-hover:text-cyan-700 transition-colors"
                  style={{ color: "#0C1A2E" }}
                >
                  {job.title}
                </h3>
                <p className="text-gray-500 text-xs mb-5 font-medium">{job.department}</p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-5">
                  {[
                    { icon: FaMapMarkerAlt, text: job.location, color: "text-green-500" },
                    { icon: FaBriefcase, text: job.experience, color: "text-blue-500" },
                    { icon: FaClock, text: job.type, color: "text-orange-500" },
                  ].map((m) => (
                    <div key={m.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <m.icon className={`text-[11px] ${m.color}`} />
                      {m.text}
                    </div>
                  ))}
                </div>

                {/* Description preview */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {job.description}
                </p>

                {/* Skill pills preview (first 3) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(14,74,110,0.06)",
                        color: "#0E4A6E",
                        border: "1px solid rgba(14,74,110,0.1)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2.5 py-1 rounded-full text-xs text-gray-400">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div
                  className="flex items-center justify-between pt-5 border-t"
                  style={{ borderColor: "#f3f4f6" }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <FaUsers className="text-[10px]" />
                    {job.openings} position{job.openings > 1 ? "s" : ""} available
                  </div>
                  <button
                    id={`view-job-${job.id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: "#0E4A6E" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                  >
                    View & Apply
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14 p-8 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(14,74,110,0.06), rgba(0,212,255,0.06))",
            border: "1px solid rgba(14,74,110,0.1)",
          }}
        >
          <h3 className="font-heading font-bold text-xl mb-2" style={{ color: "#0C1A2E" }}>
            Don&apos;t see your role?
          </h3>
          <p className="text-gray-500 text-sm mb-5 max-w-md mx-auto">
            We&apos;re always looking for passionate educators and innovators. Send us your
            profile and we&apos;ll reach out when a matching role opens up.
          </p>
          <a
            href="mailto:yumiturobotics@gmail.com?subject=Open Application - VTS Careers&body=Hi VTS Team,%0A%0AI'm interested in joining your team.%0A%0AName:%0ARole Interested In:%0AExperience:%0A"
            id="open-application-btn"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-md"
            style={{
              background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
              boxShadow: "0 4px 15px rgba(0,212,255,0.25)",
            }}
          >
            Send Open Application →
          </a>
        </motion.div>
      </div>

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
