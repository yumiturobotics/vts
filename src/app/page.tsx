import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import ServicesSection from "@/components/sections/ServicesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";

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
