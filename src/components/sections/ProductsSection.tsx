"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaArrowRight, FaCheck, FaPaperPlane } from "react-icons/fa";
import { GiDeliveryDrone, GiCircuitry, GiMicrochip, GiGears } from "react-icons/gi";
import { IoHardwareChip } from "react-icons/io5";
import { MdScience } from "react-icons/md";
import Image from "next/image";
import Starfield from "@/components/Starfield";
import { supabase } from "@/lib/supabase";
import emailjs from "@emailjs/browser";

const products = [
  {
    id: 1, name: "Humanoid Robots", icon: FaRobot, color: "from-blue-500 to-cyan-600", bg: "#EFF6FF", accent: "#3B82F6",
    image: "/images/nilabot_4.jpeg",
    shortDesc: "Advanced AI-powered humanoid robots for interactive learning",
    fullDesc: "Our humanoid robots feature voice recognition, gesture-based interactions, and programmable behavior modules.",
    features: ["Voice & Gesture Recognition", "Python/Blockly Programming", "16+ Servo Motors", "LCD Display Face", "Curriculum Aligned"]
  },
  {
    id: 2, name: "Semi-Humanoid Robots", icon: GiGears, color: "from-purple-500 to-violet-600", bg: "#F5F3FF", accent: "#8B5CF6",
    image: "/images/lillibot_3.jpeg",
    shortDesc: "Versatile semi-humanoid platforms for structured learning",
    fullDesc: "Semi-humanoid robots with articulated arms, sensor arrays, and modular design.",
    features: ["Modular Assembly", "Multiple Sensors", "Servo-Driven Arms", "Bluetooth Control", "Step-by-Step Guides"]
  },
  {
    id: 3, name: "Educational Drones", icon: GiDeliveryDrone, color: "from-orange-500 to-amber-600", bg: "#FFF7ED", accent: "#F97316",
    image: "/images/aeromodeling.jpeg",
    shortDesc: "Programmable drones for aerial robotics and coding",
    fullDesc: "From micro indoor to outdoor GPS-enabled models for aerodynamics education.",
    features: ["Indoor & Outdoor", "Autonomous Flight", "Camera Integration", "Scratch/Python", "Safety Guards"]
  },
  {
    id: 4, name: "IoT Kits", icon: GiCircuitry, color: "from-green-500 to-emerald-600", bg: "#F0FDF4", accent: "#22C55E",
    image: "/images/iot_kit.png",
    shortDesc: "Internet of Things starter kits for smart projects",
    fullDesc: "Complete IoT kits with ESP32, cloud dashboards, and 15+ sensors.",
    features: ["ESP32/ESP8266", "Cloud Dashboard", "15+ Sensors", "WiFi Connectivity", "Real-World Projects"]
  },
  {
    id: 5, name: "Arduino Kits", icon: IoHardwareChip, color: "from-teal-500 to-cyan-600", bg: "#F0FDFA", accent: "#14B8A6",
    image: "/images/24.jpeg",
    shortDesc: "Comprehensive Arduino kits for electronics & programming",
    fullDesc: "Microcontrollers, sensors, actuators, and guides from beginner to advanced.",
    features: ["Arduino Uno/Mega", "50+ Components", "Beginner to Advanced", "Video Tutorials", "Competition Ready"]
  },
  {
    id: 6, name: "Aeromodelling Kits", icon: GiMicrochip, color: "from-red-500 to-rose-600", bg: "#FEF2F2", accent: "#EF4444",
    image: "/images/student_aeromodeling.jpeg",
    shortDesc: "RC aircraft kits for aerospace learning",
    fullDesc: "Aircraft building kits teaching aerodynamics, propulsion, and flight control.",
    features: ["Balsa & Foam", "RC Transmitter", "Glider to Powered", "Aerodynamics Manual", "Competition Designs"]
  },
  {
    id: 7, name: "DIY STEM Kits", icon: MdScience, color: "from-pink-500 to-rose-600", bg: "#FDF2F8", accent: "#EC4899",
    image: "/images/diy_stem_kit.png",
    shortDesc: "Do-it-yourself science kits for creative exploration",
    fullDesc: "50+ DIY projects covering hydraulic arms, solar vehicles, and more.",
    features: ["50+ Projects", "No Soldering", "Ages 8-18", "Illustrated Guides", "NGSS Aligned"]
  },
];

