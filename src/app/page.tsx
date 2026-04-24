import HeroSection from "@/components/sections/HeroSection";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"));
const ImpactMetrics = dynamic(() => import("@/components/sections/ImpactMetrics"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const ProductsSection = dynamic(() => import("@/components/sections/ProductsSection"));
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"));
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection"));
const TeamSection = dynamic(() => import("@/components/sections/TeamSection"));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"));
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ImpactMetrics />
      <ServicesSection />
      <ProductsSection />
      <ProjectsSection />
      <AchievementsSection />
      <TeamSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
