"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaSchool, FaProjectDiagram, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const metrics = [
  { icon: FaUserGraduate, value: 20000, suffix: "+", label: "Students Trained", bg: "from-cyan-500 to-blue-600" },
  { icon: FaSchool, value: 20, suffix: "+", label: "Schools Partnered", bg: "from-orange-500 to-amber-600" },
  { icon: FaProjectDiagram, value: 400, suffix: "+", label: "Projects Built", bg: "from-green-500 to-emerald-600" },
  { icon: FaTrophy, value: 25, suffix: "+", label: "Awards Won", bg: "from-purple-500 to-violet-600" },
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const inc = value / 120;
    const timer = setInterval(() => { start += inc; if (start >= value) { setCount(value); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function ImpactMetrics() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="impact" className="section-light section-padding divider-top-light overflow-hidden relative">
      <Starfield color="rgba(14,74,110," isLight={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 border border-blue-200">Our Impact</span>
          <h2 className="section-title text-gray-900">Transforming Education <span className="gradient-text">at Scale</span></h2>
          <p className="section-subtitle text-gray-500">Over a decade of transforming classrooms into innovation hubs, empowering thousands of students with future-ready skills.</p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-white p-6 text-center">
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${m.bg} flex items-center justify-center text-white text-xl shadow-lg`}><m.icon /></div>
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Counter value={m.value} suffix={m.suffix} inView={inView} />
              </p>
              <p className="text-gray-500 text-sm font-medium">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(135deg, #0E4A6E, #1E2F50)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <Image src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80" alt="STEM Lab students" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E4A6E]/80 hidden md:block" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                About <span className="gradient-text">Village Technology</span>
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">Village Technology School is a pioneering STEM education organization bridging the gap between traditional education and modern technology skills.</p>
              <p className="text-gray-400 leading-relaxed mb-6">Our mission is to democratize technology education, making it accessible and engaging for students across all communities.</p>
              <div className="grid grid-cols-2 gap-4">
                {[{ label: "Founded", value: "2021" }, { label: "Teams", value: "3+" }, { label: "States", value: "2+" }, { label: "Success", value: "98%" }].map((item) => (
                  <div key={item.label} className="rounded-xl p-3 text-center" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}>
                    <p className="text-xl font-bold neon-text">{item.value}</p>
                    <p className="text-gray-400 text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
