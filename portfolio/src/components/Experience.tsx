"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer — Backend / Full-Stack",
    company: "Aaptekno US LLP",
    location: "Bangalore, India",
    period: "Feb 2025 — Present",
    bullets: [
      "Designed Python RESTful backend services with Django and ORM-backed PostgreSQL supporting secure enterprise workflows.",
      "Implemented JWT and mTLS authentication/authorization, strengthening API security across enterprise deployments.",
      "Built a Rust + Python agent service with DB indexing strategies, reducing average API response time by ~40%.",
      "Integrated async inter-service messaging via NATS in a microservices architecture for event-driven communication.",
      "Automated CI/CD pipelines using GitHub Actions and Docker, cutting release cycle time by ~50%.",
    ],
  },
  {
    title: "AI & Machine Learning Engineer Intern",
    company: "Rooman Technologies",
    location: "Bangalore, India",
    period: "Sep 2024 — Feb 2025",
    bullets: [
      "Built Python ML pipelines for customer segmentation using deep clustering and autoencoders, improving targeting accuracy by ~25%.",
      "Preprocessed datasets with Pandas/NumPy and deployed trained models as Python backend services for analytics.",
      "Optimized data preprocessing pipelines, improving model accuracy by 15% using TensorFlow, Keras, and feature engineering.",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "CR Technologies Private Limited",
    location: "Bangalore, India",
    period: "Oct 2023 — Nov 2023",
    bullets: [
      "Built responsive web pages using HTML, CSS, and JavaScript in collaboration with senior developers.",
      "Managed and optimized SQL and NoSQL databases (MySQL, MongoDB) for robust data storage.",
      "Developed a dynamic web application that improved user engagement by 30% and reduced page load time by 20%.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-[#121212] py-32 px-8 text-white relative z-20 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-medium tracking-widest text-[#3B82F6] uppercase mb-16 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#3B82F6]/50"></span>
            Experience
          </h3>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] top-4 bottom-0 w-[2px] bg-white/5" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-20 sm:pl-32"
              >
                {/* Dot */}
                <div className="absolute left-[13px] top-6 w-[30px] h-[30px] bg-[#121212] rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#06B6D4] shadow-[0_0_15px_#06B6D4] animate-pulse" />
                </div>

                {/* Content Card */}
                <div className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/10">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] via-[#06B6D4] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                      <h4 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#3B82F6]" />
                        {exp.title}
                      </h4>
                      <p className="text-[#06B6D4] mt-2 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 font-mono">
                        {exp.period}
                      </span>
                      <p className="text-gray-500 text-sm mt-2">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-4 text-gray-400 font-light leading-relaxed list-none">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="relative pl-6">
                        <span className="absolute left-0 top-2.5 w-2 h-[2px] bg-[#3B82F6]/50 rounded-full" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
