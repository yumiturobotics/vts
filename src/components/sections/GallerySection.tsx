"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExpand, FaPlay, FaCamera, FaVideo, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Starfield from "@/components/Starfield";

const galleryCategories = ["All", "Achievements", "Awards", "Products", "MOU", "Work", "Videos"];

const galleryItems = [
  { id: 1, category: "Achievements", title: "National Robotics Championship", image: "/images/2.jpeg" },
  { id: 2, category: "Achievements", title: "STEM Innovation Showcase", image: "/images/3.jpeg" },
  { id: 3, category: "Achievements", title: "Student Competition", image: "/images/4.jpeg" },
  { id: 4, category: "Achievements", title: "Science Exhibition", image: "/images/5.jpeg" },
  { id: 5, category: "Achievements", title: "Innovation Award", image: "/images/6.jpeg" },
  { id: 6, category: "Achievements", title: "Lab Achievement", image: "/images/7.jpeg" },
  { id: 7, category: "Achievements", title: "Technology Expo Win", image: "/images/11.jpeg" },
  { id: 8, category: "Achievements", title: "National Competition", image: "/images/37.jpeg" },
  { id: 9, category: "Achievements", title: "Grand Prize Winner", image: "/images/52.jpeg" },
  { id: 10, category: "Awards", title: "Best Innovation Award", image: "/images/8.jpeg" },
  { id: 11, category: "Awards", title: "Excellence Recognition", image: "/images/25.jpeg" },
  { id: 12, category: "Awards", title: "District Champions", image: "/images/26.jpeg" },
  { id: 13, category: "Awards", title: "State Robotics Trophy", image: "/images/27.jpeg" },
  { id: 14, category: "Awards", title: "Outstanding Mentor", image: "/images/34.jpeg" },
  { id: 15, category: "Awards", title: "STEM Leadership", image: "/images/41.jpeg" },
  { id: 16, category: "Awards", title: "Award Ceremony", image: "/images/award.jpeg" },
  { id: 17, category: "Awards", title: "Technology Prize", image: "/images/44.jpeg" },
  { id: 18, category: "Awards", title: "Science Fair Winner", image: "/images/45.jpeg" },
  { id: 19, category: "Awards", title: "Academic Excellence", image: "/images/55.jpeg" },
  { id: 20, category: "Products", title: "NilaBot Humanoid", image: "/images/nilabot.jpeg" },
  { id: 21, category: "Products", title: "NilaBot Demo", image: "/images/nilabot_1.jpeg" },
  { id: 22, category: "Products", title: "LilliBot", image: "/images/lillibot.jpeg" },
  { id: 23, category: "Products", title: "Product Showcase", image: "/images/10.jpeg" },
  { id: 24, category: "Products", title: "IoT Kit", image: "/images/12.jpeg" },
  { id: 25, category: "Products", title: "Arduino Setup", image: "/images/20.jpeg" },
  { id: 26, category: "Products", title: "Drone Kit", image: "/images/21.jpeg" },
  { id: 27, category: "Products", title: "Electronics Lab", image: "/images/23.jpeg" },
  { id: 28, category: "Products", title: "STEM Kit", image: "/images/24.jpeg" },
  { id: 29, category: "Products", title: "DIY Project Kit", image: "/images/53.jpeg" },
  { id: 30, category: "MOU", title: "Partnership Signing", image: "/images/18.jpeg" },
  { id: 31, category: "MOU", title: "School Partnership", image: "/images/38.jpeg" },
  { id: 32, category: "MOU", title: "Collaboration Agreement", image: "/images/40.jpeg" },
  { id: 33, category: "MOU", title: "Institutional MOU", image: "/images/50.jpeg" },
  { id: 34, category: "MOU", title: "Academic Partnership", image: "/images/51.jpeg" },
  { id: 35, category: "MOU", title: "MOU Signing Ceremony", image: "/images/46.jpeg" },
  { id: 36, category: "Work", title: "Training Session", image: "/images/14.jpeg" },
  { id: 37, category: "Work", title: "Workshop in Action", image: "/images/16.jpeg" },
  { id: 38, category: "Work", title: "School Lab Setup", image: "/images/school_lab.jpeg" },
  { id: 39, category: "Work", title: "School Training", image: "/images/school_traing.jpeg" },
  { id: 40, category: "Work", title: "Workshop Session", image: "/images/workshop.jpeg" },
  { id: 41, category: "Work", title: "Student Training", image: "/images/training.jpeg" },
  { id: 42, category: "Work", title: "Global Expo", image: "/images/globaal_expo.jpeg" },
  { id: 43, category: "Work", title: "Stall Display", image: "/images/stall.jpeg" },
];

const videoItems = [
  { id: 100, title: "Our Lillibot Robot Kit", youtubeId: "3H20nOfPWUc" },
  { id: 101, title: "STEM Education Showcase", youtubeId: "DrE-7kpCb8U" },
  { id: 102, title: "Innovation Lab Tour", youtubeId: "EVZ6-bpvQ10" },
 
  { id: 104, title: "Robotics Training", youtubeId: "8UfYhsWsv-A" },

  { id: 107, title: "Lab Setup Highlights", youtubeId: "vNN2J74VliY" },
 
];

