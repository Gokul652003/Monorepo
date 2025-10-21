import { useNode } from '@craftjs/core';
import type { ButtonProps, CraftComponent } from '../types/common';
import { SettingsForm } from './settings-form';

export const Button: CraftComponent<ButtonProps> = ({
  size = 'medium',
  text = 'Click me',
  color = '#ffffff',
  background = '#3b82f6',
  borderRadius = 6,
  padding = 10,
  margin = 0,
  onClick,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const sizeMap: Record<string, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`${sizeMap[size]} font-medium transition-all duration-200 hover:opacity-90`}
      style={{
        color,
        backgroundColor: background,
        borderRadius: `${borderRadius}px`,
        padding: `${padding}px`,
        margin: `${margin}px`,
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    size: 'medium',
    variant: 'primary',
    text: 'Button',
    color: '#ffffff',
    background: '#3b82f6',
    borderRadius: 6,
    padding: 10,
    margin: 0,
  },
  related: {
    toolbar: SettingsForm,
  },
};
