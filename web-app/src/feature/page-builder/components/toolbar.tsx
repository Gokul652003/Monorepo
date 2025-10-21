import React from 'react';
import { useEditor } from '@craftjs/core';
import type { TopBarProps } from '../types/common';

export const TopBar: React.FC<TopBarProps> = ({ 
  enabled, 
  setEnabled, 
  onSave, 
  onLoad 
}) => {
  const { actions, query } = useEditor();

  const handleExport = (): void => {
    const json = query.serialize();
    const file = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'page-design.json';
    a.click();
  };

  const handleImport = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            try {
              const json = JSON.parse(result);
              actions.deserialize(json);
              alert('Design imported successfully!');
            } catch (error) {
              alert('Invalid JSON file');
            }
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-800">Page Builder</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Edit Mode:</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              enabled
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {enabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => actions.history.undo()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          ↶ Undo
        </button>
        
        <button
          onClick={() => actions.history.redo()}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          ↷ Redo
        </button>

        <button
          onClick={() => {
            const json = query.serialize();
            onSave(json);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          💾 Save
        </button>

        <button
          onClick={onLoad}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          📂 Load
        </button>

        <button
          onClick={handleExport}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          ⬇ Export
        </button>

        <button
          onClick={handleImport}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          ⬆ Import
        </button>
      </div>
    </div>
  );
};