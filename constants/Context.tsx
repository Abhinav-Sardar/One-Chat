import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { ChatContextType, ToastMessage, User } from "./Types";
const UserContext = createContext<[User | null, Dispatch<SetStateAction<User | null>>]>([null, () => {}]);
export const UserContextProvider: FC = ({ children }) => {
  const userState = useState<User | null>(null);
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
// @ts-ignore
export const ChatContext = createContext<ChatContextType>({});
export const useChat = (): ChatContextType => useContext(ChatContext);
export const ToastContext = createContext<[ToastMessage[], Dispatch<SetStateAction<ToastMessage[]>>]>([[], () => {}]);
export const ToastProvider: FC = ({ children }) => {
  const toastState = useState<ToastMessage[]>([]);
  return <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>;
};
