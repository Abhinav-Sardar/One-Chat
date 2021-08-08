import { useEffect, useState, useContext, FormEvent } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { user, userInfoStorageKey } from "../Constants";
import ChatComponent from "./ChatComponent";
import { SelfClientContext } from "../App";

import JoinRoom from "./JoinRoom";

const Chat: FC = () => {
  const [user, _] = useContext(SelfClientContext);
  //@ts-ignore
  const { roomId } = useParams();
  const [userStatus, setStatus] = useState<"NoInfo" | null | user | "AllFine">(
    null
  );

  useEffect(() => {
    if (user.avatarSvg && user.currentRoomName && user.name) {
      setStatus("AllFine");
    } else {
      setStatus("NoInfo");
    }
  }, [user.avatarSvg, user.currentRoomName, user.name]);
  //@ts-ignore
  return (
    <>
      {userStatus === "NoInfo" ? (
        //@ts-ignore
        <JoinRoom isAuth={true} roomName={roomId} />
      ) : userStatus === "AllFine" ? (
        <ChatComponent />
      ) : (
        ""
      )}
    </>
  );
};

export default Chat;
