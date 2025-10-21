import React from 'react';

interface TabProps {
  label: string;
  icon?: string;
  active: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, icon, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
};
