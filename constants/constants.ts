type configKeys = keyof typeof config;
type configKeysArray = Array<configKeys>;
const config = {
  localStoragePrefix: "ONE-CHAT-",
  accentColor: "#bd14ca",
  appName: "One-Chat",
};

export const getConstants = (param: configKeys | configKeysArray) => {
  if (typeof param === "string") {
    return config[param];
  } else {
    return param.map(p => config[p]);
  }
};