export default function ProductsSection() {
  const [selected, setSelected] = useState<typeof products[0] | null>(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", quantity: "", deliveryDate: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selected || showEnquiry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selected, showEnquiry]);

  const openEnquiry = (productName: string) => {
    setSelected(null);
    setEnquiryProduct(productName);
    setShowEnquiry(true);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("product_inquiries").insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product: enquiryProduct,
        quantity: parseInt(formData.quantity) || 1,
        delivery_date: formData.deliveryDate || null,
      }]);

      if (error) throw error;

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey && !serviceId.startsWith("YOUR_")) {
        try {
          console.log("Sending product enquiry email...");
          await emailjs.send(serviceId, templateId, {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            subject: "Product Enquiry",
            message: `Product: ${enquiryProduct}\nQuantity: ${formData.quantity}\nNeeded By: ${formData.deliveryDate}`,
          }, publicKey);
          console.log("Product enquiry email sent successfully!");
        } catch (emailErr) {
          console.error("EmailJS Error (Product):", emailErr);
        }
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setShowEnquiry(false);
        setFormData({ name: "", phone: "", email: "", quantity: "", deliveryDate: "" });
        setEnquiryProduct("");
      }, 2500);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="products" className="section-dark section-padding divider-top-dark overflow-hidden relative">
      <Starfield />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #00D4FF, transparent 70%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(245,124,0,0.15)", color: "#F57C00", border: "1px solid rgba(245,124,0,0.3)" }}>Our Products</span>
          <h2 className="section-title text-white">Cutting-Edge <span className="gradient-text">STEM Products</span></h2>
          <p className="section-subtitle text-gray-400">From DIY kits to humanoid robots— educational technology designed for hands-on learning.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="card-dark overflow-hidden cursor-pointer group" onClick={() => setSelected(p)}>
              <div className="h-40 relative overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12223A] to-transparent" />
                <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-lg shadow-lg`}><p.icon /></div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{p.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.shortDesc}</p>
                <button className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  View Details <FaArrowRight className="text-xs" />
                </button>
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
              className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              style={{ background: "linear-gradient(145deg, #1E2F50, #12223A)", border: "1px solid rgba(0,212,255,0.15)" }}>
              <div className="h-48 relative">
                <Image src={selected.image} alt={selected.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12223A]/90 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"><FaTimes /></button>
              </div>
              <div className="p-6 -mt-6 relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white text-2xl mb-3 shadow-lg`}><selected.icon /></div>
                <h3 className="font-bold text-xl text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{selected.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: selected.accent }}>VTS Product Line</p>
                <p className="text-gray-400 leading-relaxed mb-5">{selected.fullDesc}</p>
                <h4 className="font-semibold text-white mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {selected.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: selected.accent }} />{f}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => openEnquiry(selected.name)} className="btn-primary text-sm flex-1 justify-center">Send Enquiry</button>
                  <button onClick={() => setSelected(null)} className="px-6 py-3 rounded-full border border-white/20 text-white/60 font-semibold text-sm hover:bg-white/5 transition-all">Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEnquiry && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => { if (!submitting) { setShowEnquiry(false); } }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(145deg, #1E2F50, #12223A)", border: "1px solid rgba(0,212,255,0.2)" }}>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-lg text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Product Enquiry</h3>
                    <p className="text-cyan-400 text-sm font-medium">{enquiryProduct}</p>
                  </div>
                  <button onClick={() => { if (!submitting) setShowEnquiry(false); }} className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                    <FaTimes />
                  </button>
                </div>

                {submitted ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
                      <FaCheck />
                    </div>
                    <p className="text-white font-bold text-lg mb-1">Enquiry Sent!</p>
                    <p className="text-gray-400 text-sm">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Phone *</label>
                        <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Email *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Quantity *</label>
                        <input type="number" required min="1" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} placeholder="1"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs font-semibold mb-1.5 block">Needed By *</label>
                        <input type="date" required value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                      </div>
                    </div>
                    <button type="submit" disabled={submitting} className={`w-full btn-primary justify-center ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}>
                      {submitting ? "Sending..." : <><span>Submit Enquiry</span> <FaPaperPlane className="text-sm" /></>}
                    </button>
                    <p className="text-gray-500 text-xs text-center">We usually respond within 24 hours.</p>
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
