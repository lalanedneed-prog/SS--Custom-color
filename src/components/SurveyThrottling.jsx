import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  Button,
  Input,
  Select,
  IconButton,
  Chip,
} from '@sparrowengg/twigs-react';

const DollarIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const ChipMultiValue = ({ data, removeProps }) => (
  <Chip
    size="md"
    color="default"
    closable
    onClose={removeProps.onClick}
    leftElement={DollarIcon}
    css={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', marginRight: '4px' }}
  >
    {data.label}
  </Chip>
);

const INTERVAL_OPTIONS = ['days', 'weeks', 'months'].map(v => ({ label: v, value: v }));
const ACTION_OPTIONS = [
  { label: 'Exclude from throttling', value: 'exclude' },
  { label: 'Include in throttling', value: 'include' },
];
const EVENT_VARIABLE_OPTIONS = [
  { label: 'ticket_created', value: 'ticket_created' },
  { label: 'ticket_updated', value: 'ticket_updated' },
  { label: 'form_submitted', value: 'form_submitted' },
];

function ConditionRow({ onRemove }) {
  return (
    <div className="st-when-block">
      <div className="st-when-header">
        <span className="st-when-label">When</span>
        <div className="st-when-actions">
          <button className="st-icon-btn" title="Filter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
          </button>
          <button className="st-icon-btn" title="Delete" onClick={onRemove}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="st-condition-chip-row">
        <div className="st-condition-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="st-chip-text">Smart list:</span>
          <span className="st-chip-value">Trial User</span>
        </div>
        <button className="st-add-condition-btn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
      <div className="st-then-row">
        <span className="st-then-label">Then</span>
        <Select
          size="md"
          value={{ label: 'Action: Exclude from throttling', value: 'exclude' }}
          options={ACTION_OPTIONS.map(o => ({ label: `Action: ${o.label}`, value: o.value }))}
          css={{ minWidth: '240px' }}
        />
      </div>
    </div>
  );
}

function ConditionsFields({ label }) {
  const [maxInvites, setMaxInvites] = useState(2);
  const [interval, setIntervalValue] = useState(30);
  const [intervalUnit, setIntervalUnit] = useState({ label: 'days', value: 'days' });
  const [gapDays, setGapDays] = useState(2);

  return (
    <div className="st-conditions-fields">
      {label && <div className="st-other-cases-label">{label}</div>}
      <div className="st-fields-row">
        {/* Max invites + Interval grouped with 8px gap */}
        <div className="st-fields-left">
          <div className="st-field-group">
            <span className="st-field-label">Maximum invites</span>
            <Input
              size="md"
              type="number"
              value={maxInvites}
              onChange={e => setMaxInvites(Number(e.target.value))}
              css={{ width: '134px', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
          <div className="st-field-group">
            <span className="st-field-label">Interval</span>
            <div className="st-interval-wrap">
              <Input
                size="md"
                type="number"
                value={interval}
                onChange={e => setIntervalValue(Number(e.target.value))}
                css={{ width: '56px', fontFamily: 'DM Sans, sans-serif' }}
              />
              <Select
                size="md"
                value={intervalUnit}
                onChange={opt => setIntervalUnit(opt)}
                options={INTERVAL_OPTIONS}
                css={{ width: '80px' }}
              />
            </div>
          </div>
        </div>

        {/* Gap between invites */}
        <div className="st-field-group">
          <span className="st-field-label">Gap between invites</span>
          <div className="st-gap-stepper">
            <IconButton
              variant="ghost"
              color="default"
              size="md"
              shape="squircle"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              }
              onClick={() => setGapDays(d => Math.max(0, d - 1))}
            />
            <span className="st-gap-value">{gapDays} days</span>
            <IconButton
              variant="ghost"
              color="default"
              size="md"
              shape="squircle"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              }
              onClick={() => setGapDays(d => d + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SurveyThrottling({ open, onClose }) {
  const [mode, setMode] = useState('contact');
  const [eventVariable, setEventVariable] = useState(null);
  const [hasException, setHasException] = useState(false);

  return (
    <Dialog open={open} onOpenChange={val => { if (!val) onClose(); }}>
      <DialogContent
        css={{
          width: '600px',
          maxWidth: '95vw',
          borderRadius: '16px',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <DialogHeader
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '64px',
            minHeight: '64px',
            maxHeight: '64px',
            padding: '8px 24px',
            borderBottom: '1px solid #F1F1F1',
          }}
        >
          <DialogTitle css={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1875rem', fontWeight: 700, color: '#111111', margin: 0 }}>
            Survey throttling
          </DialogTitle>
          <DialogClose asChild>
            <IconButton
              variant="ghost"
              color="default"
              size="lg"
              shape="squircle"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              }
              onClick={onClose}
            />
          </DialogClose>
        </DialogHeader>

        <DialogBody css={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Description */}
          <p className="st-description">Define how often contacts receive invites for the survey.</p>

          {/* Mode selector */}
          <div className="st-mode-row">
            <button
              className={`st-mode-card${mode === 'contact' ? ' active' : ''}`}
              onClick={() => setMode('contact')}
            >
              <span className="st-mode-title">Contact based</span>
              <span className="st-mode-desc">E.g. Send max 3 invites every 30 days per contacts.</span>
            </button>
            <button
              className={`st-mode-card${mode === 'event' ? ' active' : ''}`}
              onClick={() => setMode('event')}
            >
              <span className="st-mode-title">Event based</span>
              <span className="st-mode-desc">Eg. Send max 2 invite per ticket every 30 days to a contact.</span>
            </button>
          </div>

          {/* Event variable (event mode only) */}
          {mode === 'event' && (
            <div className="st-event-variable">
              <span className="st-field-label">Event variable</span>
              <Select
                isMulti
                size="lg"
                value={eventVariable ? [eventVariable] : []}
                onChange={opts => setEventVariable(opts && opts.length > 0 ? opts[opts.length - 1] : null)}
                options={EVENT_VARIABLE_OPTIONS}
                placeholder="e.g. Ticket ID, Order ID, Session ID"
                components={{ MultiValue: ChipMultiValue }}
                css={{ width: '100%', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          )}

          {/* Conditions */}
          <div className="st-conditions-section">
            <div className="st-conditions-header">
              <span className="st-conditions-title">Conditions</span>
              <button className="st-link-btn" onClick={() => setHasException(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add exceptions
              </button>
            </div>

            {!hasException ? (
              <ConditionsFields />
            ) : (
              <>
                <ConditionRow onRemove={() => setHasException(false)} />
                <ConditionsFields label="For all other cases" />
              </>
            )}
          </div>
        </DialogBody>

        <DialogFooter
          css={{
            height: '64px',
            minHeight: '64px',
            maxHeight: '64px',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="solid" color="primary" size="lg" onClick={onClose}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
