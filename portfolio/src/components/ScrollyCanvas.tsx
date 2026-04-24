"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 300; // 000 to 299

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use a ref for images so drawFrame never needs to be recreated
  // and individual frame loads don't cause re-renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const loadedCountRef = useRef(0);

  const [frame0Ready, setFrame0Ready] = useState(false);   // show canvas ASAP
  const [fullyLoaded, setFullyLoaded] = useState(false);   // all frames ready

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Draw a specific frame index ────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find the nearest available frame if exact one isn't loaded yet
    let img = imagesRef.current[index];
    if (!img) {
      // Search backward then forward for nearest loaded frame
      for (let d = 1; d < 30; d++) {
        if (index - d >= 0 && imagesRef.current[index - d]) {
          img = imagesRef.current[index - d];
          break;
        }
        if (index + d < FRAME_COUNT && imagesRef.current[index + d]) {
          img = imagesRef.current[index + d];
          break;
        }
      }
    }
    if (!img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // ─── Progressive frame loader ────────────────────────────────────────────────
  useEffect(() => {
    const loadFrame = (i: number) => {
      const img = new Image();
      const idx = String(i).padStart(3, "0");

      // Try WebP first (much smaller), fallback to PNG
      img.src = `/sequence/frame_${idx}_delay-0.066s.webp`;
      img.onerror = () => {
        // WebP not found — fall back to PNG (during migration or if conversion not done)
        const fallback = new Image();
        fallback.src = `/sequence/frame_${idx}_delay-0.066s.png`;
        fallback.onload = () => {
          imagesRef.current[i] = fallback;
          loadedCountRef.current++;
          if (i === 0) setFrame0Ready(true);
          if (loadedCountRef.current === FRAME_COUNT) setFullyLoaded(true);
        };
        imagesRef.current[i] = fallback; // assign eagerly so fallback draws work
      };

      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCountRef.current++;
        // Show canvas as soon as frame 0 is ready — don't wait for all 300
        if (i === 0) setFrame0Ready(true);
        if (loadedCountRef.current === FRAME_COUNT) setFullyLoaded(true);
      };
    };

    // Load frame 0 with highest priority, then load the rest
    loadFrame(0);

    // After a tiny delay to let frame 0 start, kick off the rest
    // Loading in order means early frames are ready before user scrolls to them
    const id = setTimeout(() => {
      for (let i = 1; i < FRAME_COUNT; i++) loadFrame(i);
    }, 50);

    return () => clearTimeout(id);
  }, []);

  // ─── Canvas resize & initial draw ───────────────────────────────────────────
  useEffect(() => {
    if (!frame0Ready || !canvasRef.current) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const currentIndex = Math.floor(
          scrollYProgress.get() * (FRAME_COUNT - 1)
        );
        drawFrame(Math.max(0, Math.min(currentIndex, FRAME_COUNT - 1)));
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [frame0Ready, drawFrame, scrollYProgress]);

  // ─── Scrub frame on scroll ───────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!frame0Ready) return;
    const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    drawFrame(Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1)));
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {/* Loading bar — thin progress strip at top, only while loading */}
      {!fullyLoaded && frame0Ready && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
          <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] animate-pulse" />
        </div>
      )}

      {/* Splash shown only until frame 0 is ready */}
      {!frame0Ready && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#121212] z-50 gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-2 h-2 rounded-full bg-[#3B82F6] animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-white/30 text-xs tracking-widest uppercase">
            Loading
          </span>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block origin-top-left"
          style={{
            transform: `scale(${
              1 /
              (typeof window !== "undefined"
                ? window.devicePixelRatio || 1
                : 1)
            })`,
            opacity: frame0Ready ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        <div
          className={`transition-opacity duration-700 ${
            frame0Ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
