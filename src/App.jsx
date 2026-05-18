import React, { useState, useCallback } from 'react';
import TopNav from './components/TopNav.jsx';
import IconRail from './components/IconRail.jsx';
import Sidebar from './components/Sidebar.jsx';
import NpsScale from './components/NpsScale.jsx';
import OptionsPanel from './components/OptionsPanel.jsx';
import ViewPanel from './components/ViewPanel.jsx';
import SurveyThrottling from './components/SurveyThrottling.jsx';
import GeneralSettings from './components/GeneralSettings.jsx';

const CELL_WIDTH = 56;

// Generate row0 end options: 0..8
const ROW0_END_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function computeRow1EndOptions(row1Start) {
  const opts = [];
  for (let v = row1Start; v <= 9; v++) opts.push(v);
  return opts;
}

function computeRangeData(row0End, row1Start, row1End, row2Start, colors, customColorsOn) {
  const getColor = (idx) => {
    if (!customColorsOn) return '#F1F1F1';
    return colors[idx].hex ? '#' + colors[idx].hex : colors[idx].defaultColor;
  };
  return [
    { start: 0, end: row0End, color: getColor(0) },
    { start: row1Start, end: row1End, color: getColor(1) },
    { start: row2Start, end: 10, color: getColor(2) },
  ];
}

