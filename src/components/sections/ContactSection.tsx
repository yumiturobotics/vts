"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane, FaClock, FaCheck } from "react-icons/fa";
import Starfield from "@/components/Starfield";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("contact")) {
      const params = new URLSearchParams(hash.split("?")[1] || "");
      const product = params.get("product");
      if (product) {
        setFormData((prev) => ({ ...prev, subject: "product enquiry", message: `Enquiry about: ${decodeURIComponent(product)}` }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from("contacts").insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        subject: formData.subject,
        message: formData.message,
      }]);

      if (error) throw error;

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && !serviceId.startsWith("YOUR_")) {
        try {
          console.log("Sending EmailJS notification...", { serviceId, templateId });
          await emailjs.send(serviceId, templateId, {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: `Address: ${formData.address}\n\n${formData.message}`,
          }, publicKey);
          console.log("EmailJS sent successfully!");
        } catch (emailErr) {
          console.error("EmailJS Error:", emailErr);
        }
      } else {
        console.warn("EmailJS not configured:", { serviceId, templateId, publicKey });
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", phone: "", address: "", subject: "", message: "" });
      }, 3000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding overflow-hidden relative" style={{ background: "linear-gradient(180deg, #0C1A2E, #0E4A6E, #0C1A2E)" }}>
      <Starfield />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}><FaPhone className="text-xs" /> Contact Us</span>
          <h2 className="section-title text-white">Let&apos;s Build the <span className="gradient-text">Future Together</span></h2>
          <p className="section-subtitle text-gray-400">Ready to transform your school with STEM innovation? Reach out to us today.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: FaPhone, label: "Phone", value: "+91 85111 16253", href: "tel:+918511116253", color: "from-cyan-500 to-blue-600" },
                { icon: FaEnvelope, label: "Email", value: "yumiturobotics@gmail.com", href: "mailto:yumiturobotics@gmail.com", color: "from-orange-500 to-amber-600" },
                { icon: FaMapMarkerAlt, label: "Address", value: "No.72, Gandhi Nagar Main, Virugambakkam, Chennai - 600092", href: "https://maps.google.com/?q=No.72+Gandhi+Nagar+Main+Virugambakkam+Chennai+600092", color: "from-green-500 to-emerald-600" },
                { icon: FaClock, label: "Working Hours", value: "Mon-Sat: 9AM - 6PM", href: "#", color: "from-purple-500 to-violet-600" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="rounded-2xl p-5 group transition-all hover:-translate-y-1" style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 shadow-md`}><item.icon /></div>
                  <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white font-medium text-sm">{item.value}</p>
                </a>
              ))}
            </div>

            <a href="https://wa.me/918511116253?text=Hi%20VTS!" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl p-5 group transition-all hover:-translate-y-1" style={{ background: "linear-gradient(145deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))", border: "1px solid rgba(34,197,94,0.25)" }}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform"><FaWhatsapp /></div>
              <div>
                <p className="text-white font-bold text-sm">WhatsApp Quick Connect</p>
                <p className="text-gray-400 text-xs">Chat with us instantly</p>
              </div>
            </a>

            <div className="rounded-2xl overflow-hidden h-56 shadow-lg" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5!2d80.1849!3d13.0496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzU4LjYiTiA4MMKwMTEnMDUuNiJF!5e0!3m2!1sen!2sin!4v1&q=No.72+Gandhi+Nagar+Main+Virugambakkam+Chennai+600092"
                width="100%" height="100%" style={{ border: 0, filter: "brightness(0.85) contrast(1.1) saturate(0.8)" }} allowFullScreen loading="lazy" title="VTS Office Location - Virugambakkam, Chennai" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="rounded-3xl p-8 space-y-5 shadow-xl" style={{ background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))", border: "1px solid rgba(0,212,255,0.12)" }}>
              <h3 className="font-heading font-bold text-white text-xl mb-2">Send us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[{ name: "name", label: "Full Name *", type: "text", placeholder: "Your Name" }, { name: "email", label: "Email *", type: "email", placeholder: "your@email.com" }].map((f) => (
                  <div key={f.name}>
                    <label className="text-gray-400 text-xs font-semibold mb-1.5 block">{f.label}</label>
                    <input type={f.type} required value={formData[f.name as keyof typeof formData]} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} placeholder={f.placeholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 85111 16253"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Address *</label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Your City, State"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="contact-subject" className="text-gray-400 text-xs font-semibold mb-1.5 block">Subject *</label>
                  <select id="contact-subject" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    aria-label="Select a topic"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors">
                    <option value="" className="bg-gray-900">Select a topic</option>
                    {["Lab Setup", "Product Enquiry", "Workshop", "Internship", "Partnership", "Other"].map((o) => (<option key={o} value={o.toLowerCase()} className="bg-gray-900">{o}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Message *</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your requirements..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={submitted || submitting} className={`w-full btn-primary justify-center ${submitted || submitting ? "opacity-70 cursor-not-allowed" : ""}`}>
                {submitted ? <><FaCheck className="inline text-sm" /> Message Sent!</> : submitting ? "Sending..." : <><span>Send Message</span> <FaPaperPlane className="text-sm" /></>}
              </button>
              <p className="text-gray-500 text-xs text-center">We usually respond within 24 hours.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
