type configKeys = keyof typeof config;
type configKeysArray = Array<configKeys>;
const config = {
  localStoragePrefix: "ONE-CHAT-",
  accentColor: "#bd14ca",
  appName: "One-Chat",
  avatarCategories: ["Classic", "Adventurer", , "Robots", "Comic"],
};
export const getConstants = (...args: configKeysArray) => {
  return args.map(arg => config[arg]);
};
