import * as style from "@dicebear/avatars-avataaars-sprites";
import { createAvatar } from "@dicebear/avatars";
import { ClientRequest } from "http";
import { ClientAvatar } from "./Types";
import { Variants } from "framer-motion";
const varaints: { [key: string]: Variants } = {
  modalVariants: {
    initial: {
      opacity: 0,
      y: 200,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: 200,
      transition: {
        duration: 0.5,
      },
    },
  },
  modalOverlayVariants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  },
};
const config = {
  localStoragePrefix: "ONE-CHAT-",
  accentColor: "#bd14ca",
  appName: "One-Chat",
  serverURls: {
    socket: "http://localhost:1919",
    rooms: "http://localhost:1919/rooms/",
  },
  varaints,
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
  for (let i = 0; i < 15; i++) {
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
  const hour = Number(pad(date.getHours() + 1));
  const minutes = pad(date.getMinutes() + 1);
  const seconds = pad(date.getSeconds() + 1);
  const ampm = hour > 12 ? "PM" : "AM";
  const hour12 = pad(hour > 12 ? hour - 12 : hour);
  return `${hour12}:${minutes}:${includeSeconds ? seconds : ""} ${ampm}`;
};
