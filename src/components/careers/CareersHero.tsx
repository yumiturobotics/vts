"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaRocket, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function CareersHero() {
  return (
    <section
      className="relative min-h-[72vh] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0C1A2E 0%, #0E4A6E 50%, #0C1A2E 100%)",
      }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
      />
      <div
        className="absolute bottom-10 left-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #F57C00, transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to Home
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
                style={{
                  background: "rgba(0,212,255,0.15)",
                  color: "#00D4FF",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                <FaRocket className="text-[10px]" />
                We&apos;re Hiring · 3 Open Positions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Shape the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #F57C00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Future
              </span>
              {" "}of STEM Education
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Join our passionate team of educators, trainers, and coordinators making
              hands-on STEM learning accessible to students across Tamil Nadu.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { icon: FaMapMarkerAlt, label: "Across Tamil Nadu", sub: "Multiple Locations" },
                { icon: FaBriefcase, label: "Full-Time Roles", sub: "3 Open Positions" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}
                  >
                    <stat.icon className="text-sm" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{stat.label}</p>
                    <p className="text-gray-500 text-xs">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero illustration / logo area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
              />
              <div
                className="relative w-full h-full rounded-3xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="relative w-48 h-48">
                  <Image
                    src="/images/vts-new-logo.png"
                    alt="Village Technology School"
                    fill
                    className="object-contain"
                    sizes="192px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave transition to white */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 20C1200 70 960 0 720 30C480 60 240 10 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
