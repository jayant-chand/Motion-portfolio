import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "InvoiceHub",
    category: "SaaS · Django REST · React · AWS",
    description: "Production-grade Dockerized SaaS billing platform with PostgreSQL, Redis caching, Celery async queues, and CI/CD via GitHub Actions.",
    link: "https://github.com/jayant-chand/invoicehub.git",
    image: "/projects/invoicehub.png",
    borderHover: "hover:border-[#3B82F6]/40",
  },
  {
    id: 2,
    title: "Deepfake Detection",
    category: "AI/ML · CNN + LSTM · Django · Docker",
    description: "IEEE-published deep learning pipeline (ResNext CNN + LSTM) achieving ~90% detection accuracy. Deployed as Dockerized REST inference service, ~150+ req/day.",
    link: "https://github.com/jayant-chand/Deepfake-Detection-using-Deep-Learning.git",
    image: "/projects/deepfake.png",
    borderHover: "hover:border-[#06B6D4]/40",
  },
  {
    id: 3,
    title: "Wanderly.AI",
    category: "AI Trip Planner · Node.js · Gemini API",
    description: "AI-driven SaaS for personalized travel itineraries via natural language prompts. Integrates Gemini, Google Maps routing, Redis caching, and OAuth auth.",
    link: "https://github.com/jayant-chand/Wanderly-ai-travel-planner.git",
    image: "/projects/wanderly.png",
    borderHover: "hover:border-[#8B5CF6]/40",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#121212] py-40 px-8 min-h-screen text-white relative z-20">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-sm font-medium tracking-widest text-white/40 uppercase mb-20 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-white/20"></span>
          Selected Works
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((proj) => (
            <a
              key={proj.id}
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className={`group relative h-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 ${proj.borderHover} hover:bg-white/10 flex flex-col justify-end p-10 cursor-pointer shadow-2xl`}
            >
              {/* Real project image background */}
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover absolute inset-0 z-0 opacity-30 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-0" />

              <div className="relative z-10 flex justify-between items-end w-full">
                <div className="max-w-xs">
                  <p className="text-white/60 mb-3 font-mono text-sm tracking-wide">{proj.category}</p>
                  <h4 className="text-3xl font-semibold tracking-tight mb-3 transition-transform duration-500 group-hover:-translate-y-2">{proj.title}</h4>
                  <p className="text-gray-400 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">{proj.description}</p>
                </div>
                <div className="bg-white text-black p-4 rounded-full opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-[0_0_30px_rgba(255,255,255,0.4)] shrink-0 ml-4">
                  <ArrowUpRight size={24} strokeWidth={2.5} />
                </div>
              </div>
            </a>
          ))}

          {/* IEEE Publication card */}
          <a
            href="https://ieeexplore.ieee.org/document/11256330"
            target="_blank"
            rel="noreferrer"
            className="group relative h-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#FFD700]/40 hover:bg-white/10 flex flex-col justify-end p-10 cursor-pointer shadow-2xl"
          >
            {/* IEEE image background */}
            <Image
              src="/projects/ieee.png"
              alt="IEEE Research Publication"
              fill
              className="object-cover absolute inset-0 z-0 opacity-30 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-0" />

            <div className="relative z-10 flex justify-between items-end w-full">
              <div className="max-w-xs">
                <p className="text-white/60 mb-3 font-mono text-sm tracking-wide">IEEE Research · InC4 2025</p>
                <h4 className="text-3xl font-semibold tracking-tight mb-3 transition-transform duration-500 group-hover:-translate-y-2">
                  AI/ML Deepfake Detection
                </h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  Accepted & presented at IEEE InC4 2025 (~15% acceptance rate). Published on IEEE Xplore. Paper ID: 1164.
                </p>
              </div>
              <div className="bg-white text-black p-4 rounded-full opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-[0_0_30px_rgba(255,255,255,0.4)] shrink-0 ml-4">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
