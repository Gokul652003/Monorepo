import React from 'react';
import { ColorPicker } from './color-picker';
import { SelectButton } from './select-button';


interface TypographyPanelProps {
  props: any;
  onChange: (key: string, value: any) => void;
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({ props, onChange }) => {
  return (
    <div className="space-y-4">
      {props.fontSize !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
          <input
            type="number"
            value={props.fontSize}
            onChange={(e) => onChange('fontSize', parseInt(e.target.value) || 16)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {props.fontWeight !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
          <select
            value={props.fontWeight}
            onChange={(e) => onChange('fontWeight', parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="400">Normal</option>
            <option value="500">Medium</option>
            <option value="600">Semibold</option>
            <option value="700">Bold</option>
          </select>
        </div>
      )}

      {props.color !== undefined && (
        <ColorPicker
          label="Text Color"
          value={props.color}
          onChange={(value) => onChange('color', value)}
        />
      )}

      {props.textAlign !== undefined && (
        <SelectButton
          label="Text Align"
          options={['left', 'center', 'right', 'justify']}
          value={props.textAlign}
          onChange={(value) => onChange('textAlign', value)}
          columns={4}
        />
      )}
    </div>
  );
};