import React, { useState } from 'react';
import { ShieldCheck, HelpCircle, ChevronDown, CheckSquare } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventConfig';

export const ParticipationRules = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <section id="rules" className="rules-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>DIRECTIVES & PROTOCOLS</span>
          </div>
          <h2 className="section-title">CREW PARTICIPATION CODE</h2>
          <p className="section-subtitle">
            Essential guidelines ensuring a fair, thrilling, and safe live event for all recruits.
          </p>

          <div className="sample-disclaimer-pill" role="note">
            Sample guidelines drafted for club safety review. Final rules will be ratified by event marshals.
          </div>
        </div>

        {/* Rules Grid */}
        <div className="rules-grid">
          {EVENT_CONFIG.rules.map((rule) => (
            <div key={rule.number} className="rule-card">
              <div className="rule-card-top">
                <span className="rule-number-tag">RULE #{rule.number}</span>
                <CheckSquare size={16} className="rule-check-icon" aria-hidden="true" />
              </div>
              <h3 className="rule-card-title">{rule.title}</h3>
              <p className="rule-card-detail">{rule.detail}</p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="rules-faq-wrapper">
          <div className="faq-header-sub">
            <HelpCircle size={18} className="faq-icon" aria-hidden="true" />
            <h3 className="faq-title">Frequently Asked Questions</h3>
          </div>

          <div className="faq-accordion-list">
            {EVENT_CONFIG.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.q} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} aria-hidden="true" />
                  </button>

                  <div
                    id={`faq-answer-${idx}`}
                    className="faq-answer-collapse"
                    hidden={!isOpen}
                  >
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
