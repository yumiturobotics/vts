export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Village Technology School",
    alternateName: "VTS",
    url: "https://villagetechnologyschool.com",
    logo: "https://villagetechnologyschool.com/images/logo.png",
    description:
      "Leading STEM education provider offering robotics, drones, IoT kits, Arduino kits, aeromodelling, innovation labs, internships, workshops and competitions. Empowering students with future-ready skills.",
    foundingDate: "2021",
    founder: {
      "@type": "Person",
      name: "Balaji Thiru",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "MIT Campus",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-85111-16253",
      contactType: "customer service",
      email: "yumiturobotics@gmail.com",
      availableLanguage: ["English", "Tamil"],
    },
    sameAs: [
      "https://www.linkedin.com/company/villagetechschool",
      "https://youtube.com/@yumiturobotics_0",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "STEM Education",
      "Robotics",
      "Drones",
      "IoT",
      "Arduino",
      "Aeromodelling",
      "Innovation Labs",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
