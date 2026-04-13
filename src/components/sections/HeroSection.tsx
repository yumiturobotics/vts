"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaRocket, FaTrophy } from "react-icons/fa";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const bannerSlides = [
  {
    title: "Building Future",
    highlight: "Innovators",
    subtitle: "Through STEM Robotics & Technology Education",
    description: "Hands-on learning with humanoid robots, drones, IoT, and aeromodelling — empowering students to build the impossible.",
    image: "/images/training.jpeg",
  },
  {
    title: "Innovation Labs",
    highlight: "For Schools",
    subtitle: "Transform Your Institution with STEM Excellence",
    description: "Cost-effective, world-class STEM lab setups with curriculum integration, training, and ongoing support.",
    image: "/images/inavtion_lab.jpeg",
  },
  {
    title: "From Prototype",
    highlight: "To Production",
    subtitle: "End-to-End Innovation Pipeline",
    description: "Idea → Design → Build → Test → Deploy → Compete. A complete journey from classroom to competition stage.",
    image: "/images/nilabot.jpeg",
  },
];

const verticalStats = [
  { value: "20,000+", label: "Students Trained" },
  { value: "20+", label: "Schools Partnered" },
  { value: "400+", label: "Projects Built" },
  { value: "25+", label: "Awards Won" },
];


export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { const t = setInterval(() => setCurrentSlide((p) => (p + 1) % bannerSlides.length), 5000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setCurrentStat((p) => (p + 1) % verticalStats.length), 3000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 30; i++) particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.3 + 0.1 });
    let id: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.opacity})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.05 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      id = requestAnimationFrame(animate);
    };

    animate();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top, #0E4A6E 0%, #0C1A2E 100%)",
      }}>
      <Starfield />
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 1.5, ease: [0.4, 0, 0, 1] }} className="absolute inset-0">
          <Image src={bannerSlides[currentSlide].image} alt="STEM Lab" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(12,26,46,0.88) 0%, rgba(14,74,110,0.82) 40%, rgba(12,26,46,0.92) 100%)" }} />
        </motion.div>
      </AnimatePresence>

      <canvas ref={canvasRef} className="absolute inset-0 z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 pb-16 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -30, filter: "blur(6px)" }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="inline-block px-5 py-2.5 mb-6 rounded-full text-sm font-semibold" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>
                  <FaRocket className="inline text-xs mr-1" /> {bannerSlides[currentSlide].subtitle}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  <span className="text-white">{bannerSlides[currentSlide].title}</span><br />
                  <span className="gradient-text">{bannerSlides[currentSlide].highlight}</span>
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-10 leading-relaxed">{bannerSlides[currentSlide].description}</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <a href="#stem-labs" className="btn-primary">Explore Labs <FaArrowRight className="text-sm" /></a>
                  <a href="#contact" className="btn-secondary">Partner With Us</a>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-3 mt-12">
              {bannerSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-12 bg-gradient-to-r from-cyan-400 to-orange-400" : "w-5 bg-white/25 hover:bg-white/50"}`} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:flex flex-col gap-5 justify-center">

            <div
  className="rounded-2xl overflow-hidden relative h-52"
  style={{ border: "1px solid rgba(0,212,255,0.15)" }}
>
  <Image
    src="/images/vov.png"
    alt="Veetuku Oru Vignani"
    fill
    className="object-contain"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
    <div>
      <p className="text-white font-bold text-sm flex items-center gap-2">
        {/* Replace Trophy with Broadcast / Media Icon */}
        <span className="text-cyan-400 text-lg">📡</span>
        Veetuku Oru Vignani
      </p>

      <p className="text-gray-300 text-xs">
        Edition Partner • Puthiya Thalaimurai
      </p>
    </div>
  </div>
</div>

            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(12,26,46,0.8)", border: "1px solid rgba(0,212,255,0.2)", backdropFilter: "blur(20px)" }}>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 via-orange-400 to-cyan-400" />
              <p className="text-cyan-400/60 text-xs font-semibold uppercase tracking-widest mb-4 pl-4">Live Impact</p>
              <div className="h-24 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div key={currentStat} initial={{ opacity: 0, y: 25, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -25, filter: "blur(4px)" }} transition={{ duration: 0.6, ease: [0.4, 0, 0, 1] }} className="pl-4">
                    <p className="text-4xl font-bold gradient-text mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{verticalStats[currentStat].value}</p>
                    <p className="text-gray-400 text-sm">{verticalStats[currentStat].label}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-2 mt-5 pl-4">
                {verticalStats.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentStat ? "bg-cyan-400 scale-125" : "bg-white/20"}`} />))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden relative h-40" style={{ border: "1px solid rgba(0,212,255,0.15)" }}>
              <Image src="/images/award.jpeg" alt="Award Winning" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <p className="text-white font-bold text-sm flex items-center gap-1.5"><FaTrophy className="text-yellow-400" /> Award Winning</p>
                  <p className="text-gray-300 text-xs">AI & Robotics Startup 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: [0.4, 0, 0, 1] }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <FaChevronDown className="text-sm" />
        </a>
      </motion.div>
    </section>
  );
}
