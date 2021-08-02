import { useEffect, useState, useContext, FormEvent } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { user, userInfoStorageKey } from "../Constants";
import ChatComponent from "./ChatComponent";

import JoinRoom from "./JoinRoom";
import NotFoundPage from "./NotFound";

const Chat: FC = () => {
  //@ts-ignore
  const { roomId } = useParams();
  const [userStatus, setStatus] = useState<
    "NoInfo" | null | user | "WrongRoom" | "AllFine"
  >(null);

  useEffect(() => {
    const userInfo = sessionStorage.getItem(userInfoStorageKey);
    //@ts-ignore
    const parsed: user | null = JSON.parse(userInfo);
    if (parsed) {
      if (roomId === parsed.currentRoomName) {
        setStatus("AllFine");
        console.log(parsed.name);
        console.log(parsed.currentRoomName);
      } else {
        setStatus("NoInfo");
      }
    } else {
      setStatus("NoInfo");
    }
  }, []);
  //@ts-ignore
  return (
    <>
      {userStatus === "NoInfo" ? (
        //@ts-ignore
        <JoinRoom isAuth={true} roomName={roomId} />
      ) : userStatus === "WrongRoom" ? (
        <NotFoundPage isRoomError={true} />
      ) : userStatus === "AllFine" ? (
        <ChatComponent />
      ) : (
        ""
      )}
    </>
  );
};

export default Chat;
