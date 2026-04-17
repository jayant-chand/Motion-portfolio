"use client";

import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function FooterCTA() {
  return (
    <section id="contact" className="bg-[#121212] py-32 px-8 relative overflow-hidden z-20 flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Animated Radial Gradient Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[800px] h-[800px] bg-gradient-to-tr from-[#3B82F6] to-[#06B6D4] rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
          Let&apos;s Build <br className="hidden md:block" /> Something Together
        </h2>
        
        <p className="text-xl text-gray-400 font-light mb-12 max-w-lg leading-relaxed">
          Open to backend engineering roles, AI/ML projects, and full-stack collaborations.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-16">
          <a
            href="mailto:jayantchand2379@gmail.com"
            className="group relative px-8 py-4 bg-transparent border border-[#3B82F6] text-white rounded-full font-medium tracking-wide overflow-hidden hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-shadow duration-300 text-center"
          >
            <div className="absolute inset-0 bg-[#3B82F6] w-0 group-hover:w-full transition-all duration-300 ease-out" />
            <span className="relative z-10">Get In Touch</span>
          </a>
          
          <button 
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/resume.pdf";
              link.download = "Jayant_Chand_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-medium tracking-wide transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Download Resume
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-8">
          <a href="https://github.com/jayant-chand" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <SiGithub className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/jayant-chand" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0A66C2] hover:-translate-y-1 transition-all duration-300">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
      
      {/* Footer copyright */}
      <div className="absolute bottom-8 text-gray-600 text-sm font-light">
        © {new Date().getFullYear()} Jayant Chand. All rights reserved.
      </div>
    </section>
  );
}
