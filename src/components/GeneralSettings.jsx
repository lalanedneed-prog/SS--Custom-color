import React, { useState, useRef, useEffect } from 'react';
import { Input, Switch, Select, Tooltip, TooltipProvider } from '@sparrowengg/twigs-react';

function SettingsSection({ title, children }) {
  return (
    <div className="gs-section">
      <h3 className="gs-section-title">{title}</h3>
      {children}
    </div>
  );
}

function SettingsToggleRow({ label, info, checked, onChange }) {
  return (
    <div className="gs-toggle-row">
      <span className="gs-toggle-label">
        {label}
        {info && (
          <TooltipProvider delayDuration={0}>
            <Tooltip content={info} side="right" sideOffset={6} size="sm">
              <span className="gs-info-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </span>
            </Tooltip>
          </TooltipProvider>
        )}
      </span>
      <Switch size="md" checked={checked} onChange={val => onChange(val)} />
    </div>
  );
}

const FOLDER_OPTIONS = [
  { label: 'General', value: 'general' },
  { label: 'HR', value: 'hr' },
  { label: 'Product', value: 'product' },
];
const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

export default function GeneralSettings({ onOpenThrottling }) {
  const [folder, setFolder] = useState({ label: 'General', value: 'general' });
  const [language, setLanguage] = useState({ label: 'Hindi', value: 'hi' });
  const [limitResponses, setLimitResponses] = useState(false);
  const [throttlingOn, setThrottlingOn] = useState(false);
  const [botDetection, setBotDetection] = useState(false);
  const [thumbStyle, setThumbStyle] = useState({ opacity: 0, top: 0, height: 0 });
  const bodyRef = useRef(null);
  const timerRef = useRef(null);

  const handleThrottlingChange = (val) => {
    setThrottlingOn(val);
    if (val) onOpenThrottling();
  };

  const updateThumb = () => {
    const el = bodyRef.current;
    if (!el) return;
    const ratio = el.clientHeight / el.scrollHeight;
    if (ratio >= 1) { setThumbStyle(s => ({ ...s, opacity: 0 })); return; }
    const thumbH = Math.max(ratio * el.clientHeight, 40);
    const thumbTop = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * (el.clientHeight - thumbH);
    setThumbStyle({ opacity: 1, top: thumbTop, height: thumbH });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setThumbStyle(s => ({ ...s, opacity: 0 })), 1000);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="gs-panel">
      <div className="gs-header">
        <h2 className="gs-title">General Settings</h2>
      </div>

      <div className="gs-body-wrap">
        <div
          className="gs-body"
          ref={bodyRef}
          onScroll={updateThumb}
        >
        {/* Survey Folder + Default Language card */}
        <div className="gs-card">
          <div className="gs-field-group">
            <label className="gs-field-label">Survey Folder</label>
            <Select
              size="lg"
              value={folder}
              onChange={opt => setFolder(opt)}
              options={FOLDER_OPTIONS}
              css={{ width: '100%' }}
            />
          </div>

          <div className="gs-field-group" style={{ marginBottom: 0 }}>
            <label className="gs-field-label">Default Language</label>
            <Select
              size="lg"
              value={language}
              onChange={opt => setLanguage(opt)}
              options={LANGUAGE_OPTIONS}
            css={{ width: '100%' }}
          />
          </div>
        </div>

        {/* Survey URL */}
        <SettingsSection title="Survey URL">
          <div className="gs-card" style={{ marginBottom: 0 }}>
            <div className="gs-url-group">
              <div className="gs-url-label-row">
                <span className="gs-url-domain">pathfinder.surveysparrow.com/s</span>
                <span className="gs-url-tag">LONG URL</span>
              </div>
              <Input
                size="lg"
                defaultValue="equipment-needs-approvel-and-fulfilment-survey"
                css={{ width: '100%', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
            <div className="gs-url-group" style={{ marginTop: '12px' }}>
              <div className="gs-url-label-row">
                <span className="gs-url-domain">sprw.io</span>
                <span className="gs-url-tag">SHORT URL</span>
              </div>
              <Input
                size="lg"
                placeholder=""
                css={{ width: '100%', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Set quotas */}
        <SettingsSection title="Set quotas">
          <div className="gs-card" style={{ marginBottom: 0 }}>
            <SettingsToggleRow
              label="Limit the number of responses"
              checked={limitResponses}
              onChange={setLimitResponses}
            />
          </div>
        </SettingsSection>

        {/* Throttling */}
        <SettingsSection title="Throttling">
          <div className="gs-card" style={{ marginBottom: 0 }}>
            <SettingsToggleRow
              label="Survey throttling"
              info="Define how often contacts receive invites for the survey."
              checked={throttlingOn}
              onChange={handleThrottlingChange}
            />
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection title="Security">
          <div className="gs-card" style={{ marginBottom: 0 }}>
            <SettingsToggleRow
              label="Bot detection"
              info="Automatically detect and filter bot responses"
              checked={botDetection}
              onChange={setBotDetection}
            />
          </div>
        </SettingsSection>
        </div>
        {/* Custom overlay scrollbar */}
        <div className="gs-scrollbar-track">
          <div
            className="gs-scrollbar-thumb"
            style={{
              opacity: thumbStyle.opacity,
              top: thumbStyle.top,
              height: thumbStyle.height,
            }}
          />
        </div>
      </div>
    </div>
  );
}
