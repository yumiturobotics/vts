export default function JsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Village Technology School",
    alternateName: ["VTS", "Yumitu Robotics"],
    url: "https://villagetechnologyschool.com",
    logo: "https://villagetechnologyschool.com/images/vts-new-logo.png",
    image: "https://villagetechnologyschool.com/images/vts-new-logo.png",
    description:
      "Leading STEM education provider in Chennai offering robotics internships, IoT workshops, drone bootcamps, Arduino kits, humanoid robot kits (NilaBot, LilliBot), DIY STEM kits, innovation lab setup, coding bootcamps and competitions. Empowering 20,000+ students with future-ready skills across India.",
    foundingDate: "2021",
    founder: {
      "@type": "Person",
      name: "Balaji Thiru",
      jobTitle: "Founder & CEO",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.72, Gandhi Nagar Main, Virugambakkam, Mambala Virugambakkam",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600092",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.0496",
      longitude: "80.1849",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-85111-16253",
        contactType: "customer service",
        email: "yumiturobotics@gmail.com",
        availableLanguage: ["English", "Tamil"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/a-yumitu-robotics-pvt-ltd",
      "https://www.linkedin.com/company/villagetechschool",
      "https://youtube.com/@yumiturobotics_0",
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Chennai",
      },
      {
        "@type": "State",
        name: "Tamil Nadu",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    knowsAbout: [
      "STEM Education",
      "Robotics",
      "Humanoid Robots",
      "Semi-Humanoid Robots",
      "NilaBot",
      "LilliBot",
      "Drones",
      "Aeromodelling",
      "IoT",
      "Internet of Things",
      "Arduino",
      "Innovation Labs",
      "ATL Labs",
      "Coding Bootcamps",
      "Python Programming",
      "Embedded Systems",
      "DIY STEM Kits",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "STEM Education Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Robotics & IoT Internship",
            description:
              "Hands-on robotics and IoT internship program in Chennai for engineering students. Work on real-time projects with industry mentors, humanoid robots, drones, and embedded systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "STEM Workshops & Bootcamps",
            description:
              "Expert-led workshops on robotics, drones, IoT, Arduino, and coding conducted at schools and colleges across Tamil Nadu.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Innovation Lab Setup",
            description:
              "Complete ATL & STEM innovation lab setup for schools with equipment, curriculum integration, teacher training, and ongoing support.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Coding Bootcamp",
            description:
              "Intensive coding bootcamp programs in Python, C++, Arduino programming, and web development for students.",
          },
        },
      ],
    },
  };

  const productData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "NilaBot - Humanoid Robot Kit",
      description:
        "AI-powered humanoid robot for interactive STEM education. Features voice recognition, gesture-based interactions, 16+ servo motors, and programmable behavior modules.",
      brand: { "@type": "Brand", name: "Village Technology School" },
      manufacturer: { "@type": "Organization", name: "Village Technology School" },
      category: "Educational Robotics",
      image: "https://villagetechnologyschool.com/images/nilabot_4.jpeg",
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "LilliBot - Semi-Humanoid Robot Kit",
      description:
        "Versatile semi-humanoid robot platform for structured STEM learning. Features modular assembly, multiple sensors, servo-driven arms, and Bluetooth control.",
      brand: { "@type": "Brand", name: "Village Technology School" },
      manufacturer: { "@type": "Organization", name: "Village Technology School" },
      category: "Educational Robotics",
      image: "https://villagetechnologyschool.com/images/lillibot_3.jpeg",
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "DIY STEM Kit",
      description:
        "50+ do-it-yourself science projects covering hydraulic arms, solar vehicles, and more. Designed for ages 8-18 with illustrated guides and no soldering required.",
      brand: { "@type": "Brand", name: "Village Technology School" },
      manufacturer: { "@type": "Organization", name: "Village Technology School" },
      category: "STEM Education Kits",
      image: "https://villagetechnologyschool.com/images/diy_stem_kit.png",
    },
  ];

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best robotics internship in Chennai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Village Technology School offers the best robotics and IoT internship in Chennai. Students work on real-time projects including humanoid robots (NilaBot, LilliBot), drones, IoT systems, and embedded systems under industry mentors. The program provides hands-on experience, innovation skills, and industry-ready training.",
        },
      },
      {
        "@type": "Question",
        name: "Does Village Technology School offer STEM workshops and bootcamps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! VTS conducts expert-led hands-on workshops and bootcamps on robotics, drones, IoT, Arduino, Python programming, and coding at schools and colleges across Chennai and Tamil Nadu. These workshops are designed for students from grades 6 to college level.",
        },
      },
      {
        "@type": "Question",
        name: "What DIY kits does Village Technology School offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VTS offers a range of DIY STEM kits including the NilaBot (humanoid robot kit), LilliBot (semi-humanoid robot kit), educational drones, IoT kits with ESP32/ESP8266, Arduino kits with 50+ components, aeromodelling kits, and DIY STEM project kits with 50+ projects for ages 8-18.",
        },
      },
      {
        "@type": "Question",
        name: "How can I apply for an internship at Village Technology School?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can apply for an internship at Village Technology School by visiting our website at villagetechnologyschool.com and clicking the 'Apply Now' button, or directly navigating to villagetechnologyschool.com/#apply to fill out the application form. We offer internships in robotics, IoT, embedded systems, and more.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      {productData.map((product, i) => (
        <script
          key={`product-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
