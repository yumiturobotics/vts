"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFlask, FaCog, FaIndustry, FaTrophy, FaChevronRight } from "react-icons/fa";

const stages = [
  { icon: FaFlask, title: "Team Lab", num: "01", color: "from-cyan-500 to-blue-600", accent: "#06b6d4",
    desc: "Brainstorming, research, and initial prototyping in collaborative teams.",
    steps: ["Idea brainstorming session", "Research & feasibility study", "Team role assignment", "Initial design sketches"] },
  { icon: FaCog, title: "Testing", num: "02", color: "from-orange-500 to-amber-600", accent: "#f97316",
    desc: "Rigorous testing, debugging, and iteration to perfect the prototype.",
    steps: ["Component-level testing", "Integration testing", "Performance benchmarks", "Bug fixing & iteration"] },
  { icon: FaIndustry, title: "Production", num: "03", color: "from-green-500 to-emerald-600", accent: "#22c55e",
    desc: "Refined final build with production-grade quality and documentation.",
    steps: ["Final assembly", "Quality assurance", "Documentation", "Presentation prep"] },
  { icon: FaTrophy, title: "Achievement", num: "04", color: "from-purple-500 to-violet-600", accent: "#8b5cf6",
    desc: "Showcasing at competitions, exhibitions, and earning recognition.",
    steps: ["Competition submission", "Live demonstration", "Award ceremony", "Portfolio update"] },
];

export default function WorkflowTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section id="workflow" className="section-light section-padding divider-top-light overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold mb-4 border border-purple-200">Our Workflow</span>
          <h2 className="section-title text-gray-900">Innovation <span className="gradient-text">Pipeline</span></h2>
          <p className="section-subtitle text-gray-500">A structured four-stage journey from ideation to achievement.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stages.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-400 ${active === i ? "shadow-xl scale-[1.02]" : "hover:shadow-lg"}`}
              style={{ background: active === i ? `linear-gradient(135deg, ${s.accent}, ${s.accent}dd)` : "#fff", border: active === i ? "none" : "1px solid #e2e8f0", color: active === i ? "#fff" : "inherit" }}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-3 ${active === i ? "bg-white/20 text-white" : `bg-gradient-to-br ${s.color} text-white shadow-md`}`}><s.icon /></div>
              <div className={`text-[10px] font-bold mb-1 ${active === i ? "text-white/70" : "text-gray-400"}`}>STEP {s.num}</div>
              <h3 className={`font-bold text-base mb-1 ${active === i ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
              <p className={`text-xs leading-relaxed ${active === i ? "text-white/80" : "text-gray-500"}`}>{s.desc}</p>
              {active === i && <FaChevronRight className="absolute top-5 right-5 text-white/50 text-sm" />}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            className="rounded-2xl p-6 shadow-lg" style={{ background: "linear-gradient(135deg, #0B3C5D, #1A2744)" }}>
            <h4 className="font-bold text-white text-sm mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Stage {stages[active].num}: {stages[active].title} — Key Steps</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {stages[active].steps.map((step, j) => (
                <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{j + 1}</span>
                  <span className="text-gray-300 text-sm">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
