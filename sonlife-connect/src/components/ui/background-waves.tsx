"use client";

import { useEffect, useRef } from "react";

interface BackgroundWavesProps {
  className?: string;
}

export function BackgroundWaves({ className = "" }: BackgroundWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Animation variables
    let animationFrameId: number;
    let time = 0;
    const spheres: { x: number; y: number; size: number; color: string }[] = [];

    // Create floating spheres
    for (let i = 0; i < 8; i++) {
      spheres.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        color: i % 2 === 0 ? "#D4AF37" : "#1E63B0" // Gold and Blue
      });
    }

    // Wave parameters
    const waves = [
      { amplitude: 50, frequency: 0.02, speed: 0.001, color: "#1E63B0" }, // Blue
      { amplitude: 40, frequency: 0.015, speed: 0.002, color: "#D4AF37" }, // Gold
      { amplitude: 60, frequency: 0.01, speed: 0.0015, color: "#FFFFFF" } // White
    ];

    const drawWave = (
      startY: number,
      amplitude: number,
      frequency: number,
      phase: number,
      color: string,
      alpha: number = 0.3
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, startY);

      for (let x = 0; x < canvas.width; x++) {
        const y = startY + amplitude * Math.sin(x * frequency + phase);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    };

    const drawSphere = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.6;
      ctx.fill();

      // Add glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, `${color}33`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(1, "#f8f9fa");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave, index) => {
        const baseY = canvas.height * (0.3 + index * 0.2);
        for (let i = 0; i < 3; i++) {
          drawWave(
            baseY + i * 20,
            wave.amplitude,
            wave.frequency,
            time * wave.speed + i * Math.PI / 4,
            wave.color,
            0.1 - i * 0.02
          );
        }
      });

      // Animate spheres
      spheres.forEach(sphere => {
        sphere.x += Math.sin(time * 0.001) * 0.5;
        sphere.y += Math.cos(time * 0.001) * 0.5;
        drawSphere(sphere.x, sphere.y, sphere.size, sphere.color);
      });

      time += 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        zIndex: -1,
        opacity: 0.8,
      }}
    />
  );
} 