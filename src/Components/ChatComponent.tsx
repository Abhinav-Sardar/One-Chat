import { memo, useContext } from "react";
import {
  FC,
  useState,
  useEffect,
  FormEvent,
  useRef,
  createContext,
} from "react";
import { AiFillFileImage, AiOutlineUser } from "react-icons/ai";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import io from "socket.io-client";

import { ScrollWrapper as Scroll } from "react-bottom-scroll";
import {
  FaRegSmile,
  FaSmile,
  FaUser,
  FaShareAlt,
  FaSun,
  FaMoon,
  FaMusic,
} from "react-icons/fa";

import { FiShare2 } from "react-icons/fi";
import { useSpring, useTransition } from "react-spring";
import { ToastContainer, toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { SelfClientContext } from "../App";
import {
  user,
  ChatUser,
  Animations,
  userInfoStorageKey,
  exitFullScreen,
  goFullScreen,
  constants,
} from "../Constants";
import {
  ChatPage,
  RemainingChatArea,
  ChatArea,
  UsersSection,
  SharePanel,
  MeetControls,
  EmojiPanel,
} from "../Styled-components/Chat.style";
import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
  EmojiPanelInfo,
} from "./Chat.SubComponents";
import { MessageGenerator } from "../Constants";
import { Pop } from "./Images/Accumulator";
const { config } = Animations;
const socket = io(constants.serverName);
console.log(socket);
export const MessageContext = createContext<any>(null);
const ChatComponent: FC = () => {
  const footerAndHeaderExpander = useSpring({
    from: {
      width: "0vw",
    },
    to: {
      width: "100vw",
    },
  });

  const [usersOpen, setUsersOpen] = useState<boolean>(false);
  const [shareOpen, setShareOpen] = useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"#fff" | "#232424">("#fff");
  const [user, setUser] = useContext(SelfClientContext);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [text, setText] = useState<any>("");
  const MsgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);

  const socketCode = () => {
    socket.emit("new-user", {
      name: user.name,
      roomName: user.currentRoomName,
      profilePic: user.avatarSvg,
    });
    socket.on("room-info", (newUsers) => {
      setUsers(newUsers);
    });
    socket.on("user-left", (leftUser, newUsers) => {
      setUsers(newUsers);
    });
    socket.on("message", (newMessage) => {
      // @ts-ignore
      MsgsRef.current.innerHTML += MessageGenerator(
        newMessage.children,
        "Incoming",

        //@ts-ignore
        newMessage.profilePic,
        new Date(newMessage.dateSentAt),
        newMessage.author
      );
      Pop.play();
      //@ts-ignore
      inputRef.current.focus();
    });
  };
  useEffect(() => {
    document.title = `Room - ${user.currentRoomName}`;
    socketCode();
    //eslint-disable-next-line
  }, []);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    //@ts-ignore
    if (text === "") {
      toast.error("Invalid message!");
    } else {
      // @ts-ignore
      MsgsRef.current.innerHTML += MessageGenerator(
        text,
        "Outgoing",
        user.avatarSvg,
        new Date(),
        "You"
      );
      Pop.play();

      socket.emit("message", {
        //@ts-ignore
        children: text,
        author: user.name,
        dateSentAt: new Date().toLocaleDateString(),
        profilePic: user.avatarSvg,
      });
      setText("");
      // @ts-ignore
    }
  }

  function Icons(): JSX.Element {
    return (
      <>
        <ReactTooltip
          place='top'
          type={theme === "#232424" ? "light" : "dark"}
          effect='solid'
        />
        {!emojiOpen ? (
          <FaRegSmile
            onClick={() => setEmojiOpen(!emojiOpen)}
            data-tip='Emojis'
          />
        ) : (
          <FaSmile
            onClick={() => setEmojiOpen(!emojiOpen)}
            data-tip='Close Emojis'
          />
        )}
        <AiFillFileImage data-tip='Image Upload' />
        ``
        {!usersOpen ? (
          <AiOutlineUser
            data-tip='Users'
            onClick={() => {
              setUsersOpen(!usersOpen);
            }}
          />
        ) : (
          <FaUser
            onClick={() => {
              setUsersOpen(!usersOpen);
            }}
            data-tip='Close Users'
          />
        )}
        {!shareOpen ? (
          <FiShare2
            onClick={() => {
              setShareOpen(!shareOpen);
            }}
            data-tip='Share'
          />
        ) : (
          <FaShareAlt
            onClick={() => {
              setShareOpen(!shareOpen);
            }}
            data-tip='Close Share'
          />
        )}
        {theme === "#fff" ? (
          <FaMoon
            onClick={() => {
              setTheme("#232424");
            }}
            data-tip='Dark Theme'
          />
        ) : (
          <FaSun
            onClick={() => {
              setTheme("#fff");
            }}
            data-tip='Light Theme'
          />
        )}
        {isFullScreen ? (
          <FiMinimize
            data-tip='Minimize'
            onClick={() => {
              setIsFullScreen(false);
              exitFullScreen();
            }}
          />
        ) : (
          <FiMaximize
            data-tip='Maximize'
            onClick={() => {
              setIsFullScreen(true);
              goFullScreen();
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
    from: {
      opacity: 0,
      backgroundColor: "white",
    },
    to: {
      opacity: 1,
      backgroundColor: theme,
    },
  });
  const colorSetter = useSpring({
    color: theme === "#232424" ? "#fff" : "#232424",
    border: `1px solid ${theme === "#232424" ? "#fff" : "#232424"}`,
    borderRight: "none",
  });

  const usersTransition = useTransition(usersOpen, config);
  const shareTransition = useTransition(shareOpen, config);
  const emojiTransition = useTransition(emojiOpen, config);
  const LeaveRoom = () => {
    window.location.assign("/");
  };
  return (
    <>
      <ChatPage style={backgroundAnimation}>
        <ChatHeader roomName={user.currentRoomName} onClick={LeaveRoom} />
        <RemainingChatArea style={colorSetter}>
          <ChatArea theme={theme === "#232424" ? "#fff" : "#232424"}>
            <Scroll
              wrapperStyle={{
                width: "100%",
                overflowY: "auto",
                height: "100%",
              }}
              smoothBehavior
            >
              <div className='mainChat' ref={MsgsRef}></div>
            </Scroll>
          </ChatArea>

          {usersTransition((style, item) => {
            return item ? (
              <>
                <UsersSection style={style}>
                  <SidePanelHeaderComponent onClose={() => setUsersOpen(false)}>
                    <span> Users In Chat</span>
                  </SidePanelHeaderComponent>

                  <UsersPanelInfo
                    users={users}
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
                  roomName={user.currentRoomName}
                />
              </SharePanel>
            ) : (
              ""
            );
          })}
          {emojiTransition((style, item) => {
            return item ? (
              <EmojiPanel style={style}>
                <SidePanelHeaderComponent
                  onClose={() => setEmojiOpen(false)}
                  style={{
                    borderBottom: `1px solid ${
                      theme === "#232424" ? "#fff" : "#232424"
                    }`,
                  }}
                >
                  Emojis
                </SidePanelHeaderComponent>
                <MessageContext.Provider value={setText}>
                  <EmojiPanelInfo />
                </MessageContext.Provider>
              </EmojiPanel>
            ) : (
              ""
            );
          })}
        </RemainingChatArea>

        <MeetControls style={footerAndHeaderExpander}>
          <form className='input' onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              name=''
              id=''
              spellCheck={false}
              value={text}
              onChange={(e) => setText(e.target.value)}
              //@ts-ignore
              ref={inputRef}
            />
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
