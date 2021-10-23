import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { MdRoomService } from "react-icons/md";
const devUrl = "http://localhost:1919/";
const prodUrl = "https://one-chat-server.herokuapp.com/";
const initialGifs = [
  "https://c.tenor.com/kwv_MuCidz8AAAAM/yes-will-ferrell.gif",
  "https://c.tenor.com/qA0mIzGwVoMAAAAM/sorry.gif",
  "https://c.tenor.com/ppqVQB1PoBAAAAAM/tom-y-jerry-tom-and-jerry.gif",
  "https://c.tenor.com/4fD9lfLzfg4AAAAS/shocked-shock.gif",
  "https://c.tenor.com/xLKveNp-xMQAAAAS/laughing-laugh.gif",
  "https://c.tenor.com/Pjx76Nn_W_8AAAAS/wtf-what-do-you-mean.gif",
  "https://c.tenor.com/SNIM3SI-mtIAAAAS/kummeli-thumbs-up.gif",
  "https://c.tenor.com/Q3406JOSa5wAAAAM/angry-anger.gif",
  "https://c.tenor.com/-BVQhBulOmAAAAAM/bruce-almighty-morgan-freeman.gif",
  "https://c.tenor.com/spXl5MzCo64AAAAM/family-guy-woah.gif",
];

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
  PEXELS_API_KEY: "563492ad6f91700001000001e2f383c41efa4b889123dc24cdf343a3",
  imageInputErrorMsg:
    "The provided input was invalid or too long! The limit is 30",
  roomDoesntExistError: "A room with that name doesn't exist",
  roomAlreadyExistsError: "A room with same name already exists",
  tenorApiKey: "5BH3UY2UAJ78",
  initialGifs,
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
  hasCreatedPrivateRoom: boolean | "Join";
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
  onBan: (user: string, reason: string) => void;
  isHost: boolean;
}

export interface ShareProps {
  roomName: string;
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
  type: "text" | "image" | "indicator" | "reply" | "gif";
  created_at?: Date;
  author?: string;
  className?: "Incoming" | "Outgoing";
  caption?: string;
  preview_url?: string;
  Icon?: any;
  background?: string;
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
  spellCheck: false,
  id: "message__input",
  autoComplete: "off",
};

