export interface CraftComponent<T = any> extends React.FC<T> {
  craft?: {
    displayName: string;
    props?: T;
    related?: {
      toolbar?: React.FC;
    };
    rules?: {
      canDrag?: () => boolean;
      canDrop?: () => boolean;
      canMoveIn?: () => boolean;
      canMoveOut?: () => boolean;
    };
  };
}

export interface SpacingValues {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BaseComponentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FlexProperties {
  display?: 'flex' | 'inline-flex' | 'block' | 'grid' | 'none';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignContent?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  gap?: number;
  rowGap?: number;
  columnGap?: number;
}

export interface GridProperties {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: number;
  gridRowGap?: number;
  gridColumnGap?: number;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
}

export interface ContainerProps
  extends BaseComponentProps,
    Omit<FlexProperties, 'alignItems'>,
    Omit<GridProperties, 'alignItems'> {
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end';
  background?: string;
  padding?: number | SpacingValues;
  margin?: number | SpacingValues;
  width?: string;
  height?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
  opacity?: number;
}

export interface TextProps extends BaseComponentProps {
  text?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  margin?: number;
  padding?: number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
  opacity?: number;
}

export interface ButtonProps extends BaseComponentProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline';
  text?: string;
  color?: string;
  background?: string;
  borderRadius?: number;
  padding?: number | SpacingValues;
  margin?: number | SpacingValues;
  onClick?: () => void;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
  opacity?: number;
}

export interface CardProps extends BaseComponentProps {
  background?: string;
  padding?: number | SpacingValues;
  margin?: number | SpacingValues;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
  opacity?: number;
  shadow?: 'none' | 'small' | 'medium' | 'large' | 'xl';
}

export interface ImageProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  boxShadow?: string;
  opacity?: number;
  margin?: number;
}

export interface VideoProps extends BaseComponentProps {
  src?: string;
  width?: string;
  height?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  borderRadius?: number;
  margin?: number;
}

export interface TopBarProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  onSave: (json: string) => void;
  onLoad: () => void;
}

export interface ViewportProps {
  children: React.ReactNode;
}
