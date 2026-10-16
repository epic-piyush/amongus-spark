import React, { useState } from 'react';
import {
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Send,
  RotateCcw,
  Shield,
  Info
} from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';
import { CrewmateIllustration } from './CrewmateIllustration';
import { submitRegistrationData } from '../services/registrationService';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    registrationType: 'individual', // 'individual' or 'squad'
    squadName: '',
    suitColor: 'Red',
    dietaryNotes: '',
    agreedToRules: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoPass, setDemoPass] = useState(null);

  const suitColorOptions = [
    { label: 'Emergency Red', value: 'Red', hex: '#F45858', shadow: '#B82828' },
    { label: 'Cyan Specialist', value: 'Cyan', hex: '#67C9F5', shadow: '#2888B8' },
    { label: 'Lime Navigator', value: 'Lime', hex: '#58F486', shadow: '#22A34A' },
    { label: 'Reactor Yellow', value: 'Yellow', hex: '#FFD166', shadow: '#C89B2B' },
    { label: 'Cosmic Purple', value: 'Purple', hex: '#B26BF4', shadow: '#772DBB' }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';

      case 'email':
        if (!value.trim()) return 'College email is required.';
        // Email pattern check
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

    // Clear error dynamically
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive validation
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first erroneous input
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) element.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Call isolated submission function
      const result = await submitRegistrationData(formData);
      const chosenSuit = suitColorOptions.find((c) => c.value === formData.suitColor) || suitColorOptions[0];

      setDemoPass({
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
    setDemoPass(null);
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

  return (
    <section id="register" className="registration-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <Terminal size={14} aria-hidden="true" />
            <span>RECRUITMENT TERMINAL</span>
          </div>
          <h2 className="section-title">JOIN THE CREW</h2>
          <p className="section-subtitle">
            Secure your spot aboard The Skeld before capacity is filled.
            Complete the terminal credentials below.
          </p>
        </div>

        {/* Prominent Demo Notice Banner */}
        <div className="honest-demo-banner" role="status">
          <div className="demo-banner-icon">
            <Info size={18} aria-hidden="true" />
          </div>
          <div className="demo-banner-content">
            <strong className="demo-banner-heading">Interactive Demo Terminal:</strong>
            <p className="demo-banner-text">
              This form demonstrates client-side validation and generates an instant
              crewmate boarding pass. <em>No personal data is transmitted to an external server or saved in a remote database.</em> Club
              organizers will announce when verified college authentication goes live.
            </p>
          </div>
        </div>

        {/* Main Terminal Container */}
        <div className="registration-terminal-panel">
          {/* Terminal Title Bar */}
          <div className="terminal-header-bar">
            <div className="terminal-leds">
              <span className="terminal-led red"></span>
              <span className="terminal-led yellow"></span>
              <span className="terminal-led blue"></span>
            </div>
            <div className="terminal-hud-label">
              STATION: SEC-07 // RECRUIT_GATEWAY_V2.1
            </div>
            <div className="terminal-auth-status">
              <Shield size={13} className="shield-icon" /> SECURE PROTOCOL
            </div>
          </div>

          <div className="terminal-inner-content">
            {!demoPass ? (
              /* Registration Form */
              <form onSubmit={handleSubmit} noValidate className="terminal-form">
                {errors.form && (
                  <div className="form-error-alert" role="alert">
                    <AlertTriangle size={16} aria-hidden="true" />
                    <span>{errors.form}</span>
                  </div>
                )}

                <div className="form-grid-two-col">
                  {/* Full Name */}
                  <div className="form-field-group">
                    <label htmlFor="field-fullName" className="field-label">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Chen"
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      autoComplete="name"
                      required
                    />
                    {errors.fullName && (
                      <span id="error-fullName" className="field-error-msg" role="alert">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* College Email */}
                  <div className="form-field-group">
                    <label htmlFor="field-email" className="field-label">
                      College Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="field-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@college.edu"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      autoComplete="email"
                      required
                    />
                    {errors.email && (
                      <span id="error-email" className="field-error-msg" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-grid-two-col">
                  {/* Department / Major */}
                  <div className="form-field-group">
                    <label htmlFor="field-department" className="field-label">
                      Department / Major <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science / Design / Mech"
                      className={`form-input ${errors.department ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.department)}
                      aria-describedby={errors.department ? 'error-department' : undefined}
                      required
                    />
                    {errors.department && (
                      <span id="error-department" className="field-error-msg" role="alert">
                        {errors.department}
                      </span>
                    )}
                  </div>

                  {/* Registration Mode */}
                  <div className="form-field-group">
                    <span className="field-label">
                      Participation Mode
                    </span>
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
                    <label htmlFor="field-squadName" className="field-label">
                      Squad / Team Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-squadName"
                      name="squadName"
                      value={formData.squadName}
                      onChange={handleChange}
                      placeholder="e.g. Electrical Navigators / The Suspects"
                      className={`form-input ${errors.squadName ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.squadName)}
                      aria-describedby={errors.squadName ? 'error-squadName' : undefined}
                    />
                    {errors.squadName && (
                      <span id="error-squadName" className="field-error-msg" role="alert">
                        {errors.squadName}
                      </span>
                    )}
                  </div>
                )}

                {/* Suit Color Preference */}
                <div className="form-field-group">
                  <label htmlFor="field-suitColor" className="field-label">
                    Preferred Suit Aesthetic
                  </label>
                  <select
                    id="field-suitColor"
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
                      id="field-agreedToRules"
                      name="agreedToRules"
                      checked={formData.agreedToRules}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.agreedToRules)}
                      aria-describedby={errors.agreedToRules ? 'error-agreedToRules' : undefined}
                    />
                    <span className="custom-checkbox-indicator"></span>
                    <span className="checkbox-label-text">
                      I have read the Crew Participation Code and agree to play honorably with zero harassment or ghost whispering.
                    </span>
                  </label>
                  {errors.agreedToRules && (
                    <span id="error-agreedToRules" className="field-error-msg" role="alert">
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
                        <span>Confirm & Generate Boarding Pass</span>
                      </>
                    )}
                  </button>

                  <span className="privacy-hint">
                    Safe & Private: No external tracking cookies or stored backend credentials.
                  </span>
                </div>
              </form>
            ) : (
              /* Demo Success / Crewmate Identity Boarding Pass */
              <div className="demo-pass-card" role="region" aria-label="Demo Crewmate Boarding Pass">
                <div className="demo-pass-success-ribbon">
                  <CheckCircle2 size={20} className="pass-success-icon" aria-hidden="true" />
                  <span>DEMO CREDENTIAL VERIFIED — IDENTITY BADGE GENERATED</span>
                </div>

                <div className="pass-content-grid">
                  {/* Left Column: Visual Badge */}
                  <div className="pass-avatar-box">
                    <CrewmateIllustration
                      color={demoPass.suit.hex}
                      shadowColor={demoPass.suit.shadow}
                      size={180}
                      animated={false}
                    />
                    <div className="pass-callsign-pill">
                      CALLSIGN: {demoPass.callsign}
                    </div>
                  </div>

                  {/* Right Column: Recruit Credentials */}
                  <div className="pass-meta-details">
                    <div className="pass-meta-item">
                      <span className="pass-meta-label">RECRUIT NAME:</span>
                      <span className="pass-meta-val highlight-gold">{demoPass.fullName}</span>
                    </div>

                    <div className="pass-meta-item">
                      <span className="pass-meta-label">COLLEGE EMAIL:</span>
                      <span className="pass-meta-val">{demoPass.email}</span>
                    </div>

                    <div className="pass-meta-item">
                      <span className="pass-meta-label">DEPARTMENT:</span>
                      <span className="pass-meta-val">{demoPass.department}</span>
                    </div>

                    <div className="pass-meta-item">
                      <span className="pass-meta-label">ASSIGNED UNIT:</span>
                      <span className="pass-meta-val">
                        {demoPass.registrationType === 'squad'
                          ? `Squad "${demoPass.squadName}"`
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
                      <span className="barcode-number">SEC7-SKELD-{demoPass.callsign}</span>
                    </div>
                  </div>
                </div>

                <div className="pass-action-bar">
                  <div className="pass-notice-text">
                    <Info size={14} aria-hidden="true" />
                    <span>Take a screenshot for your records! Present this at Check-in Terminal B.</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary btn-sm pass-reset-btn"
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    <span>Register Another Recruit</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
