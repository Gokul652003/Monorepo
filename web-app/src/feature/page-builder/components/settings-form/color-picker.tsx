import React, { useState } from 'react';
import { ChromePicker, type ColorResult } from 'react-color';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  onChange 
}) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowPicker(!showPicker)}
            className="w-10 h-10 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
        </div>
        {showPicker && (
          <div className="absolute z-10 mt-2">
            <div
              className="fixed inset-0"
              onClick={() => setShowPicker(false)}
            />
            <ChromePicker
              color={value}
              onChange={(color: ColorResult) => onChange(color.hex)}
            />
          </div>
        )}
      </div>
    </div>
  );
};