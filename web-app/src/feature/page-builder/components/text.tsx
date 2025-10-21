import { useEffect, useState } from 'react';
import { useNode } from '@craftjs/core';
import type { CraftComponent, TextProps } from '../types/common';
import ContentEditable from 'react-contenteditable';
import { SettingsForm } from './settings-form';

export const Text: CraftComponent<TextProps> = ({
  text = 'Click to edit',
  fontSize = 16,
  fontWeight = 400,
  color = '#000000',
  textAlign = 'left',
  margin = 0,
  padding = 0,
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState<boolean>(false);
  const [localText, setLocalText] = useState<string>(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  useEffect(() => {
    if (!selected) setEditable(false);
  }, [selected]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setLocalText(value);
    setProp((props: TextProps) => {
      if (props.text !== undefined) {
        props.text = value;
      }
    });
  };

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      onClick={() => selected && setEditable(true)}
      style={{
        margin: `${margin}px`,
        padding: `${padding}px`,
      }}
    >
      <ContentEditable
        disabled={!editable}
        html={localText}
        onChange={handleChange}
        tagName="p"
        style={{
          fontSize: `${fontSize}px`,
          fontWeight,
          color,
          textAlign,
          cursor: selected ? 'text' : 'default',
        }}
      />
    </div>
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Edit this text',
    fontSize: 16,
    fontWeight: 400,
    color: '#000000',
    textAlign: 'left',
    margin: 0,
    padding: 8,
  },
  related: {
    toolbar: SettingsForm,
  },
};
