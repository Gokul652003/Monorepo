import React from 'react';

interface SelectButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  columns?: number;
}

export const SelectButton: React.FC<SelectButtonProps> = ({ 
  options, 
  value, 
  onChange, 
  label,
  columns = 2 
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <div className={`grid grid-cols-${columns} gap-2`}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-2 text-xs rounded border transition-colors ${
              value === option
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}
          >
            {option.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};