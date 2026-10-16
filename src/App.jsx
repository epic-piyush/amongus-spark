import React from 'react';
import { Starfield } from './components/Starfield';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EmergencyBanner } from './components/EmergencyBanner';
import { EventBriefing } from './components/EventBriefing';
import { MissionCards } from './components/MissionCards';
import { EventSchedule } from './components/EventSchedule';
import { ParticipationRules } from './components/ParticipationRules';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="space-app-root">
      {/* Ambient Canvas Starfield Background */}
      <Starfield />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="main-content-flow">
        {/* Section 1: Hero */}
        <Hero />

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

        {/* Section 7: Recruitment Terminal (Registration) */}
        <RegistrationForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
