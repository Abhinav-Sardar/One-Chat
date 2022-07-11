import { CSSProperties, FC, ReactChild, ReactNode } from "react";

export type Component<T = {}> = FC<T & { children?: any }>;
export interface AccentTextProps {
  inverse?: boolean;
  fontSize?: string;
  fontFamily?: string;
}
export interface ButtonProps {
  styles: CSSProperties;
  onClick: () => void;
}
