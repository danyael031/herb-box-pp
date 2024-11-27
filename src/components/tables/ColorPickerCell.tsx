import React, { ChangeEvent, useState } from 'react';

interface ColorPickerCellProps {
  initialColor?: string; // Optional initial color in hex or rgb format
  onColorChange?: (color: string) => void; // Callback when color changes
}

const ColorPickerCell = (props: ColorPickerCellProps) => {
  const [hexColor, setHexColor] = useState(props.initialColor || '#000000'); // Hex color
  const [alpha, setAlpha] = useState(1); // Alpha value

  // Convert hex to rgb
  const hexToRgb = (hex: string): [number, number, number] => {
    const value = hex.replace('#', '');
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return [r, g, b];
  };

  // Convert hex and alpha to rgba-like string
  const triggerColorChange = (hex: string, alphaValue: number) => {
    const [r, g, b] = hexToRgb(hex);
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${alphaValue})`;

    if (props.onColorChange) {
      props.onColorChange(rgbaColor);
    }
  };

  // Handle color input change
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newHexColor = target.value;
    setHexColor(newHexColor);
    triggerColorChange(newHexColor, alpha);
  };

  // Handle alpha slider change
  const handleAlphaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newAlpha = parseFloat(target.value);
    setAlpha(newAlpha);
    triggerColorChange(hexColor, newAlpha);
  };


  return (
    <div>
      <input
        type="color"
        value={hexColor}
        onChange={handleColorChange}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={alpha}
        onChange={handleAlphaChange}
      />
      <span>{`rgba(${hexToRgb(hexColor).join(', ')}, ${alpha})`}</span>
    </div>
  );
};

export default ColorPickerCell;

