import React, { CSSProperties, FC, ReactChildren, ReactElement } from "react";
import { useSpring, useTransition } from "react-spring";

const devUrl = "http://localhost:1919/";
const prodUrl = "https://one-chat-server.herokuapp.com";
export const constants = {
  appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
  serverName: process.env.NODE_ENV === "production" ? prodUrl : devUrl,
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
  onClick: () => void;
}

export interface UsersInChatProps {
  theme: string;
  users: ChatUser[];
}

export interface ShareProps {
  roomName: string;
  theme: string;
  onClose: () => void;
}

export interface PanelHeaderProps {
  children: string | ReactElement;
  onClose: () => void;
  style?: React.CSSProperties;
}
const alphabets: string[] = "abcdefghijklmnopqrstuvwxyz".split("");
const nums: string[] = "1234567890".split("");
const specialChars: string[] = '!@#$%^&*()_+=-";:,.<>/?'.split("");
export function getRandomKey(): string {
  let str = "";
  const allFields: string[][] = [alphabets, nums, specialChars];
  const randomField: string[] =
    allFields[Math.floor(Math.random()) * allFields.length];
  for (let i = 0; i < 6; i++) {
    str += randomField[Math.floor(Math.random() * randomField.length)];
  }
  return str;
}

export const Animations = {
  config: {
    from: {
      opacity: 0,
      width: "0vw",
    },
    enter: {
      opacity: 1,
      width: "25vw",
      delay: 150,
    },
    leave: {
      opacity: 0,
      width: "0vw",
    },
  },
};
export const goFullScreen: () => void = () => {
  const root = document.getElementById("root")!;
  if (root.requestFullscreen) {
    root.requestFullscreen();
  }
  //@ts-ignore
  else if (root.webkitRequestFullscreen) {
    //@ts-ignore

    root.webkitRequestFullscreen();
  } else if (
    //@ts-ignore

    root.msRequestFullscreen
  ) {
    //@ts-ignore

    root.msRequestFullscreen();
  }
};

export const exitFullScreen: () => void = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  //@ts-ignore
  else if (document.webkitExitFullscreen) {
    //@ts-ignore

    document.webkitExitFullscreen();
  }
  //@ts-ignore
  else if (document.msExitFullscreen) {
    /* IE11 */
    //@ts-ignore

    document.msExitFullscreen();
  }
};

export const setUrl: () => void = () => {
  const { href } = window.location;
  if (href === `${window.location.origin}/create`) {
    document.title = "Create a room";
  } else if (href === `${window.location.origin}/join`) {
    document.title = "Join a room";
  } else if (href === `${window.location.origin}/customize`) {
    document.title = "Customize";
  } else if (href === `${window.location.origin}`) {
    document.title = "One-Chat";
  }
};

export const MessageGenerator: (
  messageContent: string,
  className: string
) => string = (messageContent: string, className: string) => {
  return `
<div class = ${className}>
${messageContent}
</div>
`;
};
