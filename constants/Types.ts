import { LinkProps } from "next/link";
import { ButtonHTMLAttributes, CSSProperties, Dispatch, ReactChildren, ReactNode, SetStateAction } from "react";

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
  avatars: ClientAvatar[];
}
export interface ToggleProps {
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}
export type ClientAvatar = { avatar: string; id: string };

export interface User {
  id: string;
  name: string;
  avatar: string;
  room: string;
  host: boolean;
}
export interface Room {
  roomName: string;
  isPublic: boolean;
  members: User[];
}
