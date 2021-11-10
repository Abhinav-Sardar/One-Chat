import axios from "axios";
import React, { ReactElement, useState } from "react";
import { IconType } from "react-icons";
import { toast } from "react-toastify";

const devUrl = "http://localhost:1919/";
const prodUrl = "https://one-chat-server.herokuapp.com/";

export function accentColorChecker(): void {
  if (!localStorage.getItem(constants.ONE_CHAT_LOCAL_STORAGE_KEY)) {
    localStorage.setItem(constants.ONE_CHAT_LOCAL_STORAGE_KEY, "#bd14ca");
  } else if (
    localStorage.getItem(constants.ONE_CHAT_LOCAL_STORAGE_KEY) !==
    constants.appAccentColor
  ) {
    constants.appAccentColor = localStorage.getItem(
      constants.ONE_CHAT_LOCAL_STORAGE_KEY
    );
  } else {
    return;
  }
}

export type user = {
  name: string;
  currentRoomName: string;
  avatarSvg: string;
  hasCreatedPrivateRoom: boolean | "Join";
  isHost: boolean;
};

export type ChatUser = {
  profilePic: string;
  name: string;
  host: boolean;
  id: string;
};

export interface HeaderProps {
  onClick: () => void;
  onEnd: () => void;
}

export interface UsersInChatProps {
  theme: string;
  users: ChatUser[];
  onBan: (user: string, reason: string) => void;
  userId: string;
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
  let randomKey = "";
  for (let i = 0; i < 10; i++) {
    const randomArray = Math.floor(Math.random() * 3);
    const randomCharacter = Math.floor(Math.random() * 3);
    if (randomArray === 0) {
      randomKey += alphabets[randomCharacter];
    } else if (randomArray === 1) {
      randomKey += nums[randomCharacter];
    } else {
      randomKey += specialChars[randomCharacter];
    }
  }
  return `${Date.now()}${randomKey}`;
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
    //@ts-ignore
    document.msExitFullscreen();
  }
};

export function ReturnFormattedDate(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hoursFormatted = hours % 12;
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  return hoursFormatted + ":" + minutesFormatted + " " + ampm;
}
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
  id: string;
  to?: Message;
};

export const ToastContainerConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: false,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  duration: 4000,
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

export const config = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: {
    width: "25vw",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1.3,
    },
  },
  exit: {
    opacity: 0,
    width: 0,
    transition: {
      type: "tween",
      duration: 1,
    },
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
  isPrivate: boolean | "Join";
  membersLength?: number;
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
export const returnUpdatedDate = (): string => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hoursFormatted = String(hours).length === 1 ? `0${hours}` : hours;
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
  const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;
  return hoursFormatted + ":" + minutesFormatted + ":" + secondsFormatted;
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
  users: boolArrAndFunc;
  share: boolArrAndFunc;
  emoji: boolArrAndFunc;
  images: boolArrAndFunc;
  gifs: boolArrAndFunc;
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
  };
};
export const initContextValue: user = {
  name: "",
  avatarSvg: "",
  currentRoomName: "",
  hasCreatedPrivateRoom: false,
  isHost: false,
};
export type reply = {
  isOpen: boolean;
  id: string;
  content: Message;
};

export const clipText = (string: string, number: number) => {
  if (string.length > number) {
    return string.slice(0, number) + "...";
  } else {
    return string;
  }
};

export const scrollMessageIntoView = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    element.querySelector(".content").classList.add("pop");
    setTimeout(() => {
      element.querySelector(".content").classList.remove("pop");
    }, 2000);
  } else {
    toast.error("Message not found");
  }
};

export const messageVariants = {
  Incoming: {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  },
  Outgoing: {
    initial: {
      opacity: 0,
      x: "100vw",
    },

    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  },
};

const FaqsData: { title: string; content: string; isOpen: boolean }[] = [
  {
    title: "Does One-Chat store my chats somewhere ?",
    content:
      "No, chats are not stored anywhere. They get deleted automatically when all the people in a particular room leave.That is what we mean by One-Time chats.",
    isOpen: false,
  },
  {
    title: "How to join rooms ?",
    content:
      "There are two main ways of joining rooms. 1. By clicking on the Join Room button on the homepage and filling necessary information. 2. By pasting a share url of the room which can be obtained by anyone who is in the room. An example url: https://one-chat-v2.netlify.app/room/name-of-the-room",
    isOpen: false,
  },
  {
    title: "Is One-Chat safe ?",
    content:
      "Yes, One-Chat is safe. Safety and privacy was given immense importance during the developmment of the app. Messages are encrypted for safety and you can also create private rooms that won't be publicly displayed to other users.",
    isOpen: false,
  },
];

export const constants = {
  appAccentColor: localStorage.getItem("one-chat-accent-color") || "#bd14ca",
  serverName: process.env.NODE_ENV === "production" ? prodUrl : devUrl,

  copySuccess: "Copied ✅. Share this Url with anyone you trust",
  PEXELS_API_KEY: process.env.REACT_APP_PEXELS_API_KEY,
  imageInputErrorMsg:
    "The provided input was invalid or too long! The limit is 30",
  roomDoesntExistError: "A room with that name doesn't exist",
  roomAlreadyExistsError: "A room with same name already exists",
  tenorApiKey: process.env.REACT_APP_TENOR_API_KEY,
  nameAlreadyThere:
    "A person with the same name is already present in the room. Please try a different name.",
  ONE_CHAT_LOCAL_STORAGE_KEY: "one-chat-accent-color",
  replyFadedBg: "#d9d9d9",
  faqs: FaqsData,
  queryConfig: {
    retry: 3,
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
  },
  fetcher: async (url: string, isImgs: boolean) => {
    if (isImgs) {
      return (
        await axios.get(url, {
          headers: {
            Authorization: constants.PEXELS_API_KEY,
          },
        })
      ).data;
    } else {
      return (await axios.get(url)).data;
    }
  },
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
// export a function darkenColor which takes hex color  as an argument and returns a darker version of the color
export const darkenColor = (color: string, percent: number) => {
  var num = parseInt(color.slice(1), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    B = ((num >> 8) & 0x00ff) - amt,
    G = (num & 0x0000ff) - amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};
export interface PostChatProps {
  Icon: IconType;
  content: [string, string];
}
