import * as classicStyle from "@dicebear/avatars-avataaars-sprites";
import * as adventurerStyle from "@dicebear/adventurer";
import * as comicStyle from "@dicebear/micah";
import { createAvatar, Style } from "@dicebear/avatars";
import { ClientRequest } from "http";
const avatarCategories = ["Classic", "Adventurer", "Comic"] as const;
export type ClientAvatar = { avatar: string; kind: typeof avatarCategories[number]; id: string };

const config = {
  localStoragePrefix: "ONE-CHAT-",
  accentColor: "#bd14ca",
  appName: "One-Chat",
  avatarCategories: avatarCategories,
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
export const getAvatars: () => ClientAvatar[][] = () => {
  let adventurers: ClientAvatar[] = [];
  let classics: ClientAvatar[] = [];
  let comics: ClientAvatar[] = [];
  const fields = [adventurers, classics, comics];
  const fieldsInfo: [ClientAvatar["kind"], Style<{}>][] = [
    ["Adventurer", adventurerStyle],
    ["Classic", classicStyle],
    ["Comic", comicStyle],
  ];
  for (let i1 = 0; i1 < 3; i1++) {
    const currentField = fields[i1];
    for (let i2 = 0; i2 < 48; i2++) {
      currentField.push({
        avatar: createAvatar(fieldsInfo[i1][1]),
        kind: fieldsInfo[i1][0],
        id: getRandomKey(),
      });
    }
  }

  return fields;
};
