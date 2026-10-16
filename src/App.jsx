import React, { useState, useEffect } from 'react';
import { SpaceshipViewport } from './components/SpaceshipViewport';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EmergencyBanner } from './components/EmergencyBanner';
import { EventBriefing } from './components/EventBriefing';
import { MissionCards } from './components/MissionCards';
import { EventSchedule } from './components/EventSchedule';
import { ParticipationRules } from './components/ParticipationRules';
import { RecruitmentSection } from './components/RecruitmentSection';
import { RegistrationModal } from './components/RegistrationModal';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Auto-open modal if URL hash is #register
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#register') {
        setIsRegisterOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <div className="space-app-root">
      {/* Spaceship Observation Deck Viewport Background */}
      <SpaceshipViewport />

      {/* Sticky Header Navigation */}
      <Navbar onOpenRegister={openRegister} />

      {/* Main Content Sections */}
      <main id="main-content" className="main-content-flow">
        {/* Section 1: Hero */}
        <Hero onOpenRegister={openRegister} />

        {/* Section 2: Interactive Emergency Alert Bar */}
        <EmergencyBanner />

        {/* Section 3: Event Briefing (About & Mission Control) */}
        <EventBriefing />

        {/* Section 4: Mission Objectives */}
        <MissionCards />

        {/* Section 5: Mission Flight Schedule */}
        <EventSchedule />

        {/* Section 6: Participation Rules & FAQs */}
        <ParticipationRules />

        {/* Section 7: Recruitment Terminal Gateway */}
        <RecruitmentSection onOpenModal={openRegister} />
      </main>

      {/* Footer */}
      <Footer onOpenRegister={openRegister} />

      {/* Blurred Backdrop Recruitment Modal */}
      <RegistrationModal isOpen={isRegisterOpen} onClose={closeRegister} />
    </div>
  );
}

export default App;
