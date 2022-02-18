import { LinkProps } from "next/link";
import { ButtonHTMLAttributes, CSSProperties, ReactChildren, ReactNode } from "react";

export interface ContextType {}
export type URLPaths = "/" | "/create-chat" | "/join-chat" | `/chat/${string}`;
export interface SafeLinkProps extends LinkProps {
  href: URLPaths;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  color?: string;
  backgroundColor?: string;
}
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
