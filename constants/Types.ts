import { LinkProps } from "next/link";
import {
  ButtonHTMLAttributes,
  CSSProperties,
  Dispatch,
  MutableRefObject,
  ReactChildren,
  ReactNode,
  SetStateAction,
} from "react";
import { IconType } from "react-icons/lib";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
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
export type HangerBtnsType = "Emojis" | "Images" | "Gifs" | "theme";
export interface ChatContextType {
  currentSidePanelContent: Exclude<HangerBtnsType, "theme">;
  setCurrentSidePanelContent: Dispatch<SetStateAction<Exclude<HangerBtnsType, "theme">>>;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  socket: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
}

export enum SocketMessages {
  connection = "connection",
  disconnect = "disconnect",
  newUser = "new-user",
  message = "message",
  ban = "ban",
}
export type EmojisType = {
  title: "objects" | "food" | "human" | "animal" | "symbol";
  emojis: string[];
  icon: IconType;
};
