"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 300; // 000 to 299
const CONCURRENCY = 8;   // Max parallel image loads at once (keeps network happy)

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const loadedCountRef = useRef(0);
  const activeLoadsRef = useRef(0);
  const queueRef = useRef<number[]>([]);
  const isDrawingRef = useRef(false);

  const [frame0Ready, setFrame0Ready] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  // Initialize to 1 so SSR and first client render both produce scale(1),
  // avoiding the React hydration mismatch from window.devicePixelRatio.
  const [dpr, setDpr] = useState(1);

  // Capture real DPR after mount (client-only)
  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ─── Draw a specific frame index ─────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Find the nearest available frame
    let img = imagesRef.current[index];
    if (!img) {
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

  // ─── Concurrency-limited queue processor ─────────────────────────────────
  const processQueue = useCallback(() => {
    while (activeLoadsRef.current < CONCURRENCY && queueRef.current.length > 0) {
      const i = queueRef.current.shift()!;
      if (imagesRef.current[i]) {
        // Already loaded (e.g. frame 0 loaded eagerly), skip
        processQueue();
        return;
      }
      activeLoadsRef.current++;

      const attempt = (usePng: boolean) => {
        const img = new Image();
        const idx = String(i).padStart(3, "0");
        img.src = usePng
          ? `/sequence/frame_${idx}_delay-0.066s.png`
          : `/sequence/frame_${idx}_delay-0.066s.webp`;

        img.onload = () => {
          imagesRef.current[i] = img;
          loadedCountRef.current++;
          activeLoadsRef.current--;

          const pct = Math.round((loadedCountRef.current / FRAME_COUNT) * 100);
          setLoadProgress(pct);

          if (i === 0) setFrame0Ready(true);
          if (loadedCountRef.current === FRAME_COUNT) setFullyLoaded(true);

          // Redraw current frame if we just loaded a frame near it
          if (!isDrawingRef.current) {
            const currentIndex = Math.floor(
              scrollYProgress.get() * (FRAME_COUNT - 1)
            );
            if (Math.abs(i - currentIndex) < 10) {
              drawFrame(currentIndex);
            }
          }

          processQueue();
        };

        img.onerror = () => {
          if (!usePng) {
            attempt(true); // fallback to PNG
          } else {
            loadedCountRef.current++;
            activeLoadsRef.current--;
            processQueue();
          }
        };
      };

      attempt(false); // try WebP first
    }
  }, [drawFrame, scrollYProgress]);

  // ─── Smart frame loading: priority order ─────────────────────────────────
  useEffect(() => {
    // 1. Load frame 0 with max priority immediately
    const loadFrame0 = () => {
      const img = new Image();
      img.src = `/sequence/frame_000_delay-0.066s.webp`;
      img.onload = () => {
        imagesRef.current[0] = img;
        loadedCountRef.current++;
        activeLoadsRef.current--;
        setFrame0Ready(true);
        setLoadProgress(Math.round((1 / FRAME_COUNT) * 100));
        processQueue();
      };
      img.onerror = () => {
        const fallback = new Image();
        fallback.src = `/sequence/frame_000_delay-0.066s.png`;
        fallback.onload = () => {
          imagesRef.current[0] = fallback;
          loadedCountRef.current++;
          activeLoadsRef.current--;
          setFrame0Ready(true);
          setLoadProgress(Math.round((1 / FRAME_COUNT) * 100));
          processQueue();
        };
        fallback.onerror = () => {
          activeLoadsRef.current--;
          processQueue();
        };
      };
      activeLoadsRef.current++;
    };

    // 2. Build priority queue: interleaved (0, 299, 1, 298, 2, ...) for good
    //    coverage across the animation immediately after frame 0 loads.
    const priorityQueue: number[] = [];
    let lo = 1, hi = FRAME_COUNT - 1;
    while (lo <= hi) {
      priorityQueue.push(lo++);
      if (lo <= hi) priorityQueue.push(hi--);
    }
    queueRef.current = priorityQueue;

    loadFrame0();
  }, [processQueue]);

  // ─── Canvas resize & initial draw ────────────────────────────────────────
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

  // ─── Scrub frame on scroll ───────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!frame0Ready) return;
    isDrawingRef.current = true;
    const frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    drawFrame(Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1)));
    isDrawingRef.current = false;
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">

      {/* ── Splash: shown until frame 0 is ready ──────────────────────── */}
      {!frame0Ready && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#121212] z-50 gap-6">
          {/* Animated ring */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-white/5" />
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#3B82F6] border-r-[#06B6D4]"
              style={{ animation: "spin 1s linear infinite" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#3B82F6] text-xs font-bold font-mono">JC</span>
            </div>
          </div>
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-light">
            Loading
          </span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ── Background load progress bar (thin, top) ──────────────────── */}
      {frame0Ready && !fullyLoaded && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] transition-all duration-300 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block origin-top-left"
          style={{
            transform: `scale(${1 / dpr})`,
            opacity: frame0Ready ? 1 : 0,
            transition: "opacity 0.5s ease",
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
