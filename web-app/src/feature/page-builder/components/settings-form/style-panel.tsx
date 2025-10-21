import React from 'react';
import { ColorPicker } from './color-picker';

interface StylePanelProps {
  props: any;
  onChange: (key: string, value: any) => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({ props, onChange }) => {
  return (
    <div className="space-y-4">
      {props.background !== undefined && (
        <ColorPicker
          label="Background"
          value={props.background}
          onChange={(value) => onChange('background', value)}
        />
      )}

      {props.borderRadius !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
          <input
            type="number"
            value={props.borderRadius || 0}
            onChange={(e) => onChange('borderRadius', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {props.shadow !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shadow</label>
          <select
            value={props.shadow}
            onChange={(e) => onChange('shadow', e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      )}

      {props.opacity !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opacity: {props.opacity || 1}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={props.opacity || 1}
            onChange={(e) => onChange('opacity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};