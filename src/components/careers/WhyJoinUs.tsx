"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaHandshake,
  FaBolt,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

const benefits = [
  {
    icon: FaGraduationCap,
    title: "Continuous Learning",
    desc: "Access to workshops, certifications, and industry-level training programs.",
    color: "from-blue-500 to-cyan-500",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.15)",
  },
  {
    icon: FaLightbulb,
    title: "Innovation Culture",
    desc: "Work with cutting-edge robotics, IoT, and AI technologies every day.",
    color: "from-amber-500 to-orange-500",
    bg: "rgba(245,124,0,0.06)",
    border: "rgba(245,124,0,0.15)",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Travel Opportunities",
    desc: "Visit schools and colleges across Tamil Nadu, expanding your professional network.",
    color: "from-green-500 to-emerald-500",
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.15)",
  },
  {
    icon: FaUsers,
    title: "Collaborative Team",
    desc: "Join a close-knit, high-energy team passionate about transforming education.",
    color: "from-purple-500 to-violet-500",
    bg: "rgba(139,92,246,0.06)",
    border: "rgba(139,92,246,0.15)",
  },
  {
    icon: FaBolt,
    title: "Real Impact",
    desc: "Directly shape the future of 20,000+ students through hands-on STEM education.",
    color: "from-rose-500 to-pink-500",
    bg: "rgba(244,63,94,0.06)",
    border: "rgba(244,63,94,0.15)",
  },
  {
    icon: FaHandshake,
    title: "Growth Path",
    desc: "Clear career progression with mentorship from industry and academic leaders.",
    color: "from-teal-500 to-cyan-600",
    bg: "rgba(20,184,166,0.06)",
    border: "rgba(20,184,166,0.15)",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
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
            <FaHandshake className="text-[10px]" />
            Life at VTS
          </span>
          <h2
            className="font-heading font-bold text-3xl md:text-4xl mb-4"
            style={{ color: "#0C1A2E" }}
          >
            Why Join{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0E4A6E, #00D4FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Village Technology School?
            </span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Be part of a mission-driven organisation where every day you help ignite curiosity
            and build the next generation of innovators.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: b.bg,
                border: `1px solid ${b.border}`,
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white mb-4 shadow-md`}
              >
                <b.icon className="text-lg" />
              </div>
              <h3 className="font-heading font-semibold text-base mb-2" style={{ color: "#0C1A2E" }}>
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
