"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Shield, Cpu, Bot } from "lucide-react";

export default function WhatIDo() {
  const services = [
    {
      id: 1,
      title: "Agentic AI Systems",
      description: "Building autonomous AI agents using LangChain, LangGraph, MCP tools, and RAG pipelines — agents that crawl, reason, plan, and act with persistent memory across sessions.",
      icon: <Bot className="w-8 h-8 text-violet-400" />,
      glow: "hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
      gradient: "from-violet-500/0 via-transparent to-violet-500/5",
    },
    {
      id: 2,
      title: "Backend & API Engineering",
      description: "Building production-grade RESTful APIs and microservices with Django, FastAPI, and Flask — backed by PostgreSQL, Redis, and async task queues.",
      icon: <Code2 className="w-8 h-8 text-blue-500" />,
      glow: "hover:border-[#3B82F6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      gradient: "from-[#3B82F6]/0 via-transparent to-[#06B6D4]/5",
    },
    {
      id: 3,
      title: "AI / ML Integration",
      description: "Implementing ML pipelines, deep learning models (CNN, LSTM), and LLM integrations using LangChain, TensorFlow, and Gemini/OpenRouter APIs.",
      icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />,
      glow: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      gradient: "from-cyan-500/0 via-transparent to-cyan-500/5",
    },
    {
      id: 4,
      title: "Secure Distributed Systems",
      description: "Designing microservices with JWT/mTLS authentication, NATS messaging, and inter-service communication in Rust + Python hybrid architectures.",
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      glow: "hover:border-[#3B82F6]/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      gradient: "from-[#3B82F6]/0 via-transparent to-[#06B6D4]/5",
    },
    {
      id: 5,
      title: "DevOps & Cloud Deployment",
      description: "Containerizing apps with Docker, orchestrating CI/CD via GitHub Actions, and deploying on AWS EC2/S3 with NGINX + Gunicorn for production.",
      icon: <Cpu className="w-8 h-8 text-cyan-500" />,
      glow: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
      gradient: "from-[#3B82F6]/0 via-transparent to-[#06B6D4]/5",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="bg-[#121212] py-28 px-8 text-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-medium tracking-widest text-[#3B82F6] uppercase mb-12 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-[#3B82F6]/50"></span>
            What I Do
          </h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:bg-white/10 flex flex-col gap-5 overflow-hidden ${
                service.glow
              } ${service.id === 1 ? "md:col-span-2" : ""}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              {service.id === 1 && (
                <span className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300">
                  Featured
                </span>
              )}
              <div className="relative z-10 flex md:flex-row flex-col gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 tracking-tight">{service.title}</h4>
                  <p className="text-gray-400 text-[15px] font-light leading-relaxed">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
