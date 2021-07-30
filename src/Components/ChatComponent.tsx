import { FC, useState, useEffect, FormEvent } from "react";
import {
  AiFillFileImage,
  AiOutlineUser,
  AiOutlineInfoCircle,
  AiFillInfoCircle,
} from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import {
  FaRegSmile,
  FaSmile,
  FaUser,
  FaShareAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import { FiShare2 } from "react-icons/fi";
import { useSpring, useTransition } from "react-spring";
import { ToastContainer } from "react-toastify";
import { user, ChatUser, Animations, userInfoStorageKey } from "../Constants";
import {
  ChatPage,
  RemainingChatArea,
  ChatArea,
  UsersSection,
  SharePanel,
  MeetControls,
} from "../Styled-components/Chat.style";
import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
} from "./Chat.SubComponents";

const { config } = Animations;
const ChatComponent: FC = () => {
  const footerAndHeaderExpander = useSpring({
    from: {
      width: "0vw",
    },
    to: {
      width: "100vw",
    },
  });
  const [client, setClient] = useState<user>(
    //@ts-ignore
    JSON.parse(sessionStorage.getItem(userInfoStorageKey))
  );
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [svgURl, setSvgUrl] = useState<string>("");
  const [usersOpen, setUsersOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
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
      setUsersOpen(false);
    }
  }, [emojiOpen]);
  useEffect(() => {
    if (shareOpen === true) {
      setEmojiOpen(false);
      setUsersOpen(false);
    }
  }, [shareOpen]);

  useEffect(() => {
    if (usersOpen === true) {
      setShareOpen(false);
      setEmojiOpen(false);
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

  const usersTransition = useTransition(usersOpen, config);
  const shareTransition = useTransition(shareOpen, config);
  const LeaveRoom = () => {
    window.location.assign("/");
  };
  return (
    <>
      <ChatPage style={backgroundAnimation}>
        <ChatHeader roomName={room} onClick={LeaveRoom} />
        <RemainingChatArea style={colorSetter}>
          <ChatArea theme={theme === "#232424" ? "#fff" : "#232424"}>
            <div className='mainChat'>
              <h1>{room}</h1>
            </div>
          </ChatArea>

          {usersTransition((style, item) => {
            return item ? (
              <>
                <UsersSection style={style}>
                  <SidePanelHeaderComponent onClose={() => setUsersOpen(false)}>
                    <span> Users In Chat</span>
                  </SidePanelHeaderComponent>
                  <div
                    className='length'
                    style={{
                      borderTop: `1px solid ${
                        theme === "#232424" ? "#fff" : "#232424"
                      }`,
                    }}
                  >
                    Number Of Users :{dummmyUsers.length}
                  </div>

                  <UsersPanelInfo
                    users={dummmyUsers}
                    theme={theme === "#232424" ? "#fff" : "#232424"}
                  />
                </UsersSection>
              </>
            ) : (
              ""
            );
          })}
          {shareTransition((style, item) => {
            return item ? (
              <SharePanel style={style}>
                <SharePanelInfo
                  onClose={() => setShareOpen(false)}
                  theme={theme === "#232424" ? "#fff" : "#232424"}
                  roomName={room}
                />
              </SharePanel>
            ) : (
              ""
            );
          })}
        </RemainingChatArea>

        <MeetControls style={footerAndHeaderExpander}>
          <form className='input' onSubmit={(e) => handleSubmit(e)}>
            <input type='text' name='' id='' spellCheck={false} />
            <button type='submit'>
              <BiSend />
            </button>
          </form>
          <div className='icons'>
            <Icons />
          </div>
        </MeetControls>
      </ChatPage>
      <ToastContainer
        draggable={false}
        pauseOnHover={false}
        closeOnClick={false}
      />
    </>
  );
};
export default ChatComponent;
