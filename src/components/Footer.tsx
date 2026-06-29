"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "#home" }, { name: "About", href: "#about" }, { name: "Products", href: "#products" },
  { name: "Services", href: "#services" }, { name: "Projects", href: "#projects" },
  { name: "Careers", href: "/careers" },
];
const productList = ["Humanoid Robots", "Educational Drones", "IoT Kits", "Arduino Kits", "Aeromodelling", "DIY STEM Kits"];
const socials = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/a-yumitu-robotics-pvt-ltd/about/?viewAsMember=true", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com/@yumiturobotics_0?si=DxJsWs0eqeWK0uXo", label: "YouTube" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string) =>
    !isHome && href.startsWith("#") ? `/${href}` : href;

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0C1A2E, #070F1C)" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative h-16 w-52 flex items-center justify-center">
                <Image src="/images/vts-new-logo.png" alt="Village Technology School Logo" fill className="object-contain" sizes="(max-width: 640px) 150px, 208px" quality={60} />
              </div>
              <div>
                <p className="font-heading font-bold text-white text-lg">Village Technology</p>
                <p className="text-gray-500 text-xs">Building Future Innovators</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Pioneering STEM education through hands-on robotics, drones, IoT, and innovation programs.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 transition-all hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => {
                const href = resolveHref(l.href);
                return (
                  <li key={l.name}>
                    {href.startsWith("/") && !href.startsWith("/#") ? (
                      <Link href={href} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{l.name}</Link>
                    ) : (
                      <a href={href} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{l.name}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-3">
              {productList.map((p) => (
                <li key={p}>
                  <a href={resolveHref("#products")} className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">{p}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs"><FaPhone /></div>
                <a href="tel:+918511116253" className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">+91 85111 16253</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 text-xs"><FaEnvelope /></div>
                <a href="mailto:yumiturobotics@gmail.com" className="text-gray-400 text-sm hover:text-cyan-400 transition-colors">yumiturobotics@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 text-xs flex-shrink-0 mt-0.5"><FaMapMarkerAlt /></div>
                <span className="text-gray-400 text-sm">No.72, Gandhi Nagar Main, Virugambakkam, Chennai - 600092</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">&copy; 2026 Village Technology School. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((t) => (
              <a key={t} href="#" className="text-gray-500 text-xs hover:text-cyan-400 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
