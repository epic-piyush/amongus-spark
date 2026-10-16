import React, { useState, useEffect } from 'react';
import { Menu, X, Radio, UserPlus } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const Navbar = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#briefing' },
    { label: 'Missions', href: '#missions' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Rules', href: '#rules' },
    { label: 'Register', href: '#register', isModalTrigger: true }
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (link.isModalTrigger && onOpenRegister) {
      onOpenRegister();
      return;
    }
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenRegister) {
      onOpenRegister();
    }
  };

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Event Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="brand-logo"
            aria-label={`${EVENT_CONFIG.title} Home`}
          >
            {/* Stylized Visor Mark */}
            <div className="brand-visor-mark" aria-hidden="true">
              <span className="brand-visor-lens"></span>
              <span className="brand-visor-glow"></span>
            </div>
            <div className="brand-text-group">
              <span className="brand-title">{EVENT_CONFIG.title}</span>
              <span className="brand-subtitle">SECTOR 07 • EVENT</span>
            </div>
          </a>

          {/* Live Status Pill */}
          <div className="nav-status-pill desktop-only" title="Event recruitment status">
            <span className="status-dot-pulse"></span>
            <span className="status-pill-text">RECRUITMENT ACTIVE</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-link-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="nav-action-wrapper desktop-only">
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn btn-primary btn-sm nav-cta-btn"
            >
              <UserPlus size={16} aria-hidden="true" />
              <span>Join the Crew</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          id="mobile-navigation-drawer"
          className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mobile-drawer-content">
            <div className="drawer-status-bar">
              <Radio size={15} className="drawer-radio-icon" aria-hidden="true" />
              <span>COMM CHANNEL // SEC-07 ONLINE</span>
            </div>

            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="mobile-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-cta">
              <button
                type="button"
                onClick={handleCtaClick}
                className="btn btn-primary btn-block"
              >
                <UserPlus size={18} aria-hidden="true" />
                <span>Join the Crew Now</span>
              </button>
            </div>

            <p className="mobile-drawer-footer">
              {EVENT_CONFIG.organizer.clubName}
            </p>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop mobile-only"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
