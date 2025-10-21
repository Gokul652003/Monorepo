import React from 'react';
import { useNode } from '@craftjs/core';
import type { ContainerProps, CraftComponent, SpacingValues } from '../types/common';
import { SettingsForm } from './settings-form';

const getSpacingStyle = (value: number | SpacingValues | undefined): string => {
  if (!value && value !== 0) return '0px';

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
};

export const Container: CraftComponent<ContainerProps> = ({
  // Layout
  display = 'block',
  flexDirection = 'row',
  flexWrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'stretch',
  gap = 0,

  // Grid
  gridTemplateColumns,
  gridTemplateRows,
  gridGap = 0,

  // Spacing
  background = '#ffffff',
  padding = 0,
  margin = 0,
  width = '100%',
  height = 'auto',
  minHeight = '100px',
  maxWidth,
  maxHeight,

  // Style
  borderRadius = 0,
  borderWidth = 0,
  borderColor = '#000000',
  borderStyle = 'solid',
  opacity = 1,
  overflow = 'visible',
  position = 'static',

  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const style: React.CSSProperties = {
    display,
    background,
    padding: getSpacingStyle(padding),
    margin: getSpacingStyle(margin),
    width,
    height,
    minHeight,
    maxWidth,
    maxHeight,
    borderRadius: `${borderRadius}px`,
    border: borderWidth ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
    opacity,
    overflow,
    position,
  };

  // Add flexbox properties if display is flex
  if (display === 'flex' || display === 'inline-flex') {
    style.flexDirection = flexDirection;
    style.flexWrap = flexWrap;
    style.justifyContent = justifyContent;
    style.alignItems = alignItems;
    style.alignContent = alignContent;
    style.gap = `${gap}px`;
  }

  // Add grid properties if display is grid
  if (display === 'grid') {
    style.gridTemplateColumns = gridTemplateColumns;
    style.gridTemplateRows = gridTemplateRows;
    style.gridGap = `${gridGap}px`;
  }

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={style}
      className="transition-all duration-200"
    >
      {children}
    </div>
  );
};

Container.craft = {
  displayName: 'Container',
  props: {
    display: 'block',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 0,
    background: '#ffffff',
    padding: 20,
    margin: 0,
    width: '100%',
    height: 'auto',
    minHeight: '100px',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#000000',
    borderStyle: 'solid',
    opacity: 1,
    overflow: 'visible',
    position: 'static',
  },
  related: {
    toolbar: SettingsForm,
  },
};
