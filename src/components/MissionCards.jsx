import React, { useState } from 'react';
import { Eye, BellRing, Wrench, ChevronRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const MissionCards = () => {
  const [activeCardId, setActiveCardId] = useState(null);

  // Icon mapping
  const iconMap = {
    'mission-impostor': Eye,
    'mission-emergency': BellRing,
    'mission-survive': Wrench
  };

  return (
    <section id="missions" className="missions-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <Flame size={14} aria-hidden="true" />
            <span>PROPOSED PROTOCOLS</span>
          </div>
          <h2 className="section-title">MISSION OBJECTIVES</h2>
          <p className="section-subtitle">
            Three core activity pillars designed to test your deduction, speechcraft,
            and rapid cooperative problem-solving under pressure.
          </p>
          <div className="proposed-note-tag" role="note">
            Notice: These are proposed event activities pending final club organizer review.
          </div>
        </div>

        {/* Mission Cards Grid */}
        <div className="missions-grid">
          {EVENT_CONFIG.missions.map((mission) => {
            const Icon = iconMap[mission.id] || ShieldCheck;
            const isHovered = activeCardId === mission.id;

            return (
              <div
                key={mission.id}
                className={`mission-card mission-card-${mission.accent} ${isHovered ? 'card-hovered' : ''}`}
                onMouseEnter={() => setActiveCardId(mission.id)}
                onMouseLeave={() => setActiveCardId(null)}
                tabIndex={0}
                onFocus={() => setActiveCardId(mission.id)}
                onBlur={() => setActiveCardId(null)}
              >
                {/* Tactical Top Ribbon */}
                <div className="card-top-ribbon">
                  <span className="card-callsign">{mission.callsign}</span>
                  <span className={`card-tag-pill tag-${mission.accent}`}>
                    {mission.tag}
                  </span>
                </div>

                {/* Card Icon Spotlight */}
                <div className={`card-icon-halo halo-${mission.accent}`}>
                  <Icon size={32} className="card-main-icon" aria-hidden="true" />
                </div>

                {/* Title & Description */}
                <h3 className="card-heading">{mission.title}</h3>
                <p className="card-desc">{mission.description}</p>

                {/* Tactical Sub-task List */}
                <div className="card-tasks-block">
                  <span className="tasks-header-label">ENGAGEMENT TASKS:</span>
                  <ul className="task-type-list">
                    {mission.taskTypes.map((task) => (
                      <li key={task} className="task-item">
                        <CheckCircle2 size={14} className={`task-check-icon icon-${mission.accent}`} aria-hidden="true" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Micro-CTA */}
                <div className="card-footer-action">
                  <span className="action-hint">Sector Clearance Level 1</span>
                  <ChevronRight size={16} className="card-arrow-icon" aria-hidden="true" />
                </div>

                {/* Ambient Corner Bracket */}
                <div className="card-corner-bracket" aria-hidden="true"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
