import React, { useRef, useState, useEffect } from 'react';
import { Input, Switch, Checkbox, Button, Tabs, TabsList, TabsTrigger, Slider, Select, Tooltip, TooltipProvider } from '@sparrowengg/twigs-react';
import { HexColorPicker } from 'react-colorful';

function ToggleSwitch({ label, checked, onChange }) {
  const handleChange = (val) => {
    onChange({ target: { checked: val } });
  };
  return (
    <div className="toggle-group">
      <span className="tg-label">{label}</span>
      <div className="tg-row">
        <Switch size="md" checked={checked} onChange={handleChange} />
        <span className="sw-status">{checked ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  );
}

function ColorField({ disabled, defaultColor, hexValue, onHexChange, onPickerChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const pickerColor = hexValue ? '#' + hexValue : defaultColor;

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const field = (
    <div className={`color-field${disabled ? ' color-field--disabled' : ''}`} ref={wrapRef}>
      {!disabled && (
        <div className="color-field-swatch-wrap" onClick={() => setOpen(o => !o)}>
          <span className="color-field-swatch" style={{ background: pickerColor }} />
        </div>
      )}
      {!disabled && <span className="color-field-hash">#</span>}
      <input
        className="color-field-input"
        type="text"
        disabled={disabled}
        value={disabled ? '' : hexValue}
        maxLength={6}
        placeholder="--"
        onChange={e => onHexChange(e.target.value)}
      />
      {open && !disabled && (
        <div className="color-picker-popover">
          <HexColorPicker color={pickerColor} onChange={val => onPickerChange(val)} />
        </div>
      )}
    </div>
  );

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip content="Answer color from theme is used in opinion scale by default. Enable custom colors to add your own." side="bottom" sideOffset={6}>
          {field}
        </Tooltip>
      </TooltipProvider>
    );
  }

  return field;
}

export default function OptionsPanel({
  optionsTab,
  setOptionsTab,
  required,
  setRequired,
  moreOptsOpen,
  onToggleMoreOpts,
  customColorsOn,
  onToggleCustomColors,
  appearance,
  onAppearanceChange,
  // Range state
  row0End,
  row1Start,
  row1End,
  row2Start,
  row0EndOptions,
  row1EndOptions,
  onRow0EndChange,
  onRow1EndChange,
  // Labels
  labels,
  onLabelChange,
  // Colors
  colors,
  onHexChange,
  onPickerChange,
  // Toggles
  startAt1,
  setStartAt1,
  reverseScale,
  setReverseScale,
  includeNA,
  setIncludeNA,
  stackMobile,
  setStackMobile,
  setDefaultAnswer,
  setSetDefaultAnswer,
  steps,
  setSteps,
}) {
  return (
    <div className="options-panel-wrap">
      <div className="options-panel">
        {/* Header */}
        <div className="options-header">
          <div className="q-type-selector">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2484 4.74414L8.68378 5.50161L7.11914 4.74414" stroke="#575757" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.2484 19.2555L8.68378 18.498L7.11914 19.2555" stroke="#575757" strokeWidth="1.28571" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.7718 8.21289C19.2451 8.21289 19.6289 8.59665 19.6289 9.07003L19.6289 14.8288C19.6289 15.3022 19.2451 15.6859 18.7718 15.6859L5.22758 15.6859C4.7542 15.6859 4.37044 15.3022 4.37044 14.8288L4.37044 9.07003C4.37044 8.59665 4.7542 8.21289 5.22758 8.21289L18.7718 8.21289Z" fill="#F4F6F7" stroke="#575757" strokeWidth="1.28571" strokeLinejoin="round"/>
              <path d="M8.68359 18.4375L8.68359 5.56055" stroke="#575757" strokeWidth="1.02857" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>

          <div className="options-tabs">
            <Tabs value={optionsTab} onValueChange={setOptionsTab}>
              <TabsList
                css={{
                  background: 'transparent',
                  borderBottom: 'none',
                  gap: 0,
                  padding: 0,
                }}
              >
                <TabsTrigger
                  value="Options"
                  css={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 14px',
                    borderRadius: 0,
                    color: '#76859A',
                    background: 'transparent',
                    borderBottom: '2px solid transparent',
                    boxShadow: 'none',
                    '&[data-state=active]': {
                      background: 'transparent',
                      boxShadow: 'none',
                      color: '#363A43',
                      borderBottom: '2px solid #363A43',
                    },
                    '&:hover': { background: 'transparent', color: '#363A43' },
                  }}
                >
                  Options
                </TabsTrigger>
                <TabsTrigger
                  value="Logic"
                  css={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '12px 14px',
                    borderRadius: 0,
                    color: '#76859A',
                    background: 'transparent',
                    borderBottom: '2px solid transparent',
                    boxShadow: 'none',
                    '&[data-state=active]': {
                      background: 'transparent',
                      boxShadow: 'none',
                      color: '#363A43',
                      borderBottom: '2px solid #363A43',
                    },
                    '&:hover': { background: 'transparent', color: '#363A43' },
                  }}
                >
                  Logic
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="options-header-right">
            <Checkbox
              size="sm"
              checked={required}
              onCheckedChange={val => setRequired(val)}
              css={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#4E596C', gap: '6px' }}
            >
              Required
            </Checkbox>
            <Button
              size="md"
              color="primary"
              css={{
                borderRadius: '0 8px 0 0',
                alignSelf: 'stretch',
                height: '100%',
                padding: '0 20px',
                whiteSpace: 'nowrap',
              }}
            >
              Add Next Question
            </Button>
          </div>
        </div>

        {/* Options body */}
        <div className="options-body">
          <div className="opts-row1">
            {/* Steps slider */}
            <div className="slider-group">
              <span className="slider-label">Steps: {steps}</span>
              <Slider
                size="md"
                min={1}
                max={10}
                step={1}
                value={[steps]}
                onValueChange={val => setSteps(val[0])}
                css={{ width: '200px' }}
              />
            </div>

            <ToggleSwitch label="Start scale at 1" checked={startAt1} onChange={e => setStartAt1(e.target.checked)} />
            <ToggleSwitch label="Reverse scale" checked={reverseScale} onChange={e => setReverseScale(e.target.checked)} />
            <ToggleSwitch label="Include N/A" checked={includeNA} onChange={e => setIncludeNA(e.target.checked)} />
            <ToggleSwitch label="Stack on mobile" checked={stackMobile} onChange={e => setStackMobile(e.target.checked)} />
          </div>

          {/* Row 2 */}
          <div className="opts-row2">
            <ToggleSwitch label="Set Default Answer" checked={setDefaultAnswer} onChange={e => setSetDefaultAnswer(e.target.checked)} />
            <Button
              variant="ghost"
              color="default"
              size="md"
              onClick={onToggleMoreOpts}
              rightIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0008 15.8336V3.33984M5.01953 10.8211L10.0008 15.8336L14.982 10.8211" stroke="#4E596C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              css={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4E596C',
                padding: '0 12px',
                height: '32px',
                borderRadius: '8px',
                marginLeft: 'auto',
                background: moreOptsOpen ? 'rgba(100,116,139,0.15)' : 'transparent',
                '&:hover': { background: 'rgba(100,116,139,0.1)' },
              }}
            >
              More options
            </Button>
          </div>

          {/* Scale customizations */}
          <div className={`scale-custom${moreOptsOpen ? ' open' : ''}`}>
            <div className="scale-custom-header">Scale customizations</div>

            {/* Column headers */}
            <div className="scale-custom-cols">
              <div className="sc-col-label">Labels</div>
              <div className="sc-col-range">Range</div>
              <div className="sc-col-color">
                <Checkbox
                  size="sm"
                  checked={customColorsOn}
                  onCheckedChange={val => onToggleCustomColors({ target: { checked: val } })}
                  css={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4E596C', gap: '6px' }}
                >
                  Custom colors
                </Checkbox>
              </div>
              <div className="sc-col-appearance">Appearance</div>
            </div>

            <div className="sc-rows">
            {/* Row 0: Least Likely */}
            <div className="sc-row">
              <Input
                size="md"
                value={labels[0]}
                placeholder="Label"
                onChange={e => onLabelChange(0, e.target.value)}
                css={{ width: '160px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
              />
              <div className="sc-range">
                <div className="sc-range-input">0</div>
                <span className="sc-dash">–</span>
                <Select
                  size="md"
                  value={{ label: String(row0End), value: row0End }}
                  onChange={opt => onRow0EndChange(opt.value)}
                  options={row0EndOptions.map(v => ({ label: String(v), value: v }))}
                  css={{ width: '72px' }}
                />
              </div>
              <ColorField
                disabled={!customColorsOn}
                defaultColor="#FFB4A1"
                hexValue={colors[0].hex}
                onHexChange={raw => onHexChange(0, raw)}
                onPickerChange={val => onPickerChange(0, val)}
              />
              <div className="sc-appearance">
                {['Outlined', 'Filled'].map(app => (
                  <button
                    key={app}
                    className={`sc-app-btn${appearance === app ? ' active' : ''}`}
                    onClick={() => onAppearanceChange(app)}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 1: Neutral */}
            <div className="sc-row">
              <Input
                size="md"
                value={labels[1]}
                placeholder="Label"
                onChange={e => onLabelChange(1, e.target.value)}
                css={{ width: '160px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
              />
              <div className="sc-range">
                <Select
                  size="md"
                  value={{ label: String(row1Start), value: row1Start }}
                  options={[{ label: String(row1Start), value: row1Start }]}
                  css={{ width: '72px' }}
                />
                <span className="sc-dash">–</span>
                <Select
                  size="md"
                  value={{ label: String(row1End), value: row1End }}
                  onChange={opt => onRow1EndChange(opt.value)}
                  options={row1EndOptions.map(v => ({ label: String(v), value: v }))}
                  css={{ width: '72px' }}
                />
              </div>
              <ColorField
                disabled={!customColorsOn}
                defaultColor="#FCBD4F"
                hexValue={colors[1].hex}
                onHexChange={raw => onHexChange(1, raw)}
                onPickerChange={val => onPickerChange(1, val)}
              />
            </div>

            {/* Row 2: Most Likely */}
            <div className="sc-row">
              <Input
                size="md"
                value={labels[2]}
                placeholder="Label"
                onChange={e => onLabelChange(2, e.target.value)}
                css={{ width: '160px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px' }}
              />
              <div className="sc-range">
                <Select
                  size="md"
                  value={{ label: String(row2Start), value: row2Start }}
                  options={[{ label: String(row2Start), value: row2Start }]}
                  css={{ width: '72px' }}
                />
                <span className="sc-dash">–</span>
                <div className="sc-range-input">10</div>
              </div>
              <ColorField
                disabled={!customColorsOn}
                defaultColor="#A8D291"
                hexValue={colors[2].hex}
                onHexChange={raw => onHexChange(2, raw)}
                onPickerChange={val => onPickerChange(2, val)}
              />
            </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="options-footer">
          <div className="footer-left">
            <div className="info-circle">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_208_5085)">
                  <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" fill="black" fillOpacity="0.08"/>
                  <path d="M8.75 13.5417H11.25M10.1325 13.4375V9.375H9.0625" stroke="#575757" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9.84375" cy="7.03125" r="0.5" fill="#575757" stroke="#575757" strokeWidth="0.5625"/>
                </g>
                <defs>
                  <clipPath id="clip0_208_5085">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <button className="btn-tag">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Tag
            </button>
          </div>
          <button className="btn-recode">
            Recode values
          </button>
        </div>
      </div>
    </div>
  );
}
