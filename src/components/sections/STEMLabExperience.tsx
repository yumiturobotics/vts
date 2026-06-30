"use client";

import { motion } from "framer-motion";
import { FaBrain, FaLightbulb, FaUsers, FaTools, FaBullseye, FaRobot, FaLaptopCode, FaWrench } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const outcomes = [
  { icon: FaBrain, title: "Critical Thinking", desc: "Problem-solving through real engineering challenges", color: "from-cyan-500 to-blue-600" },
  { icon: FaLightbulb, title: "Creativity", desc: "Design thinking for unique solutions", color: "from-yellow-500 to-orange-600" },
  { icon: FaUsers, title: "Teamwork", desc: "Collaborative communication skills", color: "from-green-500 to-emerald-600" },
  { icon: FaTools, title: "Technical Mastery", desc: "Hands-on coding & electronics", color: "from-purple-500 to-violet-600" },
  { icon: FaBullseye, title: "Goal-Oriented", desc: "Systematic project execution", color: "from-red-500 to-pink-600" },
];

const labFeatures = [
  { icon: FaRobot, label: "Robotics Zone", value: "20+ Robots", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80" },
  { icon: GiDeliveryDrone, label: "Drone Arena", value: "Indoor Flying", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&q=80" },
  { icon: FaLaptopCode, label: "Coding Hub", value: "30 Workstations", image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80" },
  { icon: FaWrench, label: "Maker Space", value: "3D Printing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" },
];

export default function STEMLabExperience() {
  return (
    <section id="stem-labs" className="section-padding divider-top-dark overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0E4A6E 0%, #0C1A2E 50%, #1E2F50 100%)" }}>
      <Starfield />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>STEM Labs</span>
          <h2 className="section-title text-white">The VTS Lab <span className="gradient-text">Experience</span></h2>
          <p className="section-subtitle text-gray-400">5 core learning outcomes every student develops in our labs.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-12">
          {outcomes.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4 text-center group hover:-translate-y-1 transition-all"
              style={{ background: "linear-gradient(180deg, rgba(30,47,80,0.9), rgba(18,34,58,0.9))", border: "1px solid rgba(0,212,255,0.08)" }}>
              <div className={`w-10 h-10 mx-auto mb-2.5 rounded-lg bg-gradient-to-br ${o.color} flex items-center justify-center text-white text-lg shadow-md group-hover:scale-110 transition-transform`}><o.icon /></div>
              <h3 className="text-white text-xs font-semibold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{o.title}</h3>
              <p className="text-gray-500 text-[11px] leading-snug">{o.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {labFeatures.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden group cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="h-32 relative overflow-hidden">
                <Image src={f.image} alt={f.label} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A2E] to-transparent" />
              </div>
              <div className="p-3 text-center" style={{ background: "rgba(12,26,46,0.9)" }}>
                <p className="text-white font-semibold text-sm flex items-center justify-center gap-1.5"><f.icon className="text-cyan-400 text-xs" /> {f.label}</p>
                <p className="text-cyan-400 text-xs font-medium">{f.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
