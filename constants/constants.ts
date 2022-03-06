import * as style from "@dicebear/avatars-avataaars-sprites";
import { createAvatar } from "@dicebear/avatars";
import { ClientRequest } from "http";
import { ClientAvatar, HangerBtnsType, ToastMessage, User } from "./Types";
import { Variants } from "framer-motion";
import { IconType } from "react-icons";
import { FaRegSmile, FaRegImage } from "react-icons/fa";
import { RiFileGifLine } from "react-icons/ri";
import { useContext } from "react";
import { ToastContext } from "./Context";
const varaints: { [key: string]: Variants } = {
  modalVariants: {
    initial: {
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  modalOverlayVariants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  sidePanelVaraints: {
    initial: {
      opacity: 0,
      width: 0,
    },

    animate: {
      opacity: 1,
      width: "30%",
    },
  },
  emojisContainerVariants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
  },
};
const OptionsPanelInfo: {
  type: HangerBtnsType;
  Icon: IconType;
}[] = [
  {
    type: "Emojis",
    Icon: FaRegSmile,
  },
  {
    type: "Gifs",
    Icon: RiFileGifLine,
  },

  {
    type: "Images",
    Icon: FaRegImage,
  },
  {
    type: "theme",
    // @ts-ignore
    Icon: null,
  },
];
const config = {
  localStoragePrefix: "ONE-CHAT-",
  accentColor: "#bd14ca",
  appName: "One-Chat",
  serverURls: {
    socket: "http://localhost:1919",
    rooms: "http://localhost:1919/rooms/",
  },
  varaints,
  OptionsPanelInfo,
};
export const getConstants = () => {
  return config;
};
export const getRandomKey: () => string = () => {
  const alphas = "abcdefghijklmnopqrstuvwxyz";
  const capitalize = alphas.toUpperCase();
  const nums = "1234567890";
  const symbols = "!@#$%^&*()_+-=[]{}<>,./?";
  const fields = [alphas, capitalize, nums, symbols];
  let char = "";
  for (let i = 0; i < 30; i++) {
    const randomField = fields[Math.floor(Math.random() * fields.length)];

    const randomCharacter = randomField[Math.floor(Math.random() * randomField.length)];
    char += randomCharacter;
  }
  return char;
};

export function validateText(input: string, length: number, messageAlias: string): Promise<string> {
  return new Promise((res, rej) => {
    if (!input || !input.trim()) {
      rej(`Invalid ${messageAlias}`);
    } else if (input.length > length) {
      rej(`${messageAlias} is too long`);
    } else {
      res("Sucess!");
    }
  });
}

export const getAvatars: () => ClientAvatar[] = () => {
  let avatars: ClientAvatar[] = [];
  for (let i = 0; i < 60; i++) {
    avatars.push({ avatar: createAvatar(style), id: getRandomKey() });
  }
  return avatars;
};
function pad(string: string | number): string {
  return String(string).padStart(2, "0");
}
export const formatDate: (date: Date, includeSeconds: boolean) => string = (date, includeSeconds) => {
  let hours: number | string = date.getHours();
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  if (hours > 12) {
    hours = pad(hours - 12);
  } else {
    hours = pad(hours);
  }
  return `${hours}:${minutes}${includeSeconds ? `:${seconds}` : ""} ${date.getHours() > 12 ? "PM" : "AM"}`;
};
export const useAddToast: () => (message: string, type: ToastMessage["type"]) => void = () => {
  const [, setToasts] = useContext(ToastContext);
  return (message: string, type: ToastMessage["type"]) => {
    setToasts(toasts => [...toasts, { content: message, type, id: getRandomKey() }]);
  };
};

export const defaultUserValue: User = {
  avatar: "",
  id: "dbeeofroefoerbforerbfoerbgoeboge",
  name: "ladwa lassun",
  room: "HELLO123",
  host: false,
};
