import React, { ReactElement } from "react";
import { toast } from "react-toastify";

const devUrl = "http://localhost:1919/";
const prodUrl = "https://one-chat-server.herokuapp.com";
export const constants = {
  appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
  serverName: process.env.NODE_ENV === "production" ? prodUrl : devUrl,
  pleaseWaitPageStyles: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
  },
  copySuccess: "Copied ✅. Share this Url with anyone you trust",
  PEXELS_API_KEY: process.env.REACT_APP_API_KEY,
  ImageInputErrorMsgs:
    "The provided input was invalid or too long! The limit is 30",
  roomDoesntExistError: "A room with that name doesn't exist",
  roomAlreadyExistsError: "A room with same name already exists",
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
  host: boolean;
  id: string;
};
export const userInfoStorageKey: string = "one-chat-user-info";

export interface HeaderProps {
  roomName: string;
  onClick: () => void;
}

export interface UsersInChatProps {
  theme: string;
  users: ChatUser[];
  onBan: (user: string) => void;
  isHost: boolean;
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

export const copy: (content: string) => void = async (content: string) => {
  await navigator.clipboard.writeText(content);
};

export const setApiUrl: (query: string) => string = (query: string) => {
  let str = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&per_page=40`;
  return str;
};

export const fetchPexelsApi: (url: string) => any = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: constants.PEXELS_API_KEY,
    },
  });
  const result = await res.json();
  return result;
};

export const ToastContainerConfig = {
  draggable: false,
  pauseOnHover: false,
  closeOnClick: false,
};

export const MeetInputAttributesConfig = {
  autoFocus: true,
  placeholder: "Say Something ...",
  type: "text",
  name: "",
  id: "",
  spellCheck: false,
};

export const FooterExpanderConfig = {
  from: {
    width: "0vw",
  },
  to: {
    width: "100vw",
  },
};

export const config = {
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
};

export const validator: (name: string, room: string) => boolean = (
  name: string,
  room: string
) => {
  let valueToBeReturned: boolean = false;
  if (room && room.trim() && name && name.trim()) {
    if (room.includes(" ")) {
      toast.error("Room Names Cannot have spaces");
      valueToBeReturned = false;
    } else {
      valueToBeReturned = true;
    }
  } else {
    toast.error("Invalid Name Or Room Name");
    valueToBeReturned = false;
  }
  return valueToBeReturned;
};

export type room = {
  name: string;
  members: ChatUser[];
  public?: boolean;
};
export const IsRoomThere: (rooms: room[], searchKey: string) => boolean = (
  rooms: room[],
  searchKey: string
) => {
  let valueToBeReturned: boolean = false;
  const doesRoomExist = rooms.find((r) => r.name === searchKey);
  if (doesRoomExist) {
    valueToBeReturned = true;
  } else {
    valueToBeReturned = false;
  }
  return valueToBeReturned;
};

export type contentType = {
  usersOpen: boolean;
  shareOpen: boolean;
  emojiOpen: boolean;
  imgsOpen: boolean;
};
