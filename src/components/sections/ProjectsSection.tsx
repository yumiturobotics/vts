"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const categories = ["All", "Robotics", "IoT", "Student Projects"];

const projects = [
  {
    id: 1, title: "NilaBot - Humanoid Robot", category: "Robotics", desc: "An AI-powered humanoid robot for education, events, and interactive learning.",
    image: "/images/nilabot_4.jpeg",
    tags: ["Raspberry Pi", "TTS", "Servo Motors"],
    fullDesc: "NilaBot is a fully autonomous humanoid robot designed and built entirely in-house at VTS. It uses advanced AI algorithms for voice interaction, gesture recognition, and programmable lesson delivery.",
    keyFeatures: ["3D-printed mechanical skeleton", "16+ servo motors integration", "Custom LCD interface", "AI-powered voice recognition"]
  },
  {
    id: 2, title: "Smart Classroom IoT System", category: "IoT", desc: "IoT system to monitor temperature, humidity, air quality, and attendance.",
    image: "/images/10.jpeg",
    tags: ["ESP32", "DHT22", "Firebase"],
    fullDesc: "A complete IoT ecosystem with real-time monitoring and cloud-based dashboards. This system enables schools to track environmental conditions and automate routines like lighting and fan control.",
    keyFeatures: ["ESP32 Wi-Fi integration", "Real-time Firebase dashboard", "Environmental monitoring", "Automated smart alerts"]
  },
  {
    id: 3, title: "LilliBot", category: "Robotics", desc: "Semi-humanoid robot that assists teachers in classroom lectures.",
    image: "/images/lillibot_3.jpeg",
    tags: ["Arduino", "Servo", "Bluetooth"],
    fullDesc: "LilliBot is a compact semi-humanoid robot that assists teachers during STEM classes. It uses motion gestures and Bluetooth-controlled audio interaction to explain concepts.",
    keyFeatures: ["Modular 3D-printed body", "Arduino Mega controller", "Bluetooth app integration", "Servo-driven gestures"]
  },
  {
    id: 4, title: "Innovation Lab Setup", category: "IoT", desc: "Complete innovation lab with smart devices, sensors, and robotics kits.",
    image: "/images/inavtion_lab.jpeg",
    tags: ["Modular Design", "Plug & Play", "Smart Dashboard"],
    fullDesc: "End-to-end lab design and installation for schools across India. Each lab is customized based on the school's grade levels and curriculum requirements.",
    keyFeatures: ["Modular plug-and-play racks", "Smart dashboard tracking", "Complete STEM kit suite", "12-month technical support"]
  },
  {
    id: 5, title: "Student Aeromodelling Project", category: "Student Projects", desc: "Students building and flying their own RC aircraft models.",
    image: "/images/student_aeromodeling.jpeg",
    tags: ["Balsa Wood", "RC Transmitter", "Propulsion"],
    fullDesc: "Hands-on aerodynamics project teaching flight principles through building real aircraft models. Students learn about lift, drag, thrust, and weight.",
    keyFeatures: ["Balsa wood construction", "Flight physics modules", "Brushless motor systems", "RC transmitter integration"]
  },
  {
    id: 6, title: "College STEM Workshop", category: "Student Projects", desc: "Hands-on STEM workshops conducted across College campuses.",
    image: "/images/workshop.jpeg",
    tags: ["Arduino", "Electronics", "Programming"],
    fullDesc: "Interactive workshops teaching students robotics, IoT, and programming fundamentals. Each workshop is designed as a project-based session where students build a working prototype by the end of the day.",
    keyFeatures: ["Grades 6-12 modular curriculum", "Hands-on component kits", "Arduino circuit building", "Real-world project prototyping"]
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  return (
    <section id="projects" className="section-dark section-padding divider-top-dark overflow-hidden relative">
      <Starfield />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #F57C00, transparent 70%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>Projects</span>
          <h2 className="section-title text-white">Student <span className="gradient-text">Innovations</span></h2>
          <p className="section-subtitle text-gray-400">Showcasing the best projects built by our students and team.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${filter === c ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30" : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/30 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}
                className="card-dark overflow-hidden cursor-pointer group" onClick={() => setSelected(p)}>
                <div className="h-44 relative overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity">View Details</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-semibold text-white mt-1 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (<span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10">{t}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: "linear-gradient(145deg, #1E2F50, #12223A)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="h-52 relative">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12223A]/90 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/50 transition-colors"><FaTimes /></button>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{selected.category}</span>
                <h3 className="font-bold text-xl text-white mt-1 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{selected.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-5">{selected.fullDesc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {selected.tags.map((t) => (<span key={t} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(0,212,255,0.1)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>{t}</span>))}
                </div>

                <h4 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Key Features</h4>
                <div className="space-y-2 mb-6 text-gray-400 text-sm">
                  {selected.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                       {feature}
                    </div>
                  ))}
                </div>

                <button onClick={() => setSelected(null)} className="w-full px-6 py-3 rounded-full border border-white/20 text-white/60 font-semibold text-sm hover:bg-white/5 transition-all text-center">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
