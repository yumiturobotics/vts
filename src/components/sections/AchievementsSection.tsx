"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaAward,
  FaCrown,
  FaGem,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const achievements = [
  {
    icon: FaTrophy,
    title: "National Robotics Champion",
    year: "2020",
    desc: "First place at India National Robotics Championship",
    fullDesc: "Our students secured first place at the prestigious India National Robotics Championship 2020, competing against 200+ teams from across the country. The team designed and built an autonomous robot that completed complex obstacle courses in record time.",
    color: "from-yellow-400 to-orange-500",
    image: "/images/2.jpeg",
  },
  {
    icon: FaMedal,
    title: "Best STEM Startup Award",
    year: "2023",
    desc: "Recognized by Ministry of Education as best STEM startup",
    fullDesc: "Village Technology School was recognized by the Ministry of Education as the Best STEM Startup in India for 2023. This award acknowledged our innovative approach to making robotics and technology education accessible to rural and urban schools alike.",
    color: "from-blue-400 to-indigo-500",
    image: "/images/3.jpeg",
  },
  {
    icon: FaStar,
    title: "ATL Lab of the Year",
    year: "2023",
    desc: "Our partner school won NITI Aayog ATL Lab of the Year",
    fullDesc: "One of our key partner schools won the coveted NITI Aayog ATL Lab of the Year award, powered by VTS's lab setup, curriculum design, and ongoing mentorship. The lab showcased student projects in IoT, robotics, and 3D printing.",
    color: "from-green-400 to-emerald-500",
    image: "/images/4.jpeg",
  },
  {
    icon: FaAward,
    title: "Innovation Excellence",
    year: "2024",
    desc: "Excellence award for IoT innovation in education",
    fullDesc: "VTS received the Innovation Excellence Award for developing a pioneering IoT-based smart classroom monitoring system. The system tracks environmental conditions, attendance, and energy usage in real-time across multiple partner schools.",
    color: "from-purple-400 to-violet-500",
    image: "/images/5.jpeg",
  },
  {
    icon: FaCrown,
    title: "Drone Racing Champions",
    year: "2024",
    desc: "Students won national drone racing championship",
    fullDesc: "Our trained students dominated the National Drone Racing Championship 2024, securing the top 3 positions. The drones were custom-built by students using VTS aeromodelling kits and flight training programs.",
    color: "from-cyan-400 to-blue-500",
    image: "/images/6.jpeg",
  },
  {
    icon: FaGem,
    title: "100+ Competition Wins",
    year: "2015-24",
    desc: "Students collectively won 100+ prizes across competitions",
    fullDesc: "Over the years, VTS-trained students have collectively won more than 100 prizes at state, national, and international STEM competitions. These include robotics challenges, science fairs, coding hackathons, and innovation expos.",
    color: "from-pink-400 to-rose-500",
    image: "/images/7.jpeg",
  },
];

const moreAchievements = [
  { image: "/images/11.jpeg", title: "STEM Workshop Excellence", desc: "Outstanding performance in conducting large-scale STEM workshops across Tamil Nadu schools." },
  { image: "/images/37.jpeg", title: "Innovation Lab Showcase", desc: "Featured at the National Innovation Lab Showcase for our modular and cost-effective lab designs." },
  { image: "/images/52.jpeg", title: "National Competition Win", desc: "Grand prize winner at the National Science & Technology Fair with an AI-powered sorting robot." },
];

export default function AchievementsSection() {
  const [selected, setSelected] = useState<(typeof achievements[0] & { type: "main" }) | (typeof moreAchievements[0] & { type: "more" }) | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  return (
    <section id="achievements" className="section-light section-padding divider-top-light overflow-hidden relative">
      <Starfield color="rgba(14,74,110," isLight={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-50 text-yellow-600 text-sm font-semibold mb-4 border border-yellow-200">
            <FaTrophy className="text-xs" /> Achievements
          </span>
          <h2 className="section-title text-gray-900">
            Our Awards & <span className="gradient-text">Recognition</span>
          </h2>
          <p className="section-subtitle text-gray-500">
            A proud record of excellence in STEM education and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-white overflow-hidden group cursor-pointer relative"
              onClick={() => setSelected({ ...a, type: "main" })}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.color}`}
              />
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div
                  className={`absolute bottom-3 left-3 w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xl shadow-lg`}
                >
                  <a.icon />
                </div>
              </div>
              <div className="p-5 text-center">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-gray-400 bg-gray-100 mb-3">
                  {a.year}
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2">
                  {a.title}
                </h3>
                <p className="text-gray-500 text-sm">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moreAchievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer h-64"
              onClick={() => setSelected({ ...item, type: "more" })}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                <p className="text-white font-bold text-lg">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="relative h-64">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 512px" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <FaTimes />
                </button>
                {selected.type === "main" && (
                  <div className={`absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    <selected.icon />
                  </div>
                )}
              </div>
              <div className="p-6">
                {selected.type === "main" && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-gray-400 bg-gray-100 mb-3">
                    {selected.year}
                  </div>
                )}
                <h3 className="font-bold text-xl text-gray-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{selected.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selected.type === "main" ? selected.fullDesc : selected.desc}
                </p>
                <button onClick={() => setSelected(null)} className="w-full px-6 py-3 rounded-full border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-all text-center">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
