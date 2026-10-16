import React, { useState } from 'react';
import { AlertOctagon, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

export const EmergencyBanner = () => {
  const [meetingActive, setMeetingActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play a safe synthesized sci-fi alert chime using Web Audio API
  const playAlertSfx = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {
      // AudioContext may be blocked or unsupported; silent fallback
    }
  };

  const handleTriggerMeeting = () => {
    setMeetingActive(true);
    playAlertSfx();
    setTimeout(() => {
      setMeetingActive(false);
    }, 4000);
  };

  return (
    <div className={`emergency-action-bar ${meetingActive ? 'meeting-triggered' : ''}`}>
      <div className="bar-container">
        <div className="bar-info-group">
          <div className="bar-hazard-stripes" aria-hidden="true"></div>
          <div className="bar-text-content">
            <span className="bar-label">
              <ShieldAlert size={15} className="bar-alert-icon" aria-hidden="true" />
              SABOTAGE DETECTION RADAR
            </span>
            <p className="bar-subtext">
              {meetingActive
                ? 'EMERGENCY MEETING CALLED! All crewmates proceed to Central Amphitheater immediately!'
                : 'Suspect an impostor in your quadrant? Test the emergency button below.'}
            </p>
          </div>
        </div>

        <div className="bar-controls-group">
          {/* Sound Toggle */}
          <button
            type="button"
            className="sound-toggle-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Disable alert sound' : 'Enable alert sound'}
            title={soundEnabled ? 'Alert chime active' : 'Alert chime muted'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="sound-toggle-text">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>

          {/* Emergency Button */}
          <button
            type="button"
            className={`emergency-trigger-btn ${meetingActive ? 'btn-active-alert' : ''}`}
            onClick={handleTriggerMeeting}
            disabled={meetingActive}
          >
            <AlertOctagon size={18} aria-hidden="true" />
            <span>{meetingActive ? 'SIREN ACTIVE' : 'EMERGENCY BUTTON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
