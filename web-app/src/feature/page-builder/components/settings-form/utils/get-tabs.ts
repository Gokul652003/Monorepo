export const getAvailableTabs = (props: any) => {
  const tabs = [];
  
  if (props.display !== undefined || props.flexDirection !== undefined) {
    tabs.push({ id: 'layout', label: 'Layout', icon: '📐' });
  }
  
  if (props.margin !== undefined || props.padding !== undefined || props.width !== undefined) {
    tabs.push({ id: 'spacing', label: 'Spacing', icon: '📏' });
  }
  
  if (props.background !== undefined || props.borderRadius !== undefined || props.shadow !== undefined) {
    tabs.push({ id: 'style', label: 'Style', icon: '🎨' });
  }
  
  if (props.fontSize !== undefined || props.color !== undefined || props.textAlign !== undefined) {
    tabs.push({ id: 'typography', label: 'Text', icon: '✏️' });
  }
  
  return tabs;
};

export const formatLabel = (key: string): string => {
  return key
    .charAt(0)
    .toUpperCase() + 
    key
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .trim();
};