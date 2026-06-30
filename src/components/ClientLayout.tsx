"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Preloader />}
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
    </>
  );
}
