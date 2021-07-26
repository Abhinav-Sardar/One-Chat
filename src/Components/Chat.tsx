import { useEffect, useState, useContext, FormEvent } from "react";
import { FC } from "react";
import { Redirect, useParams } from "react-router-dom";

import { ChatUser, constants, user, userInfoStorageKey } from "../Constants";
import parsed from "html-react-parser";
import {
  FaUserAlt,
  FaShareAlt,
  FaRegSmile,
  FaSmile,
  FaUser,
  FaMoon,
  FaSun,
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
  MeetControls,
  MeetInfo,
  RemainingChatArea,
  UsersSection,
} from "../Styled-components/Chat.style";
import JoinRoom from "./JoinRoom";
import NotFoundPage from "./NotFound";
import { useSpring, animated, useTransition } from "react-spring";
import { ChatHeader } from "./Chat.SubComponents";

const Chat: FC = () => {
  //@ts-ignore
  const { roomId } = useParams();
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
  const [theme, setTheme] = useState<"#fff" | "#232424">("#fff");
  const dummmyUsers: ChatUser[] = [
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
    {
      name: name,
      profilePic: svgURl,
    },
  ];
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
        {theme === "#fff" ? (
          <FaSun
            onClick={() => {
              setTheme("#232424");
            }}
          />
        ) : (
          <FaMoon
            onClick={() => {
              setTheme("#fff");
            }}
          />
        )}
      </>
    );
  }
  useEffect(() => {
    if (emojiOpen === true) {
      setShareOpen(false);
      setInfoOpen(false);
      setUsersOpen(false);
    }
  }, [emojiOpen]);
  useEffect(() => {
    if (shareOpen === true) {
      setEmojiOpen(false);
      setInfoOpen(false);
      setUsersOpen(false);
    }
  }, [shareOpen]);
  useEffect(() => {
    if (infoOpen === true) {
      setShareOpen(false);
      setEmojiOpen(false);
      setUsersOpen(false);
    }
  }, [infoOpen]);
  useEffect(() => {
    if (usersOpen === true) {
      setShareOpen(false);
      setEmojiOpen(false);
      setInfoOpen(false);
    }
  }, [usersOpen]);
  const backgroundAnimation = useSpring({
    backgroundColor: theme,
  });
  const colorSetter = useSpring({
    color: theme === "#232424" ? "#fff" : "#232424",
    border: `1px solid ${theme === "#232424" ? "#fff" : "#232424"}`,
    borderRight: "none",
  });
  const footerAndHeaderExpander = useSpring({
    from: {
      width: "0vw",
    },
    to: {
      width: "100vw",
    },
  });
  const usersTransition = useTransition(usersOpen, {
    from: {
      opacity: 0,
      width: "0vw",
    },
    enter: {
      opacity: 1,
      width: "25vw",
    },
    leave: {
      opacity: 0,
      width: "0vw",
    },
  });

  return (
    <>
      <animated.main style={backgroundAnimation} className="main__chat">
        <ChatHeader roomName={room} />
        <RemainingChatArea style={colorSetter}>
          <ChatArea>
            <div className="mainChat">
              <h1>{room}</h1>
            </div>
          </ChatArea>

          {
            //@ts-ignore
            usersTransition((style, item) => {
              return item ? <UsersSection style={style}>FFS</UsersSection> : "";
            })
          }
        </RemainingChatArea>

        <MeetControls style={footerAndHeaderExpander}>
          <form className="input" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="" id="" spellCheck={false} />
            <button type="submit">
              <BiSend />
            </button>
          </form>
          <div className="icons">
            <Icons />
          </div>
        </MeetControls>
      </animated.main>
    </>
  );
};
