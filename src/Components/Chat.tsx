import { useEffect, useState, useContext, FormEvent } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import ChatComponent from "./ChatComponent";
import { SelfClientContext } from "../App";

import JoinRoom from "./JoinRoom";

const Chat: FC = () => {
  const [user, _] = useContext(SelfClientContext);
  const [infoThere, setInfoThere] = useState<boolean>(false);
  //@ts-ignore
  const { roomId } = useParams();
  useEffect(() => {
    if (
      user.avatarSvg !== "" &&
      user.name !== "" &&
      user.currentRoomName !== ""
    ) {
      setInfoThere(true);
    } else {
      setInfoThere(false);
    }
  }, []);
  //@ts-ignore
  return (
    <>
      {infoThere ? (
        <ChatComponent />
      ) : (
        <JoinRoom isAuth={true} roomName={roomId} />
      )}
    </>
  );
};

export default Chat;
