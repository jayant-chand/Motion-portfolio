"use client";

import { motion } from "framer-motion";
import { 
  SiPython, SiDjango, SiPostgresql, SiMongodb, SiReact, 
  SiTailwindcss, SiDocker, SiGithubactions, SiNginx,
  SiRust, SiNodedotjs, SiRedis, SiFastapi,
  SiFlask, SiPandas, SiNumpy, SiTensorflow, SiKeras
} from "react-icons/si";
import { AiOutlineRobot } from "react-icons/ai";
import { FaAws } from "react-icons/fa";

export default function Arsenal() {
  const row1 = [
    { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
    { name: "Django / DRF", icon: <SiDjango className="text-[#092E20]" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
    { name: "Flask", icon: <SiFlask className="text-white" /> },
    { name: "Rust", icon: <SiRust className="text-[#CE412B]" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
    { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  ];

  const row2 = [
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
    { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
    { name: "AWS EC2/S3", icon: <FaAws className="text-[#FF9900]" /> },
    { name: "NGINX", icon: <SiNginx className="text-[#009639]" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
    { name: "LangChain", icon: <AiOutlineRobot className="text-white" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" /> },
    { name: "Pandas / NumPy", icon: <SiPandas className="text-[#150458]" /> },
    { name: "Keras", icon: <SiKeras className="text-[#D00000]" /> },
  ];

  return (
    <section className="bg-[#121212] py-20 overflow-hidden relative z-20">
      
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#121212] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#121212] to-transparent z-10" />

      <div className="flex flex-col gap-8 w-[200%] md:w-[150%] lg:w-[120%]">
        
        {/* Row 1 - Moves Left */}
        <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex gap-6"
        >
          {[...row1, ...row1, ...row1].map((tech, idx) => (
            <div key={`r1-${idx}`} className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm whitespace-nowrap group hover:border-[#3B82F6]/50 transition-colors">
              <span className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="text-sm font-medium text-white/90">{tech.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - Moves Right */}
        <motion.div 
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex gap-6 relative left-[-200px]"
        >
          {[...row2, ...row2, ...row2].map((tech, idx) => (
            <div key={`r2-${idx}`} className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm whitespace-nowrap group hover:border-[#06B6D4]/50 transition-colors">
              <span className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="text-sm font-medium text-white/90">{tech.name}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
