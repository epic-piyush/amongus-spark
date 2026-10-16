import React from 'react';
import { Clock, CalendarClock, AlertCircle } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const EventSchedule = () => {
  return (
    <section id="schedule" className="schedule-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <CalendarClock size={14} aria-hidden="true" />
            <span>MISSION TIMELINE</span>
          </div>
          <h2 className="section-title">FLIGHT TRAJECTORY & SCHEDULE</h2>
          <p className="section-subtitle">
            Synchronized sequence of live campus phases. Follow the timeline checkpoints
            to ensure your squad arrives at assigned sectors on time.
          </p>

          <div className="schedule-notice-banner" role="note">
            <AlertCircle size={16} className="notice-icon" aria-hidden="true" />
            <span>
              <strong>Organizer Note:</strong> All timestamps and mission phases listed below are
              provisional placeholders for club faculty coordination and approval.
            </span>
          </div>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="timeline-container">
          <div className="timeline-track-line" aria-hidden="true" />

          {EVENT_CONFIG.schedule.map((item, index) => (
            <div key={item.phase} className="timeline-node">
              {/* Checkpoint Marker */}
              <div className="node-marker-wrapper" aria-hidden="true">
                <div className="node-marker-circle">
                  <span className="marker-index">{index + 1}</span>
                </div>
              </div>

              {/* Node Card Content */}
              <div className="node-card">
                <div className="node-card-header">
                  <div className="node-phase-tag">
                    <span className="phase-badge">{item.phase}</span>
                    <span className="phase-category">{item.badge}</span>
                  </div>
                  <div className="node-time-badge">
                    <Clock size={13} aria-hidden="true" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <h3 className="node-title">{item.title}</h3>
                <p className="node-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
