import React, { useState, useEffect } from 'react';
import { Calendar, Users, ArrowRight, ShieldAlert, Compass } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { CrewmateIllustration } from './CrewmateIllustration';

export const Hero = ({ onOpenRegister }) => {
  // Crewmate suit color preview toggle
  const crewColors = [
    { name: 'Red', hex: '#F45858', shadow: '#B82828' },
    { name: 'Cyan', hex: '#67C9F5', shadow: '#2888B8' },
    { name: 'Lime', hex: '#58F486', shadow: '#22A34A' },
    { name: 'Yellow', hex: '#FFD166', shadow: '#C89B2B' },
    { name: 'Purple', hex: '#B26BF4', shadow: '#772DBB' }
  ];
  const [selectedColor, setSelectedColor] = useState(crewColors[0]);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.eventIsoDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Ambient Radial Lights behind Hero */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-container">
        {/* Left Column: Mission Directives & Typography */}
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-badge-row">
            <span className="badge badge-emergency">
              <span className="badge-pulse-beacon" aria-hidden="true"></span>
              {EVENT_CONFIG.statusLabel}
            </span>
            <span className="hero-badge-sub">CODENAME: THE LAST CREWMATE</span>
          </div>

          {/* Oversized Headline */}
          <h1 className="hero-headline">
            TRUST <span className="headline-accent-red">NO ONE.</span>
          </h1>

          {/* Supporting Line */}
          <p className="hero-subhead">
            {EVENT_CONFIG.subtitle}
          </p>

          {/* Event Narrative Description */}
          <p className="hero-description">
            Step aboard our live-action campus spaceship simulation. Team up with fellow
            students to repair compromised reactor systems, analyze telemetry alibis,
            and unmask the saboteurs before the emergency countdown reaches zero.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-actions">
            <button
              type="button"
              onClick={onOpenRegister}
              className="btn btn-primary btn-lg"
            >
              <span>JOIN THE CREW</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <a
              href="#briefing"
              onClick={(e) => scrollToSection(e, 'briefing')}
              className="btn btn-secondary btn-lg"
            >
              <span>EXPLORE THE MISSION</span>
            </a>
          </div>

          {/* Key Event Information Chips */}
          <div className="hero-meta-grid" aria-label="Event Logistics">
            <div className="meta-card">
              <div className="meta-icon-box">
                <Calendar size={18} className="meta-icon icon-gold" aria-hidden="true" />
              </div>
              <div className="meta-info">
                <span className="meta-label">DATE & TIME</span>
                <span className="meta-value">{EVENT_CONFIG.eventDate}</span>
                <span className="meta-sub">{EVENT_CONFIG.eventTime}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon-box">
                <ShieldAlert size={18} className="meta-icon icon-blue" aria-hidden="true" />
              </div>
              <div className="meta-info">
                <span className="meta-label">MISSION FORMAT</span>
                <span className="meta-value">Squads of 8–10</span>
                <span className="meta-sub">Live Tasks & Deliberation</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-icon-box">
                <Users size={18} className="meta-icon icon-red" aria-hidden="true" />
              </div>
              <div className="meta-info">
                <span className="meta-label">CAPACITY</span>
                <span className="meta-value">{EVENT_CONFIG.expectedAttendance}</span>
                <span className="meta-sub">{EVENT_CONFIG.admission}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cinematic Tactical Display & Visual */}
        <div className="hero-visual-column">
          <div className="tactical-hud-frame">
            {/* HUD Corner Accents */}
            <span className="hud-corner top-left" aria-hidden="true"></span>
            <span className="hud-corner top-right" aria-hidden="true"></span>
            <span className="hud-corner bottom-left" aria-hidden="true"></span>
            <span className="hud-corner bottom-right" aria-hidden="true"></span>

            {/* Tactical Header */}
            <div className="hud-header-bar">
              <span className="hud-status-indicator">
                <span className="indicator-led"></span>
                <span>TELEMETRY: LIVE</span>
              </span>
              <span className="hud-coords">ORBIT 42.89 // N-33</span>
            </div>

            {/* Crewmate Centered Stage */}
            <div className="hud-crewmate-stage">
              <div className="crewmate-pedestal-light" aria-hidden="true" />
              <CrewmateIllustration
                color={selectedColor.hex}
                shadowColor={selectedColor.shadow}
                size={270}
                animated={true}
              />

              {/* Color Customizer Pill Selector */}
              <div className="suit-color-picker" aria-label="Choose suit preview color">
                <span className="picker-label">SUIT FREQUENCY:</span>
                <div className="color-dots-row">
                  {crewColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`color-dot-btn ${selectedColor.name === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Preview ${color.name} suit`}
                      title={`${color.name} Suit`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Tactical Mission Countdown */}
            <div className="hud-countdown-panel">
              <div className="countdown-title">
                <Compass size={14} className="countdown-compass-icon" aria-hidden="true" />
                <span>MISSION LAUNCH COUNTDOWN</span>
              </div>
              <div className="countdown-digits-row">
                <div className="countdown-digit-cell">
                  <span className="digit-num">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="digit-unit">DAYS</span>
                </div>
                <span className="digit-separator">:</span>
                <div className="countdown-digit-cell">
                  <span className="digit-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="digit-unit">HOURS</span>
                </div>
                <span className="digit-separator">:</span>
                <div className="countdown-digit-cell">
                  <span className="digit-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="digit-unit">MINS</span>
                </div>
                <span className="digit-separator">:</span>
                <div className="countdown-digit-cell">
                  <span className="digit-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="digit-unit">SECS</span>
                </div>
              </div>
            </div>

            {/* HUD Footer Warning */}
            <div className="hud-footer-warning">
              <ShieldAlert size={14} className="hud-alert-icon" aria-hidden="true" />
              <span>WARNING: 1 UNVERIFIED SIGNAL DETECTED IN QUADRANT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
