"use client";

import { motion } from "framer-motion";
import { FaRocket, FaLightbulb, FaBullseye, FaUsers, FaGlobeAsia, FaCogs, FaSchool } from "react-icons/fa";

const values = [
  { icon: FaRocket, title: "Innovation First", desc: "We bring cutting-edge technology into classrooms, transforming how students learn and create.", color: "from-cyan-500 to-blue-600" },
  { icon: FaLightbulb, title: "Hands-On Learning", desc: "Every student builds, codes, and experiments — learning by doing, not just reading.", color: "from-orange-500 to-amber-600" },
  { icon: FaBullseye, title: "Future-Ready Skills", desc: "We prepare students with robotics, AI, IoT and drone skills for tomorrow's careers.", color: "from-purple-500 to-violet-600" },
  { icon: FaUsers, title: "Community Impact", desc: "Reaching rural and urban schools alike, making STEM education accessible to every child.", color: "from-green-500 to-emerald-600" },
  { icon: FaGlobeAsia, title: "Global Standards", desc: "Our curriculum meets international STEM benchmarks while staying rooted in local needs.", color: "from-pink-500 to-rose-600" },
  { icon: FaCogs, title: "End-to-End Solutions", desc: "From lab setup to teacher training to competitions — we handle the entire STEM journey.", color: "from-teal-500 to-cyan-600" },
];

import Starfield from "@/components/Starfield";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0E4A6E, #0C1A2E)" }}>
      <Starfield />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
            <FaSchool className="text-xs" /> About Us
          </span>
          <h2 className="section-title text-white">
            Pioneering <span className="gradient-text">STEM Education</span> in India
          </h2>
          <p className="section-subtitle text-gray-400">
            Village Technology School is on a mission to empower the next generation of innovators through hands-on robotics, drones, IoT, and cutting-edge technology education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))", border: "1px solid rgba(0,212,255,0.15)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }} />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xl mb-5 shadow-lg">
              <FaRocket />
            </div>
            <h3 className="font-heading font-bold text-white text-2xl mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To democratize STEM education by providing world-class robotics labs, innovative learning kits, and expert-led training programs to schools across India — from metropolitan cities to remote villages.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))", border: "1px solid rgba(245,124,0,0.15)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #F57C00, transparent)" }} />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-xl mb-5 shadow-lg">
              <FaBullseye />
            </div>
            <h3 className="font-heading font-bold text-white text-2xl mb-3">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              To be India&apos;s leading STEM education partner, where every student — regardless of location or background — has the opportunity to build, innovate, and shape the future of technology.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h3 className="font-heading font-bold text-white text-2xl">Why Choose <span className="gradient-text">VTS</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 group transition-all duration-500 hover:-translate-y-2"
              style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.8), rgba(18,34,58,0.8))", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <item.icon className="text-lg" />
              </div>
              <h4 className="font-heading font-bold text-white text-base mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
