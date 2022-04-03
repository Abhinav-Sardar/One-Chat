import { useRouter } from "next/router";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { ChatContextType, ReplyContextType, ToastMessage, User } from "./Types";
const defaultUserValue: User = {
  avatar: `<!--?xml version="1.0" standalone="no"?-->              <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">                    <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stop-color="rgba(255, 255, 255, 1)" offset="0%"></stop>                            <stop id="stop2" stop-color="rgba(189, 20, 202, 1)" offset="100%"></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M12.5,-24.2C16.4,-19.4,19.9,-16.4,21.2,-12.7C22.6,-9,21.9,-4.5,24.8,1.7C27.7,7.9,34.3,15.8,34.4,22.1C34.6,28.4,28.2,33.1,21.4,34.7C14.5,36.3,7.3,34.9,1.4,32.5C-4.5,30.1,-9.1,26.8,-14,24.1C-18.9,21.4,-24.2,19.2,-27.6,15.3C-31,11.4,-32.5,5.7,-30.7,1C-28.9,-3.6,-23.9,-7.2,-21.6,-13.2C-19.4,-19.2,-20,-27.5,-16.9,-32.7C-13.8,-38,-6.9,-40.3,-1.3,-38.1C4.3,-35.8,8.6,-29.1,12.5,-24.2Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style="transition: all 0.3s ease 0s;"></path>              </svg>`,
  id: "dbeeofroefoerbforerbfoerbgoeboge",
  name: "ladwa lassun",
  room: "HELLO123",
  host: false,
};

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([defaultUserValue, () => {}]);

export const UserContextProvider: FC = ({ children }) => {
  const userState = useState<User>(defaultUserValue);
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
// @ts-ignore
export const ChatContext = createContext<ChatContextType>({});
export const useChat = (): ChatContextType => useContext(ChatContext);
export const ToastContext = createContext<[ToastMessage[], Dispatch<SetStateAction<ToastMessage[]>>]>([[], () => {}]);
export const ToastProvider: FC = ({ children }) => {
  const router = useRouter();
  const toastState = useState<ToastMessage[]>([]);
  useEffect(() => {
    toastState[1]([]);
  }, [router.pathname]);
  return <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>;
};

const ReplyContext = createContext<[ReplyContextType, Dispatch<SetStateAction<ReplyContextType>>]>([
  { isOpen: false, message: null },
  () => {},
]);
export const ReplyStateProvider: FC = ({ children }) => {
  const [replyState, setReplyState] = useState<ReplyContextType>({ isOpen: false, message: null });
  return <ReplyContext.Provider value={[replyState, setReplyState]}>{children}</ReplyContext.Provider>;
};
export const useReplyState = () => useContext(ReplyContext);
