"use client";

import { motion } from "framer-motion";
import { FaFlask, FaUserFriends, FaGraduationCap, FaChalkboardTeacher, FaUserTie, FaLaptopCode, FaCogs, FaCertificate, FaHandshake, FaRocket } from "react-icons/fa";
import Starfield from "@/components/Starfield";

const services = [
  { icon: FaFlask, title: "STEM Lab Setup", desc: "Complete ATL & Innovation lab setup for schools with equipment, curriculum, and training.", color: "from-blue-500 to-blue-700", light: "bg-blue-50 text-blue-600 border-blue-200" },
  { icon: FaChalkboardTeacher, title: "Workshops & Training", desc: "Expert-led hands-on workshops on robotics, drones, IoT, and programming.", color: "from-purple-500 to-purple-700", light: "bg-purple-50 text-purple-600 border-purple-200" },
  { icon: FaUserTie, title: "Internship Programs", desc: "Real-world internships giving students practical tech skills and portfolio projects.", color: "from-orange-500 to-orange-700", light: "bg-orange-50 text-orange-600 border-orange-200" },
  { icon: FaLaptopCode, title: "Coding Bootcamps", desc: "Intensive programs in Python, C++, Arduino, and web development.", color: "from-green-500 to-green-700", light: "bg-green-50 text-green-600 border-green-200" },
  { icon: FaCogs, title: "Custom R&D Projects", desc: "Custom robotics and IoT solutions for specific organizational needs.", color: "from-red-500 to-red-700", light: "bg-red-50 text-red-600 border-red-200" },
  { icon: FaCertificate, title: "Competition Preparation", desc: "Training for national robotics, science fairs, and STEM olympiads.", color: "from-amber-500 to-amber-700", light: "bg-amber-50 text-amber-600 border-amber-200" },
  { icon: FaHandshake, title: "School Partnerships", desc: "Long-term STEM integration with curriculum alignment and teacher training.", color: "from-teal-500 to-teal-700", light: "bg-teal-50 text-teal-600 border-teal-200" },
  { icon: FaRocket, title: "Innovation Challenges", desc: "Annual hackathons and innovation challenges to showcase student projects.", color: "from-pink-500 to-pink-700", light: "bg-pink-50 text-pink-600 border-pink-200" },
  { icon: FaGraduationCap, title: "Short-Term Diploma Courses", desc: "Diploma programs in robotics, IoT, and emerging technologies.", color: "from-yellow-500 to-yellow-700", light: "bg-yellow-50 text-yellow-600 border-yellow-200" },
  { icon: FaUserFriends, title: "Community", desc: "Building a vibrant community of young innovators, educators, and tech enthusiasts.", color: "from-indigo-500 to-indigo-700", light: "bg-indigo-50 text-indigo-600 border-indigo-200" },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-light section-padding divider-top-light overflow-hidden relative">
      <Starfield color="rgba(14,74,110," isLight={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold mb-4 border border-orange-200">Our Services</span>
          <h2 className="section-title text-gray-900">Comprehensive <span className="gradient-text">STEM Solutions</span></h2>
          <p className="section-subtitle text-gray-500">End-to-end services to empower schools, students, and organizations.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="card-white p-6 group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-lg mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}><s.icon /></div>
              <h3 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
