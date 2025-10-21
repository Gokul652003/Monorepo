import React from 'react';
import { SpacingControl } from './space-control';

interface SpacingPanelProps {
  props: any;
  onChange: (key: string, value: any) => void;
}

export const SpacingPanel: React.FC<SpacingPanelProps> = ({ props, onChange }) => {
  return (
    <div className="space-y-4">
      {props.margin !== undefined && (
        <SpacingControl
          label="Margin"
          value={props.margin}
          onChange={(value) => onChange('margin', value)}
        />
      )}
      
      {props.padding !== undefined && (
        <SpacingControl
          label="Padding"
          value={props.padding}
          onChange={(value) => onChange('padding', value)}
        />
      )}

      <div className="grid grid-cols-2 gap-3">
        {props.width !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
            <input
              type="text"
              value={props.width}
              onChange={(e) => onChange('width', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        
        {props.height !== undefined && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
            <input
              type="text"
              value={props.height}
              onChange={(e) => onChange('height', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};