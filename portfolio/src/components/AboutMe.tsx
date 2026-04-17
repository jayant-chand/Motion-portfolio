"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";

export default function AboutMe() {
  return (
    <section id="about" className="bg-[#121212] py-32 px-8 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* LEFT: Abstract AI Graphic */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-start"
        >
            <div className="relative w-full max-w-md aspect-square rounded-full border border-white/10 flex items-center justify-center p-8 overflow-hidden bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(59,130,246,0.1)]">
                {/* Simulated Neural Network Graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/20 to-[#06B6D4]/5 rounded-full blur-3xl" />
                <svg className="w-full h-full text-white/20 animate-[spin_60s_linear_infinite]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
                    <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" />
                    
                    {/* Glowing nodes */}
                    <circle cx="100" cy="10" r="3" className="fill-[#3B82F6]" />
                    <circle cx="190" cy="100" r="3" className="fill-[#06B6D4]" />
                    <circle cx="100" cy="190" r="3" className="fill-[#3B82F6]" />
                    <circle cx="10" cy="100" r="3" className="fill-[#06B6D4]" />
                    <circle cx="164" cy="36" r="3" className="fill-white" />
                    <circle cx="36" cy="164" r="3" className="fill-white" />
                </svg>
                {/* Pulse ring */}
                <div className="absolute w-20 h-20 bg-[#3B82F6] rounded-full blur-2xl opacity-20 animate-pulse" />
            </div>
        </motion.div>

        {/* RIGHT: Bio Text */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 text-white"
        >
          <h3 className="text-sm font-medium tracking-widest text-[#06B6D4] uppercase mb-8 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#06B6D4]/50"></span>
            About Me
          </h3>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            Building secure, scalable systems that perform.
          </h2>
          
          <div className="space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            <p>
              I&apos;m Jayant — a Python Backend Developer with 1+ year of production experience building secure, scalable systems using Django REST Framework, PostgreSQL, Docker, and AWS.
            </p>
            <p>
              I&apos;m hands-on with microservices, JWT/mTLS authentication, and CI/CD automation. Also a published IEEE researcher in AI/ML with working knowledge of LLMs, LangChain, and ML model integration.
            </p>
            <p>
              Currently at Aaptekno US LLP, contributing to high-performance distributed systems in Rust and Python — driven by the intersection of performance, security, and clean architecture.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-4">
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm"
            >
              <MapPin className="w-4 h-4 text-[#3B82F6]" />
              Bangalore, India
            </motion.div>
            
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm"
            >
              <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
              B.E. Information Science — VTU (8.3 CGPA)
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
