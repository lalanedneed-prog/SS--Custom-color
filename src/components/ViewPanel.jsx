import React, { useState } from 'react';
import { bgWithAlpha, computeCellStyles } from '../utils/colorUtils.js';
import { Button } from '@sparrowengg/twigs-react';

export default function ViewPanel({
  questionTitle,
  rangeData,
  appearance,
  customColorsOn,
  showLabels,
  labels,
  labelPositions,
}) {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (i) => {
    setSelectedCell(prev => prev === i ? null : i);
  };

  const getCellStyle = (i) => {
    const base = computeCellStyles(i, rangeData, appearance, customColorsOn);
    const origBg = base.background || '#F1F1F1';

    if (selectedCell === null) {
      return { ...base };
    }
    if (selectedCell === i) {
      // fully opaque — use original background (100%)
      return { ...base };
    } else {
      // dim to 30% alpha
      return { ...base, background: bgWithAlpha(origBg, 0.3) };
    }
  };

  const scaleStyle = {};
  if (customColorsOn && appearance === 'Outlined') {
    scaleStyle.overflow = 'visible';
    scaleStyle.border = 'none';
  }

  return (
    <div className="view-panel" id="view-panel">
      <div className="vp-body">
        <p className="vp-q-label">Question 1</p>
        <p className="vp-q-text" id="vp-q-text">{questionTitle}</p>

        <div className="vp-scale-wrap">
          <div className="vp-nps-scale" style={scaleStyle}>
            {Array.from({ length: 11 }, (_, i) => (
              <div
                key={i}
                className={`vp-cell${selectedCell === i ? ' selected' : ''}`}
                style={getCellStyle(i)}
                onClick={() => handleCellClick(i)}
              >
                {i}
              </div>
            ))}
          </div>
          {showLabels && (
            <div className="vp-label-row">
              <span className="vp-label" style={{ left: '0px' }}>{labels[0]}</span>
              <span className="vp-label" style={{ left: `${labelPositions[1]}px` }}>{labels[1]}</span>
              <span className="vp-label" style={{ left: `${labelPositions[2]}px` }}>{labels[2]}</span>
            </div>
          )}
        </div>

        <div className="vp-actions">
          <Button
            variant="solid"
            color="primary"
            size="xl"
            rightIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            }
          >
            NEXT
          </Button>
          <Button variant="ghost" color="secondary" size="lg">SKIP</Button>
        </div>
      </div>

      <div className="vp-footer">
        <div className="vp-footer-left">
          <button className="vp-icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="vp-progress-pct">0%</span>
          <span className="vp-footer-note">
            Never submit password!{' '}
            <a href="#" style={{ color: 'inherit' }}>Submission guidelines</a>
          </span>
        </div>
        <div className="vp-footer-right">
          <span className="vp-made-with">Made with <strong>SurveySparrow</strong></span>
          <button className="vp-icon-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </button>
          <button className="vp-icon-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
