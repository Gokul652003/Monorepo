import React, { useState } from 'react';
import type { SpacingValues } from '../../types/common';

interface SpacingControlProps {
  label: string;
  value: number | SpacingValues;
  onChange: (value: number | SpacingValues) => void;
}

export const SpacingControl: React.FC<SpacingControlProps> = ({ 
  label, 
  value, 
  onChange 
}) => {
  const [isAdvanced, setIsAdvanced] = useState(typeof value === 'object');

  const spacingValue: SpacingValues = 
    typeof value === 'object' 
      ? value 
      : { top: value, right: value, bottom: value, left: value };

  const handleToggle = () => {
    if (isAdvanced) {
      onChange(spacingValue.top);
    } else {
      const val = typeof value === 'number' ? value : spacingValue.top;
      onChange({ top: val, right: val, bottom: val, left: val });
    }
    setIsAdvanced(!isAdvanced);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button
          onClick={handleToggle}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {isAdvanced ? 'Simple' : 'Advanced'}
        </button>
      </div>

      {!isAdvanced ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={typeof value === 'number' ? value : spacingValue.top}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-500">px</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <div key={side}>
              <label className="text-xs text-gray-600 capitalize">{side}</label>
              <input
                type="number"
                value={spacingValue[side]}
                onChange={(e) => onChange({
                  ...spacingValue,
                  [side]: parseInt(e.target.value) || 0
                })}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};