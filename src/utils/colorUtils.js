// Returns relative luminance (0–1) for a hex color
function getLuminance(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const toLinear = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

// Returns '#fff' for dark backgrounds, '#333' for light backgrounds
export function accessibleTextColor(hex) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return '#333';
  return getLuminance(hex) < 0.35 ? '#fff' : '#333';
}

export function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function bgWithAlpha(colorStr, alpha) {
  const rgba = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgba) return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${alpha})`;
  if (colorStr.startsWith('#')) return hexToRgba(colorStr, alpha);
  return colorStr;
}

export function computeCellStyles(cellIndex, rangeData, appearance, customColorsOn) {
  const resetStyle = { background: '#F1F1F1', boxShadow: '', borderRight: '', borderRadius: '', color: '' };

  if (!customColorsOn) return resetStyle;

  const range = rangeData.find(r => cellIndex >= r.start && cellIndex <= r.end);
  if (!range) return resetStyle;

  const isFirst = cellIndex === 0;
  const isLast = cellIndex === 10;
  const color = range.color;

  if (appearance === 'Filled') {
    return {
      background: color,
      color: accessibleTextColor(color),
      boxShadow: '',
      borderRight: '',
      borderRadius: '',
    };
  } else {
    // Outlined — bg is 50% alpha, check luminance against full color
    const shadows = [
      `inset 0 1px 0 0 ${color}`,
      `inset 0 -1px 0 0 ${color}`,
    ];
    if (isFirst) shadows.push(`inset 1px 0 0 0 ${color}`);
    if (isLast) shadows.push(`inset -1px 0 0 0 ${color}`);

    return {
      background: hexToRgba(color, 0.5),
      color: accessibleTextColor(color),
      borderRight: isLast ? 'none' : `1px solid ${color}`,
      borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : '0',
      boxShadow: shadows.join(', '),
    };
  }
}
