"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function FloatingNav() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  // Show nav only after the hero canvas section (roughly after 15% scroll)
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.12);
    });
    return unsub;
  }, [scrollYProgress]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-8 left-8 z-[100] flex flex-col gap-1 pointer-events-none"
      aria-label="Section navigation"
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          className="group flex items-center gap-3 pointer-events-auto"
        >
          {/* Animated dash */}
          <span className="block h-[1px] w-4 bg-white/20 group-hover:w-7 group-hover:bg-[#3B82F6] transition-all duration-300 ease-out" />
          <span className="text-xs font-medium tracking-widest uppercase text-white/30 group-hover:text-white transition-colors duration-300">
            {link.label}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}
