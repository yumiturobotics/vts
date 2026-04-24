"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaComments, FaPlay, FaTimes } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import Starfield from "@/components/Starfield";

const featuredTestimonial = {
  name: "Dr. Mylswamy Annadurai",
  role: "Former ISRO Scientist, Tamil Nadu",
  text: "Balaji Thiru founded Village Technology School (2021) to bring hands-on tech education to rural students. 12+ schools now have skill labs with focus on robotics, drones, and aero modeling. The initiative builds practical skills, critical thinking, and industry readiness. Recognized through exhibitions and internships, even attracting international students. Despite growth, focus remains on real-world solutions in agriculture, healthcare, and innovation. A strong role model promoting opportunity creation.",
  rating: 5,
  type: "VIP",
  image: "/images/mylswamy-annadurai.jpg",
  youtubeId: "JvRMMgdu2co"
};

const otherTestimonials = [
  {
    name: "Dr. R.R. Elangovan Rajagopalan",
    role: "Former ISRO Scientist",
    text: "A visionary initiative driving robotics innovation and shaping India’s tech future. Balaji Thiru’s leadership and dedication have created a thriving ecosystem of learning, inspiring the next generation of innovators.",
    rating: 5,
    type: "VIP",
    image: "/images/elangovan.png"
  },
{
  name: "Mr. Suresh",
  role: "Founder & CEO, Star Automations, Pondicherry",
  text: "Commends Village Technology School for its inspiring impact and focus on innovation. Appreciates its role in nurturing curiosity among students and empowering future innovators.",
  rating: 5,
  type: "VIP",
  image: "/images/suresh.jpeg"
},
  {
  name: "Dr. M. R. Stalin John",
  role: "Professor - Manufacturing & Robotics, SRM University, Chennai",
  text: "Appreciates Balaji Thiru’s efforts in teaching robotics and emerging technologies to school students. Highlights strong technical expertise, innovation, and ability to simplify complex concepts.",
  type: "VIP",
  image: "/images/stalin.jpeg"
},
  {
  name: "Thayumanaswamy Bhuvanesh R.J",
  role: "CEO, KRM Group of Schools",
  text: "Congratulates Village Technology School on its 5-year journey of innovation and impact. Praises its commitment to bridging technology and education, empowering students with future-ready skills.",
  rating: 5,
  type: "VIP",
  image: "/images/thayuman.jpeg"
},
];

