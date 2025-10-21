import { useNode } from '@craftjs/core';
import type { CraftComponent, VideoProps } from '../types/common';
import { SettingsForm } from './settings-form';

export const Video: CraftComponent<VideoProps> = ({
  src = 'https://www.w3schools.com/html/mov_bbb.mp4',
  width = '100%',
  height = 'auto',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  borderRadius = 0,
  margin = 0,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <video
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      src={src}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      style={{
        borderRadius: `${borderRadius}px`,
        margin: `${margin}px`,
        display: 'block',
      }}
      className="transition-all duration-200"
    />
  );
};

Video.craft = {
  displayName: 'Video',
  props: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    width: '100%',
    height: 'auto',
    controls: true,
    autoPlay: false,
    loop: false,
    muted: false,
    borderRadius: 0,
    margin: 0,
  },
  related: {
    toolbar: SettingsForm,
  },
};
