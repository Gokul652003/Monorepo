import React from 'react';
import type { ViewportProps } from '../types/common';

export const Viewport: React.FC<ViewportProps> = ({ children }) => {
  return (
    <div className="flex-1 h-full overflow-auto bg-gray-50">
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};