export const FooterExpanderConfig = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
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
    if (name.length >= 20) {
      valueToBeReturned = false;

      toast.error("Name Too Long!");
    } else if (room.length >= 20) {
      valueToBeReturned = false;

      toast.error("Room Name Too Long!");
    } else {
      if (room.includes(" ")) {
        toast.error("Room Names Cannot have spaces");
        valueToBeReturned = false;
      } else {
        valueToBeReturned = true;
      }
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
  isPrivate?: boolean;
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

export const validateModal: (text: string) => boolean = (text: string) => {
  let valueToBeReturned = false;
  if (!text || !text.trim() || text.length >= 150) {
    valueToBeReturned = false;
  } else {
    valueToBeReturned = true;
  }
  return valueToBeReturned;
};
export type numOrStr = number | string;
export const returnUpdatedDate: () => [numOrStr, numOrStr, numOrStr] = () => {
  let valueToBeReturned: [numOrStr, numOrStr, numOrStr] = [1, 1, 1];
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  if (String(seconds).length === 1) {
    valueToBeReturned[2] = `0${seconds}`;
  } else {
    valueToBeReturned[2] = seconds;
  }
  if (String(minutes).length === 1) {
    valueToBeReturned[1] = `0${minutes}`;
  } else {
    valueToBeReturned[1] = minutes;
  }
  if (String(hours).length === 1) {
    valueToBeReturned[0] = `0${hours}`;
  } else {
    valueToBeReturned[0] = hours;
  }
  return valueToBeReturned;
};

const encryptScheme: any = {
  "`": "~",
  "~": "`",
  "1": "!",
  "!": "1",
  "2": "@",
  "@": "2",
  "3": "#",
  "#": "3",
  "4": "$",
  $: "4",
  "5": "%",
  "%": "5",
  "6": "^",
  "^": "6",
  "7": "&",
  "&": "7",
  "8": "*",
  "*": "8",
  "9": "(",
  "(": "9",
  "0": ")",
  ")": "0",
  "-": "_",
  _: "-",
  "+": "=",
  "=": "+",
  q: "a",
  a: "q",
  Q: "A",
  A: "Q",
  w: "s",
  s: "w",
  W: "S",
  S: "W",
  e: "d",
  d: "e",
  E: "D",
  D: "E",
  r: "f",
  f: "r",
  R: "F",
  F: "R",
  t: "g",
  g: "t",
  T: "G",
  G: "T",
  y: "h",
  h: "y",
  Y: "H",
  H: "Y",
  u: "j",
  j: "u",
  U: "J",
  J: "U",
  i: "k",
  k: "i",
  I: "K",
  K: "I",
  o: "l",
  l: "o",
  O: "L",
  L: "O",
  p: "p",
  P: "P",
  " ": " ",
  "[": "{",
  "{": "[",
  "}": "]",
  "]": "}",
  "\\": "|",
  "|": "\\",
  ";": ":",
  ":": ";",
  '"': "'",
  "'": '"',
  "<": ">",
  ">": "<",
  ",": ".",
  ".": ",",
  "/": "?",
  "?": "/",
  "": "",
};

const decryptScheme: any = {
  "0": ")",
  "1": "!",
  "2": "@",
  "3": "#",
  "4": "$",
  "5": "%",
  "6": "^",
  "7": "&",
  "8": "*",
  "9": "(",
  ")": "0",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  "~": "`",
  "`": "~",
  _: "-",
  "-": "_",
  "=": "+",
  "+": "=",
  a: "q",
  q: "a",
  A: "Q",
  Q: "A",
  s: "w",
  w: "s",
  S: "W",
  W: "S",
  d: "e",
  e: "d",
  D: "E",
  E: "D",
  f: "r",
  r: "f",
  F: "R",
  R: "F",
  g: "t",
  t: "g",
  G: "T",
  T: "G",
  h: "y",
  y: "h",
  H: "Y",
  Y: "H",
  j: "u",
  u: "j",
  J: "U",
  U: "J",
  k: "i",
  i: "k",
  K: "I",
  I: "K",
  l: "o",
  o: "l",
  L: "O",
  O: "L",
  p: "p",
  P: "P",
  " ": " ",
  "{": "[",
  "[": "{",
  "]": "}",
  "}": "]",
  "|": "\\",
  "\\": "|",
  ":": ";",
  ";": ":",
  "'": '"',
  '"': "'",
  ">": "<",
  "<": ">",
  ".": ",",
  ",": ".",
  "?": "/",
  "/": "?",
  "": "",
};

export const encrypt: (string: string) => string = (string: string) => {
  let valueToBeReturned = "";
  for (let i = 0; i < string.length; i++) {
    if (encryptScheme[string[i]] !== undefined) {
      valueToBeReturned += encryptScheme[string[i]];
    } else {
      valueToBeReturned += string[i];
    }
  }
  return valueToBeReturned;
};
export const decrypt: (string: string) => string = (string: string) => {
  let valueToBeReturned = "";
  for (let i = 0; i < string.length; i++) {
    if (decryptScheme[string[i]] !== undefined) {
      valueToBeReturned += encryptScheme[string[i]];
    } else {
      valueToBeReturned += string[i];
    }
  }
  return valueToBeReturned;
};

type boolArrAndFunc = [boolean, any];
export const useSharedPanelValue: () => {
  users: boolArrAndFunc,
  share: boolArrAndFunc,
  emoji: boolArrAndFunc,
  images: boolArrAndFunc,
  gifs: boolArrAndFunc,
} = () => {


  const [usersOpen, setUsersOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [imgsOpen, setImgsOpen] = useState<boolean>(false);
  const [gifsOpen, setGifsOpen] = useState<boolean>(false);

  return {

    users: [usersOpen, setUsersOpen],
    share: [shareOpen, setShareOpen],
    emoji: [emojiOpen, setEmojiOpen],
    images: [imgsOpen, setImgsOpen],
    gifs: [gifsOpen, setGifsOpen],

  }
}
