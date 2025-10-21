import { useNode } from '@craftjs/core';
import type { CraftComponent, ImageProps } from '../types/common';
import { SettingsForm } from './settings-form';

export const Image: CraftComponent<ImageProps> = ({
  src = 'https://via.placeholder.com/300x200',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 0,
  margin = 0,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <img
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit,
        borderRadius: `${borderRadius}px`,
        margin: `${margin}px`,
        display: 'block',
      }}
      className="transition-all duration-200"
    />
  );
};

Image.craft = {
  displayName: 'Image',
  props: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Image',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: 0,
    margin: 0,
  },
  related: {
    toolbar: SettingsForm,
  },
};
