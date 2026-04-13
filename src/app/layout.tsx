import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import JsonLd from "@/components/JsonLd";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C1A2E",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://villagetechnologyschool.com"),
  title: {
    default: "Village Technology School | STEM Robotics & Innovation Education",
    template: "%s | Village Technology School",
  },
  description:
    "Leading STEM education provider offering robotics, drones, IoT kits, Arduino kits, aeromodelling, innovation labs, internships, workshops and competitions. Empowering 20,000+ students with future-ready skills across India.",
  keywords: [
    "STEM education",
    "robotics training",
    "drones education",
    "IoT kits",
    "Arduino kits",
    "aeromodelling",
    "innovation labs",
    "student workshops",
    "STEM competitions",
    "school lab setup",
    "robotics for schools",
    "STEM India",
    "Village Technology School",
    "VTS",
    "humanoid robots",
    "coding bootcamp",
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
    title: "Village Technology School | STEM Robotics & Innovation Education",
    description:
      "Empowering the next generation of innovators through hands-on STEM education, robotics training, and cutting-edge technology programs across India.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Village Technology School - STEM Robotics & Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Village Technology School | STEM Robotics & Innovation",
    description:
      "Empowering the next generation of innovators through hands-on STEM education, robotics training, and cutting-edge technology programs.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
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
        <JsonLd />
      </head>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
