import { useEffect, useState, useContext } from "react";
import { FC } from "react";
import { Redirect, useParams } from "react-router-dom";

import { user, userInfoStorageKey } from "../Constants";
import parsed from "html-react-parser";
import {
  ChatArea,
  ChatPage,
  MeetControls,
  RemainingChatArea,
} from "../Styled-components/Chat.style";
import JoinRoom from "./JoinRoom";
import NotFoundPage from "./NotFound";

const Chat: FC = () => {
  //@ts-ignore
  const [userStatus, setStatus] = useState<
    "NoInfo" | null | user | "WrongRoom" | "AllFine"
  >(null);
  useEffect(() => {
    document.getElementById(
      "icon"
      //@ts-ignore
    )!.href = `${window.location.origin}/comments-solid.svg`;
  }, []);

  useEffect(() => {
    const userInfo = sessionStorage.getItem(userInfoStorageKey);
    //@ts-ignore
    const parsed: user | null = JSON.parse(userInfo);
    if (parsed) {
      setStatus("AllFine");
      console.log(parsed.name);
      console.log(parsed.currentRoomName);
    } else {
      setStatus("NoInfo");
    }
  }, []);
  //@ts-ignore
  const { roomId } = useParams();
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

const ChatComponent: FC = () => {
  const [client, setClient] = useState<user>(
    //@ts-ignore
    JSON.parse(sessionStorage.getItem(userInfoStorageKey))
  );
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [svgURl, setSvgUrl] = useState<string>("");
  useEffect(() => {
    setName(client.name);
    setRoom(client.currentRoomName);
    setSvgUrl(client.avatarSvg);
  }, [client]);
  return (
    <>
      <ChatPage>
        <RemainingChatArea>
          <ChatArea>
            <div className="mainChat"></div>
          </ChatArea>
        </RemainingChatArea>

        <MeetControls>
          <form className="input">
            <input type="text" name="" id="" />
            <button type="submit">Submit</button>
          </form>
          <div className="icons">icons here</div>
        </MeetControls>
      </ChatPage>
    </>
  );
};
