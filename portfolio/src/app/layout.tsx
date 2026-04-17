import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jayant Chand — Software Developer",
  description: "Portfolio of Jayant Chand — Software Developer specializing in Django, FastAPI, PostgreSQL, Docker, AWS, AI/ML integration, and DevOps.",
  metadataBase: new URL("https://jayant-chand.vercel.app"),
  openGraph: {
    title: "Jayant Chand — Software Developer",
    description: "Python · Django · FastAPI · Rust · AI/ML · Docker · AWS",
    url: "https://jayant-chand.vercel.app",
    siteName: "Jayant Chand",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayant Chand — Software Developer",
    description: "Python · Django · FastAPI · Rust · AI/ML · Docker · AWS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased selection:bg-white/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
