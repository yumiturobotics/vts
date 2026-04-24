"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #151d29, #0E4A6E)" }}
        >

          <div className="absolute w-64 h-64 rounded-full animate-pulse opacity-30"
            style={{ background: "radial-gradient(circle, rgba(156, 162, 206, 0.46), transparent)" }} />


          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative flex items-center justify-center w-64 h-28 mb-6"
          >
            <Image src="/images/vts-new-logo.png" alt="VTS Logo" fill className="object-contain" priority />
          </motion.div>


          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center">
            <h1 className="font-heading font-bold text-white text-2xl mb-1">Village Technology</h1>
            <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Building Future Innovators</p>
          </motion.div>


          <motion.div initial={{ width: 0 }} animate={{ width: "160px" }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            className="mt-8 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #00D4FF, #F57C00)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
