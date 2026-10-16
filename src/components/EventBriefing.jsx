import React from 'react';
import { Terminal, Users, Cpu, ShieldCheck, Award, Radio } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const EventBriefing = () => {
  const { briefing } = EVENT_CONFIG;

  const icons = [Users, Cpu, ShieldCheck, Award];

  return (
    <section id="briefing" className="briefing-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <Terminal size={14} aria-hidden="true" />
            <span>{briefing.badge}</span>
          </div>
          <h2 className="section-title">{briefing.headline}</h2>
          <p className="section-subtitle">
            An adrenaline-fueled collision of live puzzle solving, high-stakes campus navigation,
            and intense social deception.
          </p>
        </div>

        {/* Mission Control Terminal Overview */}
        <div className="briefing-terminal-card">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="terminal-title">TERMINAL // SYSTEM_LOG // BRIEFING_07.TXT</div>
            <div className="terminal-status-online">
              <Radio size={12} className="pulse-icon" /> ONLINE
            </div>
          </div>

          <div className="terminal-body">
            <div className="terminal-code-row">
              <span className="terminal-prompt">$</span>
              <span className="terminal-cmd">cat /mission/directive.log</span>
            </div>

            <p className="terminal-narrative">
              {briefing.summary}
            </p>

            <div className="terminal-format-grid">
              <div className="format-pillar">
                <span className="pillar-num">01</span>
                <h3 className="pillar-title">What You'll Do</h3>
                <p className="pillar-text">
                  Navigate campus task zones, scan diagnostic QR markers, complete real-world
                  wiring and timing mini-games, and deduce which crewmates are faking reports.
                </p>
              </div>

              <div className="format-pillar">
                <span className="pillar-num">02</span>
                <h3 className="pillar-title">Who Can Join</h3>
                <p className="pillar-text">
                  All college students from every department and year are invited. No technical
                  or gaming background needed—just curiosity and observation skills.
                </p>
              </div>

              <div className="format-pillar">
                <span className="pillar-num">03</span>
                <h3 className="pillar-title">Event Format</h3>
                <p className="pillar-text">
                  120 students divided into balanced squads of 8–10. Includes 3 timed task rounds,
                  2 emergency deliberation assemblies, and a climactic finale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Matrix */}
        <div className="briefing-highlights-grid">
          {briefing.highlights.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div key={item.label} className="highlight-stat-card">
                <div className="highlight-icon-wrapper">
                  <IconComponent size={20} className="highlight-icon" aria-hidden="true" />
                </div>
                <div className="highlight-content">
                  <span className="highlight-label">{item.label}</span>
                  <span className="highlight-value">{item.value}</span>
                  <p className="highlight-detail">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
