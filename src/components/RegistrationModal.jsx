import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Send,
  RotateCcw,
  Shield,
  X,
  Sparkles
} from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { CrewmateIllustration } from './CrewmateIllustration';
import { submitRegistrationData } from '../services/registrationService';

export const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    registrationType: 'individual',
    squadName: '',
    suitColor: 'Red',
    dietaryNotes: '',
    agreedToRules: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boardingPass, setBoardingPass] = useState(null);

  const suitColorOptions = [
    { label: 'Emergency Red', value: 'Red', hex: '#F45858', shadow: '#B82828' },
    { label: 'Cyan Specialist', value: 'Cyan', hex: '#67C9F5', shadow: '#2888B8' },
    { label: 'Lime Navigator', value: 'Lime', hex: '#58F486', shadow: '#22A34A' },
    { label: 'Reactor Yellow', value: 'Yellow', hex: '#FFD166', shadow: '#C89B2B' },
    { label: 'Cosmic Purple', value: 'Purple', hex: '#B26BF4', shadow: '#772DBB' }
  ];

  // Lock scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';

      case 'email':
        if (!value.trim()) return 'College email is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address (e.g. student@college.edu).';
        }
        return '';

      case 'department':
        if (!value.trim()) return 'Please enter your branch or department.';
        return '';

      case 'squadName':
        if (formData.registrationType === 'squad' && !value.trim()) {
          return 'Squad / Team name is required for squad registration.';
        }
        return '';

      case 'agreedToRules':
        if (!value) return 'You must agree to the event safety code and rules.';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`modal-field-${firstErrorKey}`);
      if (element) element.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitRegistrationData(formData);
      const chosenSuit = suitColorOptions.find((c) => c.value === formData.suitColor) || suitColorOptions[0];

      setBoardingPass({
        ...formData,
        callsign: result.callsign,
        registeredAt: result.timestamp,
        suit: chosenSuit
      });
    } catch {
      setErrors({ form: 'An error occurred during verification. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBoardingPass(null);
    setFormData({
      fullName: '',
      email: '',
      department: '',
      registrationType: 'individual',
      squadName: '',
      suitColor: 'Red',
      dietaryNotes: '',
      agreedToRules: false
    });
    setErrors({});
  };

  // Close when clicking directly on overlay backdrop
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-recruitment-title"
    >
      <div className="modal-container-panel">
        {/* Terminal Title Bar */}
        <div className="modal-terminal-header">
          <div className="terminal-leds">
            <span className="terminal-led red"></span>
            <span className="terminal-led yellow"></span>
            <span className="terminal-led blue"></span>
          </div>
          <div className="terminal-hud-label" id="modal-recruitment-title">
            STATION: SEC-07 // RECRUITMENT_GATEWAY_V2.1
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close recruitment modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-inner-scroll">
          {!boardingPass ? (
            /* Registration Form */
            <form onSubmit={handleSubmit} noValidate className="terminal-form">
              <div className="modal-headline-block">
                <span className="modal-sub-kicker">
                  <Shield size={14} aria-hidden="true" />
                  AUTHENTICATED ENTRY // QUADRANT-7
                </span>
                <h2 className="modal-title">CREW RECRUITMENT REGISTRY</h2>
                <p className="modal-desc">
                  Enroll for The Skeld interstellar operation. Fill in your operative details below.
                </p>
              </div>

              {errors.form && (
                <div className="form-error-alert" role="alert">
                  <AlertTriangle size={16} aria-hidden="true" />
                  <span>{errors.form}</span>
                </div>
              )}

              <div className="form-grid-two-col">
                {/* Full Name */}
                <div className="form-field-group">
                  <label htmlFor="modal-field-fullName" className="field-label">
                    Full Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-field-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Chen"
                    className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.fullName)}
                    autoComplete="name"
                    required
                  />
                  {errors.fullName && (
                    <span className="field-error-msg" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* College Email */}
                <div className="form-field-group">
                  <label htmlFor="modal-field-email" className="field-label">
                    College Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="modal-field-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@college.edu"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <span className="field-error-msg" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-grid-two-col">
                {/* Department / Major */}
                <div className="form-field-group">
                  <label htmlFor="modal-field-department" className="field-label">
                    Department / Major <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-field-department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Computer Science / Design / Mech"
                    className={`form-input ${errors.department ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.department)}
                    required
                  />
                  {errors.department && (
                    <span className="field-error-msg" role="alert">
                      {errors.department}
                    </span>
                  )}
                </div>

                {/* Participation Mode */}
                <div className="form-field-group">
                  <span className="field-label">Participation Mode</span>
                  <div className="radio-pill-group">
                    <label className={`radio-pill-label ${formData.registrationType === 'individual' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="individual"
                        checked={formData.registrationType === 'individual'}
                        onChange={handleChange}
                      />
                      Solo Crewmate (Match Me)
                    </label>
                    <label className={`radio-pill-label ${formData.registrationType === 'squad' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="squad"
                        checked={formData.registrationType === 'squad'}
                        onChange={handleChange}
                      />
                      Pre-formed Squad
                    </label>
                  </div>
                </div>
              </div>

              {/* Conditional Squad Name */}
              {formData.registrationType === 'squad' && (
                <div className="form-field-group highlight-squad-field">
                  <label htmlFor="modal-field-squadName" className="field-label">
                    Squad / Team Name <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-field-squadName"
                    name="squadName"
                    value={formData.squadName}
                    onChange={handleChange}
                    placeholder="e.g. Electrical Navigators / The Suspects"
                    className={`form-input ${errors.squadName ? 'input-error' : ''}`}
                    aria-invalid={Boolean(errors.squadName)}
                  />
                  {errors.squadName && (
                    <span className="field-error-msg" role="alert">
                      {errors.squadName}
                    </span>
                  )}
                </div>
              )}

              {/* Suit Color Preference */}
              <div className="form-field-group">
                <label htmlFor="modal-field-suitColor" className="field-label">
                  Preferred Suit Aesthetic
                </label>
                <select
                  id="modal-field-suitColor"
                  name="suitColor"
                  value={formData.suitColor}
                  onChange={handleChange}
                  className="form-select"
                >
                  {suitColorOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rules Agreement Checkbox */}
              <div className="form-checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="modal-field-agreedToRules"
                    name="agreedToRules"
                    checked={formData.agreedToRules}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.agreedToRules)}
                  />
                  <span className="custom-checkbox-indicator"></span>
                  <span className="checkbox-label-text">
                    I have read the Crew Participation Code and agree to play honorably with zero harassment or ghost whispering.
                  </span>
                </label>
                {errors.agreedToRules && (
                  <span className="field-error-msg" role="alert">
                    {errors.agreedToRules}
                  </span>
                )}
              </div>

              {/* Form Actions */}
              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg submit-terminal-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner" aria-hidden="true"></span>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      <span>Confirm & Issue Boarding Pass</span>
                    </>
                  )}
                </button>

                <span className="privacy-hint">
                  Encrypted Transponder // Safe & Private: ID required at Terminal B
                </span>
              </div>
            </form>
          ) : (
            /* Crewmate Identity Boarding Pass */
            <div className="demo-pass-card" role="region" aria-label="Crewmate Boarding Pass">
              <div className="demo-pass-success-ribbon">
                <CheckCircle2 size={20} className="pass-success-icon" aria-hidden="true" />
                <span>CREDENTIALS VERIFIED — BOARDING CLEARANCE GRANTED</span>
              </div>

              <div className="pass-content-grid">
                {/* Left Column: Visual Badge */}
                <div className="pass-avatar-box">
                  <CrewmateIllustration
                    color={boardingPass.suit.hex}
                    shadowColor={boardingPass.suit.shadow}
                    size={180}
                    animated={false}
                  />
                  <div className="pass-callsign-pill">
                    CALLSIGN: {boardingPass.callsign}
                  </div>
                </div>

                {/* Right Column: Recruit Credentials */}
                <div className="pass-meta-details">
                  <div className="pass-meta-item">
                    <span className="pass-meta-label">RECRUIT NAME:</span>
                    <span className="pass-meta-val highlight-gold">{boardingPass.fullName}</span>
                  </div>

                  <div className="pass-meta-item">
                    <span className="pass-meta-label">COLLEGE EMAIL:</span>
                    <span className="pass-meta-val">{boardingPass.email}</span>
                  </div>

                  <div className="pass-meta-item">
                    <span className="pass-meta-label">DEPARTMENT:</span>
                    <span className="pass-meta-val">{boardingPass.department}</span>
                  </div>

                  <div className="pass-meta-item">
                    <span className="pass-meta-label">ASSIGNED UNIT:</span>
                    <span className="pass-meta-val">
                      {boardingPass.registrationType === 'squad'
                        ? `Squad "${boardingPass.squadName}"`
                        : 'Solo Recruit (Squad Alpha Allocation)'}
                    </span>
                  </div>

                  <div className="pass-meta-item">
                    <span className="pass-meta-label">REPORT LOCATION:</span>
                    <span className="pass-meta-val">{EVENT_CONFIG.venue}</span>
                  </div>

                  <div className="pass-meta-item">
                    <span className="pass-meta-label">DATE & CHECK-IN:</span>
                    <span className="pass-meta-val">{EVENT_CONFIG.eventDate} @ 17:00</span>
                  </div>

                  <div className="pass-barcode-strip" aria-hidden="true">
                    <div className="fake-barcode-lines"></div>
                    <span className="barcode-number">SEC7-SKELD-{boardingPass.callsign}</span>
                  </div>
                </div>
              </div>

              <div className="pass-action-bar">
                <div className="pass-notice-text">
                  <Sparkles size={14} className="text-gold" aria-hidden="true" />
                  <span>Save this boarding pass! Present at Check-in Terminal B on event day.</span>
                </div>

                <div className="pass-btn-group">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary btn-sm pass-reset-btn"
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    <span>Register Another Recruit</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-primary btn-sm"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
