import { LinkProps } from "next/link";
import { ButtonHTMLAttributes, CSSProperties, Dispatch, ReactChildren, ReactNode, SetStateAction } from "react";
import { ClientAvatar } from "./constants";

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
export interface AvatarsProps {
  onClose: (avatar: ClientAvatar) => void;
  currentAvatar: ClientAvatar;
  currentAvatarCategory: ClientAvatar["kind"];
  avatars: ClientAvatar[][];
}
