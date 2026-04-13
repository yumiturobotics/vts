"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaEnvelope, FaPlus, FaTimes, FaCheck, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import Starfield from "@/components/Starfield";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";
import { FaUserGraduate } from "react-icons/fa";

const teamMembers = [
  {
    name: "Mr. Balaji Thiru",
    role: "Founder & CEO",
    desc: "Visionary leader driving STEM innovation across India with deep passion for educational technology.",
    image: "/images/thiru.jpeg",
    gradient: "from-cyan-500 to-blue-600",
    borderColor: "rgba(0,212,255,0.2)",
    linkedin: "https://www.linkedin.com/in/balaji-thirunavukkarasu-28ab28318/",
    email: "mailto:balajithiru@villagetechschool.com"
  },
  {
    name: "Mr. Balaji Varadhan",
    role: "COO & Co-Founder",
    desc: "Strategically building operations and partnerships to bring STEM education to every school.",
    image: "/images/varadhan.jpeg",
    gradient: "from-orange-500 to-amber-600",
    borderColor: "rgba(245,124,0,0.2)",
    linkedin: "https://www.linkedin.com/company/villagetechschool",
    email: "mailto:balajivarathan@villagetechschool.com"
  },
  {
    name: "Dr.Vasantharaj Rajagopal",
    role: "Advisory",
    desc: "Providing expert guidance on curriculum design and educational policy for STEM programs.",
    image: "/images/dr.vasanth.jpg",
    gradient: "from-purple-500 to-violet-600",
    borderColor: "rgba(139,92,246,0.2)",
    linkedin: "https://www.linkedin.com/in/dr-vasantharaj-rajagopal-064aa423/",
    email: "mailto:vasanth@villagetechschool.com"
  },
  {
    name: "Mr. Yogeshwaran M",
    role: "Robotics Engineer & Full Stack Developer",
    desc: "Building intelligent robotic systems and digital platforms that power the VTS ecosystem.",
    image: "/images/YOGESHWARAN M.jpeg",
    gradient: "from-green-500 to-emerald-600",
    borderColor: "rgba(221, 42, 191, 0.71)",
    linkedin: "https://www.linkedin.com/in/yogii15/",
    email: "mailto:yogeshwaranthedeveloper@gmail.com"
  },
  {
    name: "Mr. Logesh Gnanavel S.",
    role: "Robotics & Product Engineer",
    desc: "Designing and engineering cutting-edge robotic products for hands-on student learning.",
    image: "/images/LOGESH GNANAVEL S.jpeg",
    gradient: "from-pink-500 to-rose-600",
    borderColor: "rgba(53, 156, 88, 0.2)",
    linkedin: "https://www.linkedin.com/in/logesh-gnanavel-s-a562172aa",
    email: "mailto:gnanavellogesh@gmail.com"
  },
  {
    name: "Mr. Lalith Kumar S.",
    role: "R&D Product Engineer",
    desc: "Researching and developing next-generation STEM kits and educational hardware solutions.",
    image: "/images/LALITH KUMAR S.jpeg",
    gradient: "from-teal-500 to-cyan-600",
    borderColor: "rgba(133, 204, 74, 0.2)",
    linkedin: "https://www.linkedin.com/company/villagetechschool",
    email: "mailto:lalith2971@gmail.com"
  },
  {
    name: "Mr. S. Sundharamoorthy",
    role: "Drone Engineer",
    desc: "Training students and educators in robotics, IoT, and programming across partner schools.",
    image: "/images/SUNDARAMOORTHY.jpeg",
    gradient: "from-indigo-500 to-blue-600",
    borderColor: "rgba(99,102,241,0.2)",
    linkedin: "https://www.linkedin.com/in/sundharamoorthy",
    email: "mailto:sundharaero23@gmail.com"
  },
  {
    name: "Ms. A. Pooja",
    role: "Technical Trainer",
    desc: "Training students and educators in robotics, IoT, and programming across partner schools.",
    image: "/images/POOJA A.jpeg",
    gradient: "from-teal-500 to-cyan-600",
    borderColor: "rgba(133, 204, 74, 0.2)",
    email: "mailto:selvipooja61@gmail.com"
  },
];

const interns = [
  {
    name: "Sakthi Priya V",
    role: "IoT Intern",
    image: "/images/SAKTHI PRIYA V.jpeg",
    gradient: "from-cyan-400 to-blue-500",
    borderColor: "rgba(0,212,255,0.3)",
  },
  {
    name: "Devi Dharshini M",
    role: "Robotics Engineering Intern",
    image: "/images/intern1.jpeg",
    gradient: "from-orange-400 to-amber-500",
    borderColor: "rgba(245,124,0,0.3)",
  },
  {
    name: "Rajasree S",
    role: "IoT & Embedded Systems Intern",
    image: "/images/intern2.jpeg",
    gradient: "from-purple-400 to-violet-500",
    borderColor: "rgba(139,92,246,0.3)",
  },
];

