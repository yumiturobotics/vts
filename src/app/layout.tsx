import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import JsonLd from "@/components/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C1A2E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://villagetechnologyschool.com"),
  title: {
    default:
      "Village Technology School | Best STEM Robotics & Innovation Education in Chennai",
    template: "%s | Village Technology School",
  },
  description:
    "Best STEM education & robotics internship in Chennai. Offering hands-on robotics training, IoT workshops, drone bootcamps, Arduino kits, humanoid robot kits (NilaBot, LilliBot), DIY STEM kits, innovation lab setup & coding bootcamps for schools & colleges. 20,000+ students trained across India.",
  keywords: [
    "STEM education",
    "robotics training",
    "robotics internship Chennai",
    "IoT internship for students",
    "STEM internship Chennai",
    "best internship in Chennai",
    "robotics workshop Chennai",
    "IoT workshop for students",
    "STEM workshops Chennai",
    "robotics bootcamp",
    "coding bootcamp Chennai",
    "hands-on STEM training",
    "drones education",
    "educational drones",
    "IoT kits",
    "Arduino kits",
    "aeromodelling",
    "innovation labs",
    "innovation lab setup India",
    "STEM lab setup for schools",
    "ATL lab setup",
    "student workshops",
    "STEM competitions",
    "school lab setup",
    "robotics for schools",
    "STEM India",
    "STEM education Tamil Nadu",
    "best STEM education Tamil Nadu",
    "Village Technology School",
    "VTS",
    "humanoid robots",
    "humanoid robot kit India",
    "NilaBot",
    "NilaBot humanoid robot",
    "LilliBot",
    "LilliBot semi-humanoid robot",
    "DIY robot kit",
    "DIY STEM kits",
    "real-time projects for students",
    "industry mentors",
    "hands-on experience",
    "Yumitu Robotics",
  ],
  authors: [{ name: "Village Technology School" }],
  creator: "Village Technology School",
  publisher: "Village Technology School",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://villagetechnologyschool.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://villagetechnologyschool.com",
    siteName: "Village Technology School",
    title:
      "Village Technology School | Best STEM Robotics & Innovation Education in Chennai",
    description:
      "Best STEM education & robotics internship in Chennai. Hands-on robotics, IoT, drones, Arduino, humanoid robots (NilaBot, LilliBot), DIY kits, innovation lab setup, workshops & bootcamps. 20,000+ students trained.",
    images: [
      {
        url: "/images/vts-new-logo.png",
        width: 1024,
        height: 1024,
        alt: "Village Technology School - STEM Robotics & Innovation Education Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Village Technology School | STEM Robotics & Innovation Education Chennai",
    description:
      "Best STEM education & robotics internship in Chennai. Hands-on robotics, IoT, drones, DIY kits, innovation lab setup & workshops.",
    images: ["/images/vts-new-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
        />
        <JsonLd />
      </head>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
        <SpeedInsights />
      </body>
    </html>
  );
}
