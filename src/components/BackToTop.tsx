"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #00D4FF, #0E4A6E)",
            boxShadow: "0 4px 20px rgba(0,212,255,0.4)",
            border: "1px solid rgba(0,212,255,0.3)",
          }}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-sm" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