type SelectedItem = { type: "image"; image: string; title: string; category: string } | { type: "video"; youtubeId: string; title: string };

export default function GallerySection() {
  const imageSwiperRef = useRef<SwiperType | null>(null);
  const videoSwiperRef = useRef<SwiperType | null>(null);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selected]);

  const showVideos = filter === "All" || filter === "Videos";
  const filtered = filter === "All" || filter === "Videos" ? (filter === "Videos" ? [] : galleryItems) : galleryItems.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="section-light section-padding divider-top-light overflow-hidden relative">
      <Starfield color="rgba(14,74,110," isLight={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-50 text-cyan-600 text-sm font-semibold mb-4 border border-cyan-200"><FaCamera className="text-xs" /> Gallery</span>
          <h2 className="section-title text-gray-900">Moments of <span className="gradient-text">Innovation</span></h2>
          <p className="section-subtitle text-gray-500">A visual journey through our labs, events, and student work.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {galleryCategories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === c ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30" : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400"}`}>
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="w-full">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <Swiper
                  key={filter}
                  onSwiper={(s) => (imageSwiperRef.current = s)}
                  modules={[Autoplay, Navigation]}
                  spaceBetween={16}
                  slidesPerView={2}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                  loop={filtered.length >= 5}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  className="w-full"
                >
                  {filtered.map((item, i) => (
                    <SwiperSlide key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg aspect-square"
                        onClick={() => setSelected({ type: "image", image: item.image, title: item.title, category: item.category })}
                      >
                        <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-end p-4">
                          <FaExpand className="text-white/80 text-lg mb-2" />
                          <p className="text-white text-sm font-semibold text-center">{item.title}</p>
                          <span className="text-white/60 text-xs">{item.category}</span>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex justify-center gap-5 mt-8">
                  <button onClick={() => imageSwiperRef.current?.slidePrev()}
                    className="bubble-btn text-gray-500 hover:text-cyan-600"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(59,130,246,0.12))",
                      border: "1px solid rgba(0,212,255,0.2)",
                      boxShadow: "0 4px 20px rgba(0,212,255,0.08)",
                    }}>
                    <FaChevronLeft className="text-sm" />
                  </button>
                  <button onClick={() => imageSwiperRef.current?.slideNext()}
                    className="bubble-btn text-gray-500 hover:text-cyan-600"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(0,212,255,0.08))",
                      border: "1px solid rgba(0,212,255,0.2)",
                      boxShadow: "0 4px 20px rgba(0,212,255,0.08)",
                    }}>
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {showVideos && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 border border-red-200"><FaVideo className="text-xs" /> Videos</span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>Watch Our <span className="gradient-text">Work in Action</span></h3>
            </div>
            <Swiper
              onSwiper={(s) => (videoSwiperRef.current = s)}
              modules={[Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="w-full pb-10"
            >
              {videoItems.map((v, i) => (
                <SwiperSlide key={v.id}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(i * 0.08, 0.5) }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl"
                    onClick={() => setSelected({ type: "video", youtubeId: v.youtubeId, title: v.title })}>
                    <div className="relative aspect-video w-full overflow-hidden">
                      <Image src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`} alt={v.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white text-lg ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm line-clamp-1">{v.title}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-center gap-5 mt-6">
              <button onClick={() => videoSwiperRef.current?.slidePrev()}
                className="bubble-btn text-gray-500 hover:text-red-500"
                style={{
                  background: "linear-gradient(135deg, rgba(239,68,68,0.08), rgba(245,124,0,0.1))",
                  border: "1px solid rgba(239,68,68,0.2)",
                  boxShadow: "0 4px 20px rgba(239,68,68,0.08)",
                }}>
                <FaChevronLeft className="text-sm" />
              </button>
              <button onClick={() => videoSwiperRef.current?.slideNext()}
                className="bubble-btn text-gray-500 hover:text-red-500"
                style={{
                  background: "linear-gradient(135deg, rgba(245,124,0,0.1), rgba(239,68,68,0.08))",
                  border: "1px solid rgba(239,68,68,0.2)",
                  boxShadow: "0 4px 20px rgba(239,68,68,0.08)",
                }}>
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 z-50" onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col items-center justify-center z-50">
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors">
                <FaTimes className="text-xl" />
              </button>
              {selected.type === "image" ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative w-full flex-1 max-h-[80vh]">
                    <Image src={selected.image} alt={selected.title} fill className="object-contain" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white font-bold text-xl" style={{ fontFamily: "'Poppins', sans-serif" }}>{selected.title}</p>
                    <p className="text-white/50 text-sm mt-1">{selected.category}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-4xl">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
                      title={selected.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white font-bold text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>{selected.title}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
