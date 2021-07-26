import { CSSProperties } from "react";
import { useSpring } from "react-spring";

export const constants = {
  appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
};

export function accentColorChecker(): void {
  if (!localStorage.getItem("one-chat-accent-color")) {
    localStorage.setItem("one-chat-accent-color", "#bd14ca");
  }
}

export type user = {
  name: string;
  currentRoomName: string;
  avatarSvg: string;
};

export type maxAvatarType = {
  isNew: boolean;
  number: number;
};

export type ChatUser = {
  profilePic: string;
  name: string;
};
export const userInfoStorageKey: string = "one-chat-user-info";

export interface HeaderProps {
  roomName: string;
}

export interface UsersInChatProps {
  users: ChatUser[];
  usersOpen: boolean;
  borderColor: string;
}

export interface ShareProps {
  roomName: string;
  shareOpen: boolean;
  theme: string;
}

export function Animations(): object {
  return {
    SidePanelsAppear: useSpring({}),
  };
}
