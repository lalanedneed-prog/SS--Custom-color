import React from 'react';
import { computeCellStyles } from '../utils/colorUtils.js';

export default function NpsScale({
  rangeData,
  appearance,
  customColorsOn,
  showLabels,
  labels,
  labelPositions,
  steps = 10,
}) {
  const scaleStyle = {};
  if (customColorsOn && appearance === 'Outlined') {
    scaleStyle.overflow = 'visible';
    scaleStyle.border = 'none';
  }

  return (
    <div className="nps-scale-wrap">
      <div className="nps-scale" style={scaleStyle}>
        {Array.from({ length: steps + 1 }, (_, i) => {
          const style = computeCellStyles(i, rangeData, appearance, customColorsOn);
          return (
            <div key={i} className="nps-cell" style={style}>
              {i}
            </div>
          );
        })}
      </div>
      <div className={`nps-label-row${showLabels ? ' visible' : ''}`}>
        <span id="nps-label-least" className="nps-label" style={{ left: '0px' }}>
          {labels[0]}
        </span>
        <span
          id="nps-label-neutral"
          className="nps-label"
          style={{ left: `${labelPositions[1]}px` }}
        >
          {labels[1]}
        </span>
        <span
          id="nps-label-most"
          className="nps-label"
          style={{ left: `${labelPositions[2]}px` }}
        >
          {labels[2]}
        </span>
      </div>
    </div>
  );
}
