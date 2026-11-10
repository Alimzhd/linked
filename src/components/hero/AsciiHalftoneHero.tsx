import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { soundEngine } from '../../lib/sound';

const VIDEO_SRC = '/assets/aistudio/Chain_Signal_-_Halftone_Bracelet_3b7bcd6d.mp4';
const ASCII_RAMP = ' .:-=+*#%@';
const CELL_W = 7;
const CELL_H = 8;
const FRAME_MS = 1000 / 60;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = id === 'customizer' ? '/customize' : '/shop';
  }
}

export function AsciiHalftoneHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sampleRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-linked continuous transforms (dynamic outro as user scrolls away on desktop)
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 480], [0, -75]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.15]);
  const textScale = useTransform(scrollY, [0, 480], [1, 0.96]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const display = canvas.getContext('2d', { alpha: false });
    if (!display) return;

    const sampleCanvas = document.createElement('canvas');
    sampleRef.current = sampleCanvas;
    const sample = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!sample) return;

    let rafId = 0;
    let running = true;
    let lastDraw = 0;
    let inView = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      display.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width < 2 || height < 2) return;

      // Pure clean paper background (matches LINKED! white design system)
      display.fillStyle = '#F9F9FB';
      display.fillRect(0, 0, width, height);

      const isMobileView = width < 768;
      const cellW = isMobileView ? 9 : CELL_W;
      const cellH = isMobileView ? 10 : CELL_H;

      // Downsample video to kinetic matrix grid
      const cols = Math.max(16, Math.floor(width / cellW));
      const rows = Math.max(12, Math.floor(height / cellH));
      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      // Preserve video aspect ratio (object-fit: cover logic) to prevent stretching on mobile
      const vWidth = video.videoWidth || 1920;
      const vHeight = video.videoHeight || 1080;
      const vRatio = vWidth / vHeight;
      const canvasRatio = width / height;

      let sx = 0;
      let sy = 0;
      let sWidth = vWidth;
      let sHeight = vHeight;

      if (canvasRatio > vRatio) {
        // Screen is wider than video (desktop/ultrawide)
        sHeight = vWidth / canvasRatio;
        sy = (vHeight - sHeight) / 2;
      } else {
        // Screen is taller than video (mobile portrait)
        sWidth = vHeight * canvasRatio;
        sx = (vWidth - sWidth) / 2;
      }

      sample.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, cols, rows);

      let pixels: Uint8ClampedArray;
      try {
        pixels = sample.getImageData(0, 0, cols, rows).data;
      } catch {
        return;
      }

      // Automatically cycle through 3 kinetic modes synchronized with the 12s video loop:
      // 0-4s: Halftone Dots, 4-8s: ASCII Characters, 8-12s: Luminous Pixel Squares
      const currentTime = video.currentTime % 12;
      const mode = Math.floor(currentTime / 4); // 0 | 1 | 2

      // Spatial offsets: on desktop push right, on mobile position slightly below header text
      const centerOffsetX = width >= 1024 ? Math.floor(width * 0.16) : 0;
      const centerOffsetY = isMobileView ? Math.floor(height * 0.08) : 0;

      display.font = isMobileView
        ? `11px "Geist Mono", ui-monospace, monospace`
        : `10px "Geist Mono", ui-monospace, monospace`;
      display.textBaseline = 'middle';
      display.textAlign = 'center';

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const i = (y * cols + x) * 4;
          // Calculate surface luminance of the lit 3D stainless steel bracelet
          const luma = (0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2]) / 255;

          // Skip background threshold (video background is black, so luma < 0.04)
          if (luma < 0.04) continue;

          const posX = x * cellW + cellW / 2 + centerOffsetX;
          const posY = y * cellH + cellH / 2 + centerOffsetY;

          // Don't draw past screen boundary
          if (posX > width + cellW || posY > height + cellH) continue;

          const alpha = Math.min(1, 0.22 + luma * 0.82);

          if (mode === 0) {
            // Mode 0: Halftone Dots
            const radius = Math.sqrt(luma) * (cellW * (isMobileView ? 0.44 : 0.5));
            display.fillStyle = `rgba(18, 18, 18, ${alpha})`;
            display.beginPath();
            display.arc(posX, posY, radius, 0, Math.PI * 2);
            display.fill();
          } else if (mode === 1) {
            // Mode 1: ASCII Characters
            const shaped = Math.pow(luma, 0.6);
            const rampIdx = Math.floor(shaped * (ASCII_RAMP.length - 1));
            const char = ASCII_RAMP[rampIdx];
            if (char && char !== ' ') {
              display.fillStyle = `rgba(18, 18, 18, ${alpha})`;
              display.fillText(char, posX, posY);
            }
          } else {
            // Mode 2: Luminous Pixel Squares
            const size = (0.22 + Math.sqrt(luma) * 0.74) * cellW;
            display.fillStyle = `rgba(18, 18, 18, ${alpha})`;
            display.fillRect(posX - size / 2, posY - size / 2, size, size);
          }
        }
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      if (reduceMotion || !inView || video.paused || video.readyState < 2) return;

      if (video.currentTime >= 11.95) {
        video.currentTime = 0;
      }

      if (now - lastDraw < FRAME_MS) return;
      lastDraw = now;
      drawFrame();
    };

    const onPlay = () => {
      if (!running) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      void video.play().catch(() => undefined);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (!inView) {
          video.pause();
          return;
        }
        void video.play().catch(() => undefined);
      },
      { threshold: 0.12 }
    );

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    video.addEventListener('play', onPlay);
    video.addEventListener('loadeddata', drawFrame);

    void video.play().catch(() => undefined);
    rafId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('loadeddata', drawFrame);
      video.pause();
      sampleRef.current = null;
    };
  }, [reduceMotion]);

  return (
    <section className="relative isolate min-h-[85dvh] sm:min-h-[88vh] w-full overflow-hidden bg-paper text-ink">
      {/* Offscreen / Hidden source video element providing 24-60 FPS frames */}
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
        src={VIDEO_SRC}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      />

      {/* 60FPS Halftone / ASCII / Pixel Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Dynamic paper gradient overlay: vertical on mobile so typography remains 100% legible, horizontal on desktop */}
      <div className="pointer-events-none absolute inset-0 lg:w-3/5 bg-gradient-to-b from-paper/95 via-paper/85 to-paper/30 lg:bg-gradient-to-r lg:from-paper lg:via-paper/85 lg:to-transparent z-[5]" />

      <div className="relative z-10 mx-auto flex min-h-[85dvh] sm:min-h-[88vh] w-full max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 md:px-10">
        <motion.div
          style={reduceMotion || isMobile ? undefined : { y: textY, opacity: textOpacity, scale: textScale }}
          className="max-w-xl space-y-4 sm:space-y-6"
        >
          {/* Headline Split-line Mask for dramatic typographic reveal */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-ink">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                LINKED!
              </motion.span>
            </span>
            <span className="mt-1.5 sm:mt-2 block font-serif text-2xl font-normal italic text-neutral-800 sm:text-4xl md:text-5xl overflow-hidden">
              <motion.span
                className="block"
                initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Modular steel, your story.
              </motion.span>
            </span>
          </h1>

          {/* Masked Paragraph entry */}
          <div className="overflow-hidden">
            <motion.p
              initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-neutral-600"
            >
              Presisi modular baja 316L Italia. Pasang dan tukar charm tanpa alat langsung di atas kanvas 18-slot kustommu.
            </motion.p>
          </div>

          {/* Staggered Spring CTA Buttons: full width on mobile for easy tap targets */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 sm:pt-3 w-full sm:w-auto"
          >
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
              onClick={() => {
                soundEngine.playClick();
                scrollToId('customizer');
              }}
            >
              <Sparkles className="h-4 w-4 mr-1 text-blush" />
              Build Your Bracelet
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="bg-white text-ink hover:bg-neutral-50 shadow-xs w-full sm:w-auto justify-center"
              onClick={() => {
                soundEngine.playClick();
                scrollToId('catalog');
              }}
            >
              Explore Charms
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AsciiHalftoneHero;
