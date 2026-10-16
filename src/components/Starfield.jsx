import React, { useEffect, useRef } from 'react';

/**
 * Lightweight ambient starfield canvas with subtle twinkle and space dust.
 * Automatically throttles rendering and checks prefers-reduced-motion.
 */
export const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mediaQuery.matches;

    // Generate stars
    const starCount = Math.min(Math.floor((width * height) / 12000), 90);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speed: (Math.random() * 0.15 + 0.05) * (isReduced ? 0 : 1),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.8 ? 200 : Math.random() > 0.6 ? 45 : 0 // slight blue or gold tint
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint nebula glow
      const radialGrad = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        20,
        width * 0.8,
        height * 0.2,
        width * 0.45
      );
      radialGrad.addColorStop(0, 'rgba(103, 201, 245, 0.04)');
      radialGrad.addColorStop(0.5, 'rgba(244, 88, 88, 0.02)');
      radialGrad.addColorStop(1, 'rgba(11, 16, 32, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!isReduced) {
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
          star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.008;
          star.alpha = Math.max(0.15, Math.min(0.9, star.alpha));
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (star.hue === 200) {
          ctx.fillStyle = `rgba(103, 201, 245, ${star.alpha})`;
        } else if (star.hue === 45) {
          ctx.fillStyle = `rgba(255, 209, 102, ${star.alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 245, 232, ${star.alpha})`;
        }

        ctx.fill();
      }

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="space-starfield-canvas"
      aria-hidden="true"
    />
  );
};
