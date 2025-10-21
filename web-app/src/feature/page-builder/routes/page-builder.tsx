import React, { useState } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import lz from 'lz-string';
import {
  Container,
  Button,
  Card,
  Image,
  SettingsPanel,
  Text,
  Toolbox,
  TopBar,
  Video,
  Viewport,
} from '@/feature/page-builder/components';

export const PageBuilder: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [json, setJson] = useState<string | null>(null);

  const handleSave = (json: string): void => {
    const compressed = lz.compressToBase64(json);
    localStorage.setItem('craftjs-demo', compressed);
    alert('Design saved to localStorage!');
  };

  const handleLoad = (): void => {
    const compressed = localStorage.getItem('craftjs-demo');
    if (compressed) {
      const decompressed = lz.decompressFromBase64(compressed);
      if (decompressed) {
        setJson(decompressed);
        alert('Design loaded from localStorage!');
      }
    } else {
      alert('No saved design found!');
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <Editor
        resolver={{
          Container,
          Button,
          Card,
          Text,
          Image,
          Video,
        }}
        enabled={enabled}
        onRender={({ render }) => render}
      >
        <TopBar enabled={enabled} setEnabled={setEnabled} onSave={handleSave} onLoad={handleLoad} />

        <div className="flex h-full pt-16">
          <Toolbox />
          <Viewport>
            <Frame json={json ?? undefined}>
              <Element canvas is={Container} padding={5} background="#ffffff" minHeight="100vh" />
            </Frame>
          </Viewport>
          <SettingsPanel />
        </div>

        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold mb-2">Layers</h3>
          <div className="max-h-60 overflow-auto">
            <Layers expandRootOnLoad />
          </div>
        </div>
      </Editor>
    </div>
  );
};
