import { useEffect, useState, useContext, FormEvent } from "react";
import { FC } from "react";
import { Redirect, useParams } from "react-router-dom";

import { user, userInfoStorageKey } from "../Constants";
import parsed from "html-react-parser";
import {
  FaUserAlt,
  FaShareAlt,
  FaRegSmile,
  FaSmile,
  FaUser,
} from "react-icons/fa";
import { GrShareOption } from "react-icons/gr";
import {
  AiFillInfoCircle,
  AiFillFileImage,
  AiOutlineUser,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
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
  const [usersOpen, setUsersOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  useEffect(() => {
    setName(client.name.trimStart().trimEnd());
    setRoom(client.currentRoomName.trimStart().trimEnd());
    setSvgUrl(client.avatarSvg);
  }, [client]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
  }

  function Icons(): JSX.Element {
    return (
      <>
        {!emojiOpen ? (
          <FaRegSmile onClick={() => setEmojiOpen(!emojiOpen)} />
        ) : (
          <FaSmile onClick={() => setEmojiOpen(!emojiOpen)} />
        )}
        <AiFillFileImage />

        {!usersOpen ? (
          <AiOutlineUser
            onClick={() => {
              setUsersOpen(!usersOpen);
            }}
          />
        ) : (
          <FaUser
            onClick={() => {
              setUsersOpen(!usersOpen);
            }}
          />
        )}
        {!shareOpen ? (
          <FiShare2
            onClick={() => {
              setShareOpen(!shareOpen);
            }}
          />
        ) : (
          <FaShareAlt
            onClick={() => {
              setShareOpen(!shareOpen);
            }}
          />
        )}
        {!infoOpen ? (
          <AiOutlineInfoCircle
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
          />
        ) : (
          <AiFillInfoCircle
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <ChatPage>
        <RemainingChatArea>
          <ChatArea>
            <div className="mainChat">
              <h1>{room}</h1>
            </div>
          </ChatArea>
        </RemainingChatArea>

        <MeetControls>
          <form className="input" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="" id="" />
            <button type="submit">
              <BiSend />
            </button>
          </form>
          <div className="icons">
            <Icons />
          </div>
        </MeetControls>
      </ChatPage>
    </>
  );
};
