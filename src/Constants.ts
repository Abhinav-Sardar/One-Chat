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
  className: string,
  avatar: string,
  date: Date,
  author: string
) => string = (
  messageContent: string,
  className: string,
  avatar: string,
  date: Date,
  author: string
) => {
  return `
  <section class = ${className}>
 <div>
 <div class = "info">
 ${avatar}  <span>${author} - ${ReturnFormattedDate(date)}</span>
 </div>
 <div class = "content">
 ${messageContent}
 </div>
 </div>
  </div>
`;
};

export const ReturnFormattedDate: (date: Date) => string = (date: Date) => {
  if (date.getHours() === 0) {
    if (String(date.getMinutes()).length === 1) {
      return `0${date.getHours()}:0${date.getMinutes()} AM`;
    } else {
      return `${date.getHours()}:${date.getMinutes()} AM`;
    }
  } else {
    if (date.getHours() <= 11) {
      if (String(date.getHours()).length === 1) {
        if (date.getMinutes() <= 9) {
          return `0${date.getHours()}:0${date.getMinutes()} AM`;
        } else {
          return `0${date.getHours()}:${date.getMinutes()} AM`;
        }
      } else {
        if (date.getMinutes() <= 9) {
          return `${date.getHours()}:0${date.getMinutes()} AM`;
        } else {
          return `${date.getHours()}:${date.getMinutes()} AM`;
        }
      }
    } else {
      //12 , 13 , 14 ,
      if (String(date.getMinutes()).length === 1) {
        return `${date.getHours()}:0${date.getMinutes()} PM`;
      } else {
        return `${date.getHours()}:${date.getMinutes()} PM`;
      }
    }
  }
};

export type Message = {
  profilePic?: string;
  accentColor?: string;
  content: string;
  type: "text" | "image" | "tooltip" | "reply";
  created_at?: Date;
  author?: string;
  className: "Incoming" | "Outgoing" | "" | "Left" | "Entered";
  caption?: string;
};
