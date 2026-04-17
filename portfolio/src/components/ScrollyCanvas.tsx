"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 300; // 000 to 299

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIdx = String(i).padStart(3, "0");
        img.src = `/sequence/frame_${frameIdx}_delay-0.066s.png`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                setImages(loadedImages);
                setLoaded(true);
            }
        };
        loadedImages.push(img);
    }
  }, []);

  const drawFrame = useCallback((index: number) => {
      if (!canvasRef.current || !images[index]) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[index];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
          // Canvas is wider than image (fit to width)
          drawHeight = canvasWidth / imgRatio;
          offsetY = (canvasHeight - drawHeight) / 2;
      } else {
          // Canvas is taller than image (fit to height)
          drawWidth = canvasHeight * imgRatio;
          offsetX = (canvasWidth - drawWidth) / 2;
      }

      // Smooth rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  // Handle Resize & Initial Draw
  useEffect(() => {
      if (!loaded || !canvasRef.current || images.length === 0) return;

      const resizeCanvas = () => {
          if (!canvasRef.current) return;
          const parent = canvasRef.current.parentElement;
          if (parent) {
              const rect = parent.getBoundingClientRect();
              const dpr = window.devicePixelRatio || 1;
              canvasRef.current.width = rect.width * dpr;
              canvasRef.current.height = rect.height * dpr;
              
              const currentIndex = Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1));
              drawFrame(Math.max(0, Math.min(currentIndex, FRAME_COUNT - 1)));
          }
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas(); // Draw initially

      return () => window.removeEventListener("resize", resizeCanvas);
  }, [loaded, drawFrame, scrollYProgress, images.length]);

  // Scrub frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
      if (!loaded) return;
      const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
      drawFrame(Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1)));
  });

  return (
      <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
          {/* Loading state visual indicator could go here */}
          {!loaded && (
             <div className="fixed inset-0 flex items-center justify-center text-white/50 z-50">
               <span className="animate-pulse tracking-widest uppercase text-sm">Loading Visuals...</span>
             </div>
          )}

          <div className="sticky top-0 h-screen w-full overflow-hidden">
              <canvas
                  ref={canvasRef}
                  className="w-full h-full block origin-top-left"
                  style={{ transform: `scale(${1 / (typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1)})` }}
              />
              {/* Only show overlay if loaded */}
              <div className={`transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                 <Overlay scrollYProgress={scrollYProgress} />
              </div>
          </div>
      </div>
  );
}
