import React from 'react';
import { Terminal, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export const RecruitmentSection = ({ onOpenModal }) => {
  return (
    <section id="register" className="registration-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <Terminal size={14} aria-hidden="true" />
            <span>CREW GATEWAY // SEC-07</span>
          </div>
          <h2 className="section-title">JOIN THE CREW</h2>
          <p className="section-subtitle">
            Recruitment is open for all undergraduate & graduate students.
            Access the recruitment terminal to register your clearance and claim your boarding pass.
          </p>
        </div>

        {/* Tactical Access Airlock Card */}
        <div className="recruitment-airlock-card">
          <div className="airlock-header">
            <div className="terminal-leds">
              <span className="terminal-led red"></span>
              <span className="terminal-led yellow"></span>
              <span className="terminal-led blue"></span>
            </div>
            <div className="airlock-status-badge">
              <span className="status-dot-pulse"></span>
              <span className="desktop-only-inline">TERMINAL STATUS: READY FOR DISPATCH</span>
              <span className="mobile-only-inline">STATUS: READY FOR DISPATCH</span>
            </div>
          </div>

          <div className="airlock-body">
            <div className="airlock-grid">
              {/* Left Column: Directive & Specs */}
              <div className="airlock-info">
                <span className="airlock-kicker">CLASSIFIED BRIEFING</span>
                <h3 className="airlock-heading">Sector 07 Spaceport Gateway</h3>
                <p className="airlock-text">
                  Only 120 crew berths are authorized for this planetary operation. Squad assignments,
                  survival kits, and encrypted role cards will be distributed at Terminal B upon presentation
                  of your verified boarding pass.
                </p>

                <div className="airlock-perks-list">
                  <div className="airlock-perk-item">
                    <CheckCircle2 size={16} className="perk-check-icon icon-blue" />
                    <span>Free admission with College Student ID</span>
                  </div>
                  <div className="airlock-perk-item">
                    <CheckCircle2 size={16} className="perk-check-icon icon-gold" />
                    <span>Solo or Squad participation welcome (Squads of 4–8)</span>
                  </div>
                  <div className="airlock-perk-item">
                    <CheckCircle2 size={16} className="perk-check-icon icon-red" />
                    <span>Custom commemorative boarding pass issued immediately</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Access Box */}
              <div className="airlock-action-box">
                <div className="airlock-stats-row">
                  <div className="airlock-stat">
                    <span className="stat-label">BERTH CAPACITY</span>
                    <span className="stat-val">120 Max</span>
                  </div>
                  <div className="airlock-stat">
                    <span className="stat-label">SECURITY LEVEL</span>
                    <span className="stat-val highlight-red">Level 4</span>
                  </div>
                  <div className="airlock-stat">
                    <span className="stat-label">FLIGHT DATE</span>
                    <span className="stat-val highlight-gold">Nov 14</span>
                  </div>
                </div>

                <div className="airlock-launch-action">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="btn btn-primary btn-lg btn-block launch-terminal-btn"
                  >
                    <KeyRound size={20} aria-hidden="true" />
                    <span>Open Recruitment Terminal</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>

                  <p className="airlock-note">
                    Click to launch the secure recruitment overlay and obtain your pass.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
