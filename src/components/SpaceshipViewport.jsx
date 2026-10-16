import React, { useEffect, useRef } from 'react';

/**
 * SpaceshipViewport Component
 * Renders an immersive sci-fi perspective looking out the spaceship's
 * observation deck / cockpit bridge into deep space.
 * 
 * Features:
 * - Dynamic Starfield with cosmic nebula clouds and twinkling stars
 * - Looming ringed planet / celestial body with glowing atmospheric rim
 * - Multi-pane spaceship cockpit bulkhead window frame with angled titanium struts
 * - Cockpit window glass glare streaks and hexagonal shield grid
 * - Holographic HUD flight vectors & orbital telemetry overlaid on the glass
 * - Lower dashboard pilot console with pulsing system indicators
 * - Fully accessible and automatically throttled for prefers-reduced-motion
 */
export const SpaceshipViewport = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mediaQuery.matches;

    // Stars generation
    const starCount = Math.min(Math.floor((width * height) / 10000), 110);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: (Math.random() * 0.12 + 0.04) * (isReduced ? 0 : 1),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.75 ? 200 : Math.random() > 0.5 ? 45 : 340
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient
      const spaceGrad = ctx.createLinearGradient(0, 0, 0, height);
      spaceGrad.addColorStop(0, '#050813');
      spaceGrad.addColorStop(0.5, '#080D1F');
      spaceGrad.addColorStop(1, '#050711');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Colorful Cosmic Nebula Dust
      // 1. Cyan/Blue Nebula Cloud (Starboard side)
      const nebula1 = ctx.createRadialGradient(
        width * 0.82,
        height * 0.22,
        30,
        width * 0.82,
        height * 0.22,
        width * 0.45
      );
      nebula1.addColorStop(0, 'rgba(103, 201, 245, 0.12)');
      nebula1.addColorStop(0.4, 'rgba(88, 140, 244, 0.06)');
      nebula1.addColorStop(1, 'rgba(5, 8, 19, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // 2. Magenta/Red Sabotage Glow Nebula (Port side)
      const nebula2 = ctx.createRadialGradient(
        width * 0.18,
        height * 0.65,
        20,
        width * 0.18,
        height * 0.65,
        width * 0.4
      );
      nebula2.addColorStop(0, 'rgba(244, 88, 88, 0.08)');
      nebula2.addColorStop(0.5, 'rgba(180, 50, 100, 0.03)');
      nebula2.addColorStop(1, 'rgba(5, 8, 19, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw and animate stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!isReduced) {
          star.y -= star.speed;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
          star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.007;
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
    <div className="spaceship-viewport-container" aria-hidden="true">
      {/* Dynamic Cosmic Space Canvas */}
      <canvas ref={canvasRef} className="space-starfield-canvas" />

      {/* Looming Sci-Fi Celestial Planet (Seen outside window) */}
      <div className="viewport-planet-system">
        <div className="viewport-planet-body">
          <div className="planet-atmosphere-glow"></div>
          <div className="planet-crescent-shadow"></div>
          {/* Planet Ring System */}
          <div className="planet-rings"></div>
        </div>
      </div>

      {/* Cockpit Window Glare & Sheen (Angle reflection on reinforced glass) */}
      <div className="cockpit-glass-glare"></div>

      {/* Holographic Tactical Flight Grid on Glass */}
      <div className="cockpit-hud-overlay">
        <div className="hud-crosshair-center">
          <span className="reticle-line horiz"></span>
          <span className="reticle-line vert"></span>
          <span className="reticle-circle"></span>
        </div>

        <div className="hud-telemetry-corner top-left">
          <span className="hud-code">NAV_SYS // SUB-LIGHT V: 0.74c</span>
          <span className="hud-code">ORBITAL SECTOR: SKELD-7</span>
        </div>

        <div className="hud-telemetry-corner top-right">
          <span className="hud-code">RADAR: 1 ANOMALY DETECTED</span>
          <span className="hud-code">O2 BUFFER: 98.4% STABLE</span>
        </div>

        <div className="hud-pitch-ladder">
          <span className="pitch-bar">-- 10 --</span>
          <span className="pitch-bar primary">--- 00 ---</span>
          <span className="pitch-bar">-- -10 --</span>
        </div>
      </div>

      {/* Spaceship Observation Deck Window Frame (Bulkheads & Struts) */}
      <div className="cockpit-bulkhead-frame">
        {/* Top Canopy Arch */}
        <div className="bulkhead-canopy-top">
          <div className="bulkhead-seam-line"></div>
          <div className="bulkhead-rivets-row">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

        {/* Angled Titanium Struts (Pillars forming 3 panoramic windows) */}
        <div className="bulkhead-strut strut-left">
          <div className="strut-inner-brace"></div>
          <div className="strut-indicator-led led-green"></div>
        </div>

        <div className="bulkhead-strut strut-right">
          <div className="strut-inner-brace"></div>
          <div className="strut-indicator-led led-red"></div>
        </div>

        {/* Lower Pilot Console & Dashboard Bulkhead Silhouette */}
        <div className="cockpit-lower-dashboard">
          <div className="dashboard-bevel-edge"></div>
          <div className="dashboard-panel-controls">
            <div className="dash-led-group">
              <span className="dash-led-dot green"></span>
              <span className="dash-led-dot amber"></span>
              <span className="dash-led-dot blue"></span>
            </div>
            <span className="dashboard-callsign">BRIDGE CONSOLE // THE SKELD OBS-DECK</span>
            <div className="dash-radar-sweep-mini">
              <span className="sweep-beam"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
