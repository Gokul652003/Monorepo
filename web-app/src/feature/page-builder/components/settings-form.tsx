import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import { getAvailableTabs } from './settings-form/utils/get-tabs';
import { LayoutPanel } from './settings-form/layout-panel';
import { SpacingPanel } from './settings-form/spacing-panel';
import { StylePanel } from './settings-form/style-panel';
import { TypographyPanel } from './settings-form/typography-panel';
import { Tab } from './settings-form/tab';


export const SettingsForm: React.FC = () => {
  const { actions: { setProp }, props } = useNode((node) => ({
    props: node.data.props,
  }));

  
  const [activeTab, setActiveTab] = useState<string>('layout');

  const handlePropChange = (propKey: string, value: any): void => {
    setProp((props: any) => {
      props[propKey] = value;
    });
  };

  const availableTabs = getAvailableTabs(props);

  // If no categorized props, show simple form
  if (availableTabs.length === 0) {
    return (
      <div className="space-y-4">
        {Object.entries(props).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={typeof value === 'number' ? 'number' : 'text'}
              value={value as string | number}
              onChange={(e) => handlePropChange(key, 
                typeof value === 'number' ? parseInt(e.target.value) || 0 : e.target.value
              )}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    );
  }

  const panels: Record<string, React.ReactNode> = {
    layout: <LayoutPanel props={props} onChange={handlePropChange} />,
    spacing: <SpacingPanel props={props} onChange={handlePropChange} />,
    style: <StylePanel props={props} onChange={handlePropChange} />,
    typography: <TypographyPanel props={props} onChange={handlePropChange} />,
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2 overflow-scroll">
        {availableTabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Tab Content */}
      <div className="overflow-y-auto max-h-[500px]">
        {panels[activeTab]}
      </div>
    </div>
  );
};