export default function TeamSection() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", college: "", linkedin: "", message: "", resume: null as File | null });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let resume_url = "";
      if (formData.resume) {
        if (formData.resume.size > 1024 * 1024) throw new Error("Resume size must be under 1MB");
        const fileExt = formData.resume.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("resumes").upload(fileName, formData.resume, {
          contentType: formData.resume.type || 'application/pdf'
        });
        if (uploadError) throw uploadError;
        resume_url = uploadData.path;
      }

      const { error } = await supabase.from("job_applications").insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        linkedin: formData.linkedin,
        message: formData.message,
        resume_url
      }]);

      if (error) throw error;

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && !serviceId.startsWith("YOUR_")) {
        try {
          console.log("Sending intern application email...");
          await emailjs.send(serviceId, templateId, {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: "Intern Application",
            message: `College: ${formData.college}\nLinkedIn: ${formData.linkedin}\n\n${formData.message}`,
          }, publicKey);
          console.log("Intern email sent successfully!");
        } catch (emailErr) {
          console.error("EmailJS Error (Intern):", emailErr);
        }
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
        setFormData({ name: "", email: "", phone: "", college: "", linkedin: "", message: "", resume: null });
      }, 3000);
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="team" className="section-dark section-padding divider-top-dark overflow-hidden relative">
      <Starfield />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2), transparent)" }} />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,124,0,0.15), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ background: "rgba(245,124,0,0.15)", color: "#FF9800", border: "1px solid rgba(245,124,0,0.3)" }}>
            Our Team
          </span>
          <h2 className="section-title text-white">
            Meet the <span className="gradient-text">Innovators</span> Behind VTS
          </h2>
          <p className="section-subtitle text-gray-400">
            A passionate team of engineers, educators, and innovators dedicated to transforming STEM education across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl p-7 text-center group transition-all duration-500 hover:-translate-y-3 flex flex-col"
              style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))", border: `1px solid ${member.borderColor}` }}>

              <div className="relative mx-auto mb-6 mt-3 w-36 h-36">
                <div className="w-36 h-36 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl overflow-hidden ring-4 ring-offset-2 ring-offset-[#12223a] group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500"
                  style={{ boxShadow: `0 0 25px ${member.borderColor}` }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-[#12223a] flex items-center justify-center z-10 shadow-lg">
                  <FaEnvelope className="text-white text-[10px]" />
                </div>
              </div>

              <h4 className="font-heading font-bold text-white text-lg mb-1">{member.name}</h4>
              <p className="text-sm font-medium mb-3" style={{ color: member.borderColor.replace("0.2", "1") }}>{member.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{member.desc}</p>

              <div className="flex items-center justify-center gap-2 mt-auto border-t border-white/5 pt-4">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <FaLinkedin className="text-sm" />
                  </a>
                )}
                <a href={member.email} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange-400 transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <FaEnvelope className="text-sm" />
                </a>
              </div>
            </motion.div>
          ))}

          {interns.map((intern, i) => (
            <motion.div key={`intern-${i}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="rounded-3xl p-7 text-center group transition-all duration-500 hover:-translate-y-3 flex flex-col items-center justify-center"
              style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.85), rgba(18,34,58,0.85))", border: `1px solid ${intern.borderColor}` }}>

              <div className="relative mx-auto mb-5">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${intern.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden`}
                  style={{ boxShadow: `0 0 25px ${intern.borderColor}` }}>
                  {intern.image ? (
                    <Image src={intern.image} alt={intern.name} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <FaUserGraduate className="text-white text-3xl" />
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-[3px] border-[#12223a] flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">NEW</span>
                </div>
              </div>

              <h4 className="font-heading font-bold text-white text-lg mb-1">{intern.name}</h4>
              <p className="text-sm font-medium" style={{ color: intern.borderColor.replace("0.3", "1") }}>{intern.role}</p>
            </motion.div>
          ))}

          <motion.div onClick={() => setShowForm(true)} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="rounded-3xl p-7 text-center group transition-all duration-500 hover:-translate-y-3 flex flex-col items-center justify-center cursor-pointer"
            style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.5), rgba(18,34,58,0.5))", border: "2px dashed rgba(0,212,255,0.25)" }}>

            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300"
              style={{ background: "rgba(0,212,255,0.1)", border: "2px dashed rgba(0,212,255,0.3)" }}>
              <FaPlus className="text-2xl text-cyan-400 group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <h4 className="font-heading font-bold text-white text-lg mb-2">Join as VTS Team</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Be part of the VTS innovation team and gain real-world experience in STEM.</p>
            <span className="text-cyan-400 text-sm font-semibold group-hover:underline transition-all">Apply Now →</span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => { if (!submitting) setShowForm(false); }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(145deg, #1E2F50, #12223A)", border: "1px solid rgba(0,212,255,0.2)" }}>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Join as an Intern</h3>
                    <p className="text-cyan-400 text-sm font-medium">Village Technology School</p>
                  </div>
                  <button onClick={() => { if (!submitting) setShowForm(false); }} className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                    <FaTimes />
                  </button>
                </div>

                {submitted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                      <FaCheck />
                    </div>
                    <p className="text-white font-bold text-lg mb-1">Application Sent!</p>
                    <p className="text-gray-400 text-sm">We will review your profile and get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Phone *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Email *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">College / University *</label>
                        <input type="text" required value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} placeholder="Institution Name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">LinkedIn Profile URL</label>
                        <input type="url" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..."
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Why do you want to join us? *</label>
                      <textarea required rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your interests in STEM, robotics, or coding..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Resume (PDF, max 1MB) *</label>
                      <input type="file" required accept=".pdf" onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30" />
                    </div>
                    <button type="submit" disabled={submitting} className={`w-full btn-primary justify-center ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}>
                      {submitting ? "Submitting..." : <><span>Submit Application</span> <FaPaperPlane className="text-sm" /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