const typeColors: Record<string, { bg: string; text: string; glow: string }> = {
  Principal: { bg: "rgba(59,130,246,0.15)", text: "#60A5FA", glow: "rgba(59,130,246,0.3)" },
  Parent: { bg: "rgba(34,197,94,0.15)", text: "#4ADE80", glow: "rgba(34,197,94,0.3)" },
  Student: { bg: "rgba(168,85,247,0.15)", text: "#C084FC", glow: "rgba(168,85,247,0.3)" },
  VIP: { bg: "rgba(234,179,8,0.15)", text: "#FACC15", glow: "rgba(234,179,8,0.3)" }
};

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [playingYouTube, setPlayingYouTube] = useState<string | null>(null);

  return (
    <section id="testimonials" className="section-dark section-padding overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0C1A2E, #0E4A6E, #12223A)" }}>
      <Starfield />
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2), transparent)" }} />
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-8 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,124,0,0.15), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "rgba(245,124,0,0.15)", color: "#F57C00", border: "1px solid rgba(245,124,0,0.3)" }}>
            <FaComments className="text-xs" /> Testimonials
          </span>
          <h2 className="section-title text-white">What People <span className="gradient-text">Say About Us</span></h2>
          <p className="section-subtitle text-gray-400">Hear from industry leaders, principals, and students who experienced the VTS difference.</p>
        </motion.div>

        {/* Featured VIP Spotlight Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="mb-16 rounded-3xl overflow-hidden relative group max-w-5xl mx-auto"
          style={{
            background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))",
            border: "1px solid rgba(0,212,255,0.4)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,212,255,0.1)",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500" />
          
          <div className="flex flex-col md:flex-row">
            {/* Video Preview Side */}
            <div className="w-full md:w-2/5 relative h-72 md:h-auto overflow-hidden cursor-pointer" onClick={() => featuredTestimonial.youtubeId && setPlayingYouTube(featuredTestimonial.youtubeId)}>
              <Image src={featuredTestimonial.image} alt={featuredTestimonial.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-20 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cyan-500/90 flex items-center justify-center shadow-[0_0_25px_rgba(0,212,255,0.8)] pl-1 md:pl-2 hover:bg-cyan-400 hover:scale-110 transition-all duration-300 ring-4 ring-cyan-500/30">
                  <FaPlay className="text-white text-2xl md:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
              <div className="absolute top-4 left-4 z-30">
                <span className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg ring-2 ring-red-500/30">
                  <FaStar className="text-[10px]" /> FEATURED
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#12223A]/40 to-[#12223A] pointer-events-none z-10 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12223A] via-[#12223A]/10 to-transparent pointer-events-none z-10 block md:hidden" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center relative">
              <div className="absolute opacity-[0.03] top-4 right-4 pointer-events-none">
                <FaQuoteLeft className="text-9xl" />
              </div>
              <div className="relative mb-6 z-10">
                <FaQuoteLeft className="text-3xl md:text-4xl absolute -top-4 -left-4 opacity-20 text-cyan-400" />
                <p className="text-gray-200 text-base md:text-[17px] leading-relaxed relative z-10 italic font-medium">
                  &ldquo;{featuredTestimonial.text}&rdquo;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2 z-10">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">{featuredTestimonial.name}</h3>
                  <p className="text-cyan-400 text-sm font-semibold">{featuredTestimonial.role}</p>
                </div>
                <div className="flex gap-1 bg-[#0a1526]/80 px-4 py-2.5 rounded-xl border border-cyan-500/20 shadow-inner">
                  {Array.from({ length: featuredTestimonial.rating }).map((_, j) => (
                    <FaStar key={j} className="text-yellow-400 text-[15px] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Testimonials Carousel */}
        <div className="relative mt-8">
          <Swiper onSwiper={(s) => (swiperRef.current = s)} modules={[Autoplay, Navigation]} spaceBetween={24} slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 4000, disableOnInteraction: false }} loop className="pb-4"
            style={{ alignItems: "stretch" } as React.CSSProperties}>
            {otherTestimonials.map((t, i) => (
              <SwiperSlide key={i} style={{ height: "auto" }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden flex flex-col relative group"
                  style={{
                    height: "100%",
                    minHeight: "480px",
                    background: "linear-gradient(145deg, rgba(30,47,80,0.95), rgba(18,34,58,0.95))",
                    border: "1px solid rgba(0,212,255,0.12)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-orange-500 opacity-60" />

                  <div className="relative h-48 overflow-hidden group/img">
                    <Image src={t.image} alt={t.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12223A] via-[#12223A]/50 to-transparent pointer-events-none z-10" />
                    <div className="absolute bottom-4 left-5 z-20">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating || 5 }).map((_, j) => (
                          <FaStar key={j} className="text-yellow-400 text-sm drop-shadow-lg" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="relative mb-4">
                      <FaQuoteLeft className="text-3xl absolute -top-1 -left-1 opacity-10" style={{ color: typeColors[t.type]?.text }} />
                      <FaQuoteLeft className="text-xl relative z-10" style={{ color: typeColors[t.type]?.text, filter: `drop-shadow(0 0 8px ${typeColors[t.type]?.glow})` }} />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5 italic" style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>&ldquo;{t.text}&rdquo;</p>

                    <div className="flex items-center gap-3 border-t border-white/8 pt-4">
                      <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0 ring-2 ring-offset-1 ring-offset-[#12223a]"
                        style={{ boxShadow: `0 0 12px ${typeColors[t.type]?.glow}` }}>
                        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="44px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                        <p className="text-gray-400 text-xs truncate">{t.role}</p>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                        style={{ background: typeColors[t.type]?.bg, color: typeColors[t.type]?.text, border: `1px solid ${typeColors[t.type]?.glow}` }}>
                        {t.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-5 mt-8">
            <button onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous testimonial"
              className="bubble-btn text-white/70 hover:text-cyan-400"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.12), rgba(14,74,110,0.2))",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow: "0 4px 20px rgba(0,212,255,0.1), inset 0 0 15px rgba(0,212,255,0.05)",
              }}>
              <FaChevronLeft className="text-sm" />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next testimonial"
              className="bubble-btn text-white/70 hover:text-cyan-400"
              style={{
                background: "linear-gradient(135deg, rgba(14,74,110,0.2), rgba(0,212,255,0.12))",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow: "0 4px 20px rgba(0,212,255,0.1), inset 0 0 15px rgba(0,212,255,0.05)",
              }}>
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {playingYouTube && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setPlayingYouTube(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPlayingYouTube(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-xl transition-colors"
                aria-label="Close video"
              >
                <FaTimes />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${playingYouTube}?autoplay=1&rel=0`}
                  title="Dr. Mylswamy Annadurai - Testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
