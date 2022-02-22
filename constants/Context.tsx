import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "./Types";
export const UserContext = createContext<[User | null, Dispatch<SetStateAction<User | null>>]>([null, () => {}]);
export const UserContextProvider: FC = ({ children }) => {
  const userState = useState<User | null>(null);
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
