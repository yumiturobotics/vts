"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaUserGraduate } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const match = navItems.find((item) => item.href === `#${id}`);
              if (match) setActive(match.label);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.4, 0, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled ? "rgba(12,26,46,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,212,255,0.2)" : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.3)" : "none",
        }}>

        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">

          <Link href="/" className="flex items-center gap-2.5 group pl-1 sm:pl-2">
            <div className="relative h-20 w-56 flex items-center justify-center group-hover:scale-105 transition-all duration-300 mt-1">
              <Image src="/images/vts-new-logo.png" alt="Village Technology School Logo" fill className="object-contain" sizes="(max-width: 640px) 150px, 224px" quality={60} />
            </div>
            <span className="font-heading font-bold text-white text-base sm:text-lg tracking-wide group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] transition-all duration-300">VTS</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href}
                onMouseEnter={() => setHovered(item.label)}
                onClick={() => { setActive(item.label); if (item.href.startsWith("#")) { const el = document.querySelector(item.href); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" }); } } }}
                className="relative px-4 py-2.5 text-[13px] font-medium transition-all duration-300 cursor-pointer"
                style={{ color: active === item.label ? "#fff" : hovered === item.label ? "#00D4FF" : "#9ca3af" }}>
                {active === item.label && (
                  <motion.div layoutId="navActive" className="absolute inset-0"
                    style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "9999px" }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
                )}
                {hovered === item.label && active !== item.label && (
                  <motion.div layoutId="navHover" className="absolute inset-0"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, rgba(0,212,255,0.04) 60%, transparent 100%)",
                      border: "1px solid rgba(0,212,255,0.15)",
                      borderRadius: "50% 45% 55% 50% / 50% 55% 45% 50%",
                      filter: "blur(0.5px)",
                    }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }} />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#apply" className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all shadow-lg hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #00B4D8, #0077B6)", boxShadow: "0 4px 12px rgba(0,180,216,0.3)" }}>
              <FaUserGraduate className="text-xs" /> Apply Now
            </a>
            <a href="#contact" className="hidden sm:inline-block px-5 py-2 rounded-full text-sm font-semibold text-white transition-all shadow-lg hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #F57C00, #FF9800)", boxShadow: "0 4px 12px rgba(245,124,0,0.3)" }}>
              Contact Us
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white text-xl p-2 rounded-xl transition-all active:scale-90"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ background: mobileOpen ? "rgba(0,212,255,0.15)" : "transparent" }}>
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0, 1] }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-full sm:w-80 h-full z-40 p-6 lg:hidden shadow-2xl overflow-y-auto" style={{ background: "linear-gradient(180deg, #0C1A2E, #0E4A6E)" }}>

              <div className="flex items-center justify-between mb-8">
                <div className="relative h-14 w-44">
                  <Image src="/images/vts-new-logo.png" alt="VTS Logo" fill className="object-contain" sizes="176px" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all active:scale-90"
                  aria-label="Close menu"
                  style={{ background: "rgba(0,212,255,0.15)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-1.5 mt-4">
                {navItems.map((item, i) => (
                  <motion.a key={item.label} href={item.href} onClick={() => { setActive(item.label); setMobileOpen(false); }}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all relative overflow-hidden"
                    style={{
                      background: active === item.label ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(14,74,110,0.3))" : "transparent",
                      border: active === item.label ? "1px solid rgba(0,212,255,0.25)" : "1px solid transparent",
                      color: active === item.label ? "#fff" : "#9ca3af",
                    }}>
                    {active === item.label && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500" />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                ))}

                <motion.a href="#apply" onClick={() => setMobileOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.3 }}
                  className="flex items-center justify-center gap-2 mt-4 px-5 py-3.5 rounded-2xl text-sm font-semibold text-center text-white shadow-lg active:scale-95 transition-all" style={{ background: "linear-gradient(135deg, #00B4D8, #0077B6)" }}>
                  <FaUserGraduate className="text-sm" /> Apply for Internship
                </motion.a>

                <motion.a href="#contact" onClick={() => setMobileOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.3 }}
                  className="block mt-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-center text-white shadow-lg active:scale-95 transition-all" style={{ background: "linear-gradient(135deg, #F57C00, #FF9800)" }}>
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
