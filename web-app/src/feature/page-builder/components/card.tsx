import { useNode, Element } from '@craftjs/core';
import type { CardProps, CraftComponent } from '../types/common';
import { Text } from './text';
import { Button } from './button';
import { Container } from './container';
import { SettingsForm } from './settings-form';

export const Card: CraftComponent<CardProps> = ({
  background = '#ffffff',
  padding = 20,
  margin = 10,
  borderRadius = 8,
  shadow = 'medium',
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const shadowMap: Record<string, string> = {
    none: 'shadow-none',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={`${shadowMap[shadow]} transition-all duration-200`}
      style={{
        backgroundColor: background,
        padding: `${padding}px`,
        margin: `${margin}px`,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <Element id="card-container" canvas is={Container} padding={5}>
        <Text text="Card Title" fontSize={20} fontWeight={600} />
        <Text text="Card description goes here" fontSize={14} color="#666666" />
        <Button text="Learn More" size="small" />
      </Element>
    </div>
  );
};

Card.craft = {
  displayName: 'Card',
  props: {
    background: '#ffffff',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    shadow: 'medium',
  },
  related: {
    toolbar: SettingsForm,
  },
};
