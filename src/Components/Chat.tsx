import { useEffect, useState, useContext } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";

import ChatComponent from "./ChatComponent";
import { SelfClientContext } from "../Context";

import JoinRoom from "./JoinRoom";

const Chat: FC = () => {
  const [user, _] = useContext(SelfClientContext);
  const [infoThere, setInfoThere] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean | "Join">(null);
  //@ts-ignore
  const { roomId } = useParams();
  useEffect(() => {
    if (
      user.avatarSvg !== "" &&
      user.name !== "" &&
      user.currentRoomName !== "" &&
      (user.hasCreatedPrivateRoom === "Join" ||
        typeof user.hasCreatedPrivateRoom === "boolean")
    ) {
      setIsPrivate(user.hasCreatedPrivateRoom);
      setInfoThere(true);
    } else {
      setInfoThere(false);
    }
  }, []);

  return (
    <>
      {infoThere ? (
        <ChatComponent isPrivate={isPrivate} />
      ) : (
        <JoinRoom isAuth={true} roomName={roomId} />
      )}
    </>
  );
};

export default Chat;
