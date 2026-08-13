"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MouseGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);

  // Fast & responsive spring for cursor spotlight
  const springX = useSpring(mouseX, { damping: 45, stiffness: 450 });
  const springY = useSpring(mouseY, { damping: 45, stiffness: 450 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseX.set(x - 350);
      mouseY.set(y - 350);

      // Short & instantly dimming light trail queue (max 8 points)
      trailRef.current.push({ x, y, age: 1.0 });
      if (trailRef.current.length > 8) {
        trailRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Canvas particle trail animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailRef.current;
      if (trail.length > 1) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Draw short, tight glowing light line trail
        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];
          const factor = i / trail.length;
          const alpha = factor * p2.age * 0.45;
          const lineWidth = factor * 5 + 1.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = lineWidth;

          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, `rgba(46, 212, 122, ${alpha * 0.4})`);
          gradient.addColorStop(1, `rgba(79, 169, 255, ${alpha})`);

          ctx.strokeStyle = gradient;
          ctx.lineCap = "round";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#2ED47A";
          ctx.stroke();
        }

        // Crisp light dot right at cursor center
        const head = trail[trail.length - 1];
        if (head && head.age > 0) {
          ctx.beginPath();
          ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${head.age * 0.8})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#2ED47A";
          ctx.fill();
        }

        ctx.restore();

        // Fast age decay so trail dims instantly
        for (let i = 0; i < trail.length; i++) {
          trail[i].age -= 0.12;
        }
        trailRef.current = trail.filter((p) => p.age > 0);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Light Trail Canvas overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40"
      />

      {/* Ambient Soft Spotlight Glow */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden mix-blend-screen">
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full opacity-25 blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(46, 212, 122, 0.7) 0%, rgba(79, 169, 255, 0.2) 40%, transparent 70%)",
            x: springX,
            y: springY,
          }}
        />
      </div>
    </>
  );
}
