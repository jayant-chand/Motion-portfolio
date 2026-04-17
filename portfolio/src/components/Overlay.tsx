"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    // Parallax values synchronized with scrollYProgress mapped 0 to 1
    
    // Section 1: Starts center, fades out early
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0vh", "-50vh"]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

    // Section 2: Fades in left at 20%, peaks at 35%, disappears at 50%
    const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5], ["50vh", "0vh", "-50vh"]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);

    // Section 3: Fades in right at 50%, peaks at 65%, stays near end
    const y3 = useTransform(scrollYProgress, [0.5, 0.65, 0.8], ["50vh", "0vh", "-30vh"]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Section 1 */}
            <motion.div 
                style={{ y: y1, opacity: opacity1 }}
                className="absolute text-center text-white"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                    Jayant Chand
                </h1>
                <p className="text-xl md:text-3xl mt-4 text-white/70 font-light">
                    Software Developer.
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div 
                style={{ y: y2, opacity: opacity2 }}
                className="absolute left-8 md:left-24 lg:left-32 top-1/2 -translate-y-1/2 text-left text-white max-w-xl"
            >
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight mix-blend-screen">
                    I engineer secure,
                    scalable softwares.
                </h2>
                <div className="h-[2px] w-24 bg-white/40 my-6" />
                <p className="text-xl md:text-2xl text-white/70 font-light">
                    Django · FastAPI · PostgreSQL · Docker · AWS — built for production, not prototypes.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div 
                style={{ y: y3, opacity: opacity3 }}
                className="absolute right-8 md:right-24 lg:right-32 top-1/2 -translate-y-1/2 text-right text-white max-w-xl"
            >
                <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight mix-blend-screen">
                    IEEE researcher.
                    AI/ML practitioner.
                </h2>
                <div className="h-[2px] w-24 bg-white/40 ml-auto my-6" />
                <p className="text-xl md:text-2xl text-white/70 font-light">
                    Published CNN + LSTM deepfake detection research. LangChain, Gemini, TensorFlow in production.
                </p>
            </motion.div>
        </div>
    );
}
