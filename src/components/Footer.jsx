import React from 'react';
import { ArrowUp, Mail, MessageSquare } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Top Tier: Brand & Back to Top */}
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <div className="brand-logo footer-logo">
              <div className="brand-visor-mark" aria-hidden="true">
                <span className="brand-visor-lens"></span>
              </div>
              <div className="brand-text-group">
                <span className="brand-title">{EVENT_CONFIG.title}</span>
                <span className="brand-subtitle">{EVENT_CONFIG.theme}</span>
              </div>
            </div>
            <p className="footer-tagline-quote">
              "{EVENT_CONFIG.tagline}"
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm back-to-top-btn"
            aria-label="Scroll back to top"
          >
            <span>Back to Bridge</span>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Middle Tier: Grid of Details & Socials */}
        <div className="footer-middle-grid">
          {/* Organizer Info */}
          <div className="footer-col">
            <h4 className="footer-heading">Organized By</h4>
            <p className="footer-club-name">{EVENT_CONFIG.organizer.clubName}</p>
            <p className="footer-club-dept">{EVENT_CONFIG.organizer.department}</p>
            <a
              href={`mailto:${EVENT_CONFIG.organizer.email}`}
              className="footer-email-link"
            >
              <Mail size={14} aria-hidden="true" />
              <span>{EVENT_CONFIG.organizer.email}</span>
            </a>
          </div>

          {/* Quick Section Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Bridge & Launch</a></li>
              <li><a href="#briefing">Mission Directive</a></li>
              <li><a href="#missions">Objectives</a></li>
              <li><a href="#schedule">Flight Timeline</a></li>
              <li><a href="#rules">Participation Code</a></li>
              <li><a href="#register">Recruitment Terminal</a></li>
            </ul>
          </div>

          {/* Community Channels */}
          <div className="footer-col">
            <h4 className="footer-heading">Comm Channels</h4>
            <p className="footer-channels-note">Connect with fellow crewmates before flight:</p>
            <div className="footer-social-icons">
              <a
                href={EVENT_CONFIG.organizer.discordUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-box"
                aria-label="Discord Community (Placeholder)"
                title="Discord Community"
              >
                <MessageSquare size={18} />
              </a>
              <a
                href={EVENT_CONFIG.organizer.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-box"
                aria-label="Instagram Page (Placeholder)"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href={EVENT_CONFIG.organizer.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="social-icon-box"
                aria-label="GitHub Repository (Placeholder)"
                title="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                  <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
              </a>
            </div>
            <span className="social-placeholder-tag">Social links are club placeholders</span>
          </div>
        </div>

        {/* Bottom Tier: Disclaimers & Copyright */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            &copy; {CURRENT_YEAR} {EVENT_CONFIG.organizer.clubName}. All rights reserved.
          </p>
          <p className="footer-disclaimer">
            Disclaimer: Among Us is a registered trademark of Innersloth LLC. This student event
            is an independent, collegiate non-profit fan initiative and is not affiliated with,
            endorsed by, or sponsored by Innersloth LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};
