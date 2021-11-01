import { useContext, createContext, FC, useState } from "react";
import { initContextValue, reply, user } from "./Constants";

export const SelfClientContext = createContext<[user, any]>([
  {
    name: "",
    avatarSvg: "",
    currentRoomName: "",
    hasCreatedPrivateRoom: false,
  },
  "",
]);
export const SelfClientContextProvider: FC = ({ children }) => {
  const userState = useState<user>({
    name: "",
    avatarSvg: "",
    currentRoomName: "",
    hasCreatedPrivateRoom: false,
  });
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