export default function App() {
  // Panel + modal state
  const [activePanel, setActivePanel] = useState('questions'); // 'questions' | 'settings'
  const [throttlingOpen, setThrottlingOpen] = useState(false);

  const handleSettingsClick = () => {
    setActivePanel(prev => prev === 'settings' ? 'questions' : 'settings');
  };

  // Tab state
  const [activeTab, setActiveTab] = useState('Edit'); // 'Edit' | 'View'

  // Question content
  const [questionTitle, setQuestionTitle] = useState('How likely are you to recommend us to a friend or colleague?');
  const [questionDesc, setQuestionDesc] = useState('');

  // Options panel tabs
  const [optionsTab, setOptionsTab] = useState('Options');
  const [required, setRequired] = useState(false);

  // Toggle options
  const [startAt1, setStartAt1] = useState(false);
  const [reverseScale, setReverseScale] = useState(false);
  const [includeNA, setIncludeNA] = useState(false);
  const [stackMobile, setStackMobile] = useState(false);
  const [setDefaultAnswer, setSetDefaultAnswer] = useState(false);
  const [steps, setSteps] = useState(10);

  // More opts
  const [moreOptsOpen, setMoreOptsOpen] = useState(false);

  // Scale customizations
  const [customColorsOn, setCustomColorsOn] = useState(false);
  const [appearance, setAppearance] = useState('Outlined');

  // Range state
  const [row0End, setRow0End] = useState(5);
  const [row1End, setRow1End] = useState(8);

  // Derived
  const row1Start = row0End + 1;
  const row2Start = row1End + 1;
  const row1EndOptions = computeRow1EndOptions(row1Start);

  // Labels
  const [labels, setLabels] = useState(['Least Likely', 'Neutral', 'Most Likely']);

  // Colors
  const [colors, setColors] = useState([
    { hex: '', defaultColor: '#FFB4A1' },
    { hex: '', defaultColor: '#FCBD4F' },
    { hex: '', defaultColor: '#A8D291' },
  ]);

  // Computed range data for NPS scale
  const rangeData = computeRangeData(row0End, row1Start, row1End, row2Start, colors, customColorsOn);

  // Label positions (pixel offset from left of NPS scale container)
  const labelPositions = [
    0,
    row1Start * CELL_WIDTH,
    row2Start * CELL_WIDTH,
  ];

  // Handlers
  const handleRow0EndChange = useCallback((val) => {
    setRow0End(val);
    // Ensure row1End is >= val+1
    setRow1End(prev => Math.max(prev, val + 1));
  }, []);

  const handleRow1EndChange = useCallback((val) => {
    setRow1End(val);
  }, []);

  const handleToggleMoreOpts = useCallback(() => {
    setMoreOptsOpen(prev => !prev);
  }, []);

  const handleToggleCustomColors = useCallback((e) => {
    const on = e.target.checked;
    setCustomColorsOn(on);
    if (on) {
      // Fill in default colors for any empty hex
      setColors(prev => prev.map(c => ({
        ...c,
        hex: c.hex || c.defaultColor.replace('#', ''),
      })));
    }
  }, []);

  const handleLabelChange = useCallback((idx, val) => {
    setLabels(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const handleHexChange = useCallback((idx, raw) => {
    setColors(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], hex: raw };
      return next;
    });
  }, []);

  const handlePickerChange = useCallback((idx, val) => {
    const hex = val.replace('#', '').toUpperCase();
    setColors(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], hex };
      return next;
    });
  }, []);

  const handleDescInput = useCallback((e) => {
    setQuestionDesc(e.currentTarget.textContent);
  }, []);

  const handleTitleInput = useCallback((e) => {
    setQuestionTitle(e.currentTarget.textContent);
  }, []);

  const handleTitleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }, []);

  const isEdit = activeTab === 'Edit';

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopNav />

      <div className="layout">
        <IconRail
          activePanel={activePanel}
          onBuilderClick={() => setActivePanel('questions')}
          onSettingsClick={handleSettingsClick}
        />
        {activePanel === 'settings'
          ? <GeneralSettings onOpenThrottling={() => setThrottlingOpen(true)} />
          : <Sidebar questionTitle={questionTitle} />
        }

        <main className="main">
          {/* Edit/View toggle bar — hidden in settings mode */}
          <div className="edit-view-bar" style={{ display: activePanel === 'settings' ? 'none' : undefined }}>
            <div className="ev-toggle">
              {['Edit', 'View'].map(tab => (
                <button
                  key={tab}
                  className={`ev-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Edit panel */}
          {activePanel !== 'settings' && isEdit && (
            <>
              <div className="question-editor">
                <div className="q-title-row">
                  <span className="q-title-num">1.</span>
                  <div className="q-title-body">
                    <span
                      className="q-title-text"
                      contentEditable
                      suppressContentEditableWarning
                      spellCheck={false}
                      onInput={handleTitleInput}
                      onKeyDown={handleTitleKeyDown}
                    >
                      {questionTitle}
                    </span>
                    <span
                      className="q-description-text"
                      contentEditable
                      suppressContentEditableWarning
                      spellCheck={false}
                      data-placeholder="Add description to your question."
                      onInput={handleDescInput}
                    />
                  </div>
                  <div className="q-title-actions">
                    {/* Actions placeholder icons */}
                    <button className="xs-icon-btn" title="Bold">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                      </svg>
                    </button>
                    <button className="xs-icon-btn" title="Italic">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/>
                      </svg>
                    </button>
                    <button className="xs-icon-btn" title="Link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <NpsScale
                  rangeData={rangeData}
                  appearance={appearance}
                  customColorsOn={customColorsOn}
                  showLabels={moreOptsOpen}
                  labels={labels}
                  labelPositions={labelPositions}
                  steps={steps}
                />
              </div>

              <OptionsPanel
                optionsTab={optionsTab}
                setOptionsTab={setOptionsTab}
                required={required}
                setRequired={setRequired}
                moreOptsOpen={moreOptsOpen}
                onToggleMoreOpts={handleToggleMoreOpts}
                customColorsOn={customColorsOn}
                onToggleCustomColors={handleToggleCustomColors}
                appearance={appearance}
                onAppearanceChange={setAppearance}
                row0End={row0End}
                row1Start={row1Start}
                row1End={row1End}
                row2Start={row2Start}
                row0EndOptions={ROW0_END_OPTIONS}
                row1EndOptions={row1EndOptions}
                onRow0EndChange={handleRow0EndChange}
                onRow1EndChange={handleRow1EndChange}
                labels={labels}
                onLabelChange={handleLabelChange}
                colors={colors}
                onHexChange={handleHexChange}
                onPickerChange={handlePickerChange}
                startAt1={startAt1}
                setStartAt1={setStartAt1}
                reverseScale={reverseScale}
                setReverseScale={setReverseScale}
                includeNA={includeNA}
                setIncludeNA={setIncludeNA}
                stackMobile={stackMobile}
                setStackMobile={setStackMobile}
                setDefaultAnswer={setDefaultAnswer}
                setSetDefaultAnswer={setSetDefaultAnswer}
                steps={steps}
                setSteps={setSteps}
              />
            </>
          )}

          {/* View panel — shown in view mode, or as preview in settings mode */}
          {(activePanel === 'settings' || !isEdit) && (
            <ViewPanel
              questionTitle={questionTitle}
              rangeData={rangeData}
              appearance={appearance}
              customColorsOn={customColorsOn}
              showLabels={moreOptsOpen}
              labels={labels}
              labelPositions={labelPositions}
            />
          )}
        </main>
      </div>
      <SurveyThrottling open={throttlingOpen} onClose={() => setThrottlingOpen(false)} />
    </div>
  );
}
