import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Container } from './container';
import { Text } from './text';
import { Button } from './button';
import { Card } from './card';
import { Image } from './image';
import { Video } from './vedio';

interface ComponentItem {
  name: string;
  icon: string;
  element: React.ReactElement;
}

export const Toolbox: React.FC = () => {
  const { connectors } = useEditor();

  const components: ComponentItem[] = [
    {
      name: 'Container',
      icon: '📦',
      element: <Element canvas is={Container} padding={20} />,
    },
    {
      name: 'Text',
      icon: '📝',
      element: <Text />,
    },
    {
      name: 'Button',
      icon: '🔘',
      element: <Button />,
    },
    {
      name: 'Card',
      icon: '🃏',
      element: <Card />,
    },
    {
      name: 'Image',
      icon: '🖼️',
      element: <Image />,
    },
    {
      name: 'Video',
      icon: '🎥',
      element: <Video />,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      <div className="space-y-2">
        {components.map((component) => (
          <div
            key={component.name}
            ref={(ref) => {
              if (ref) connectors.create(ref, component.element);
            }}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{component.icon}</span>
            <span className="font-medium">{component.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Drag components to canvas</li>
          <li>• Click to select & edit</li>
          <li>• Use settings panel to customize</li>
          <li>• Save your design anytime</li>
        </ul>
      </div>
    </div>
  );
};
