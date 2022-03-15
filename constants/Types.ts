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
export type HangerBtnsType = "Emojis" | "Images" | "Gifs" | "Audio";
export type ChatContextType = {
  currentSidePanelContent: Exclude<HangerBtnsType, "theme">;
  setCurrentSidePanelContent: Dispatch<SetStateAction<Exclude<HangerBtnsType, "theme">>>;
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
  socket: MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap> | null>;
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

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
type MessageTypes = "text" | "image" | "indicator" | "gif" | "audio";
type MediaTypeExtender = {
  content: string | Blob;
  resultType: "url" | "blob";
  caption: string;
};
type BaseMessage<T extends MessageTypes | `reply-${Exclude<MessageTypes, "indicator">}`> = {
  id: string;
  content: string;
  createdAt: Date;
  avatar: string;
  author: string;
  className: "Incoming" | "Outgoing";
  type: T;
};
interface ReplyMessageBase<T extends Exclude<MessageTypes, "indicator">> extends BaseMessage<`reply-${T}`> {
  to: Message;
}
export interface TextMessage extends BaseMessage<"text"> {}
export type ImageMessage = BaseMessage<"image"> & MediaTypeExtender;
export type GifMessage = BaseMessage<"gif"> & { preview_url: string } & MediaTypeExtender;
export interface IndicatorMessage
  extends Omit<Omit<Omit<Omit<BaseMessage<"indicator">, "createdAt">, "author">, "avatar">, "className"> {
  backgroundColor: string;
  status: "success" | "error";
}
export type AudioMessage = BaseMessage<"audio"> & MediaTypeExtender;
export type ReplyAudioMessage = BaseMessage<"reply-audio"> & MediaTypeExtender;
export interface ReplyTextMessage extends ReplyMessageBase<"text"> {}
export type ReplyImageMessage = ReplyMessageBase<"image"> & MediaTypeExtender;
export type ReplyGifMessage = ReplyMessageBase<"gif"> & {
  preview_url: string;
};

export type Message =
  | TextMessage
  | ImageMessage
  | GifMessage
  | IndicatorMessage
  | ReplyTextMessage
  | ReplyImageMessage
  | ReplyGifMessage
  | AudioMessage
  | ReplyAudioMessage;

export type ToastMessage = {
  id: string;
  type: "success" | "error";
  content: string;
};
