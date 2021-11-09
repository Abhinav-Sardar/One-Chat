import { useContext, createContext, FC, useState } from "react";
import { initContextValue, reply, user } from "./Constants";

export const SelfClientContext = createContext<[user, any]>([
  initContextValue,
  "",
]);
export const SelfClientContextProvider: FC = ({ children }) => {
  const userState = useState<user>(initContextValue);
  return (
    <SelfClientContext.Provider value={userState}>
      {children}
    </SelfClientContext.Provider>
  );
};

export const ReplyContext = createContext<[reply, any]>([
  {
    isOpen: false,
    id: "",
    content: null,
  },
  "",
]);
