import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoinUs from "@/components/careers/WhyJoinUs";
import JobListings from "@/components/careers/JobListings";

export const metadata: Metadata = {
  title: "Careers | Join Our Team",
  description:
    "Explore exciting career opportunities at Village Technology School. Join our team of passionate STEM educators, trainers, and coordinators shaping the future of education across Tamil Nadu.",
  alternates: {
    canonical: "https://villagetechnologyschool.com/careers",
  },
  openGraph: {
    type: "website",
    url: "https://villagetechnologyschool.com/careers",
    title: "Careers at Village Technology School | Join the STEM Revolution",
    description:
      "Join our team of passionate STEM educators and coordinators. Open positions across Tamil Nadu.",
  },
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <CareersHero />
      <WhyJoinUs />
      <JobListings />
    </div>
  );
}
