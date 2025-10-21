import React from 'react';
import { useEditor } from '@craftjs/core';

interface SelectedInfo {
  id: string;
  name: string;
  settings?: React.ElementType;
  isDeletable?: boolean;
}

export const SettingsPanel = () => {
  const { selected, actions } = useEditor((state) => {
    const [currentNodeId] = state.events.selected;
    let selected: SelectedInfo | null = null;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.toolbar,
        isDeletable: state.nodes[currentNodeId].data.custom?.isDeletable,
      };
    }

    return {
      selected,
    };
  });

  return (
    <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Settings</h2>

      {selected ? (
        <div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Selected: {selected.name}</h3>
            {selected.settings && React.createElement(selected.settings)}
          </div>

          {selected.id !== 'ROOT' && (
            <button
              onClick={() => actions.delete(selected.id)}
              className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete Component
            </button>
          )}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          <p>Select a component to edit its properties</p>
        </div>
      )}
    </div>
  );
};
