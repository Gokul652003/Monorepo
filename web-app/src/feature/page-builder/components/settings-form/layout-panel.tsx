import React from 'react';
import { SelectButton } from './select-button';

interface LayoutPanelProps {
  props: any;
  onChange: (key: string, value: any) => void;
}

export const LayoutPanel: React.FC<LayoutPanelProps> = ({ props, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Display */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
        <select
          value={props.display || 'block'}
          onChange={(e) => onChange('display', e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="block">Block</option>
          <option value="flex">Flex</option>
          <option value="inline-flex">Inline Flex</option>
          <option value="grid">Grid</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Flexbox */}
      {(props.display === 'flex' || props.display === 'inline-flex') && (
        <div className="p-3 bg-blue-50 rounded-lg space-y-3">
          <h4 className="font-medium text-blue-900">Flexbox</h4>
          
          <SelectButton
            label="Direction"
            options={['row', 'row-reverse', 'column', 'column-reverse']}
            value={props.flexDirection || 'row'}
            onChange={(value) => onChange('flexDirection', value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Justify</label>
            <select
              value={props.justifyContent || 'flex-start'}
              onChange={(e) => onChange('justifyContent', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
              <option value="space-between">Space Between</option>
              <option value="space-around">Space Around</option>
              <option value="space-evenly">Space Evenly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Align</label>
            <select
              value={props.alignItems || 'stretch'}
              onChange={(e) => onChange('alignItems', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stretch">Stretch</option>
              <option value="flex-start">Start</option>
              <option value="center">Center</option>
              <option value="flex-end">End</option>
              <option value="baseline">Baseline</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gap</label>
            <input
              type="number"
              value={props.gap || 0}
              onChange={(e) => onChange('gap', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Grid */}
      {props.display === 'grid' && (
        <div className="p-3 bg-green-50 rounded-lg space-y-3">
          <h4 className="font-medium text-green-900">Grid</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
            <input
              type="text"
              value={props.gridTemplateColumns || ''}
              onChange={(e) => onChange('gridTemplateColumns', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1fr 1fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gap</label>
            <input
              type="number"
              value={props.gridGap || 0}
              onChange={(e) => onChange('gridGap', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};