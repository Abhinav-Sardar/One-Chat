import { useContext } from "react";
import {
  FC,
  useState,
  useEffect,
  FormEvent,
  useRef,
  createContext,
} from "react";
import {
  AiFillFileImage,
  AiOutlineUser,
  AiOutlineFileImage,
} from "react-icons/ai";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { BiSend } from "react-icons/bi";
import { useHistory } from "react-router";
import io from "socket.io-client";
//@ts-ignore
import Scroll from "react-scroll-to-bottom";

import {
  FaRegSmile,
  FaSmile,
  FaUser,
  FaShareAlt,
  FaSun,
  FaMoon,
  FaTrashAlt,
  FaTimes,
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
  exitFullScreen,
  goFullScreen,
  constants,
  Message,
  getRandomKey,
} from "../Constants";
import {
  ChatPage,
  RemainingChatArea,
  ChatArea,
  UsersSection,
  SharePanel,
  MeetControls,
  EmojiPanel,
  ImagesPanel,
} from "../Styled-components/Chat.style";
import { Modal } from "react-responsive-modal";
import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
  EmojiPanelInfo,
  MessageComponent,
  ImagesContent,
} from "./Chat.SubComponents";
//@ts-ignore

import { Pop } from "../Images/Accumulator";

const { config } = Animations;
//@ts-ignore
const socket = io.connect(constants.serverName);

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
  const [imgsOpen, setImgsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"#fff" | "#232424">("#fff");
  const history = useHistory();
  const user = useContext(SelfClientContext)[0];
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const ScrollRef = useRef(null);
  const inputRef = useRef(null);
  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    document.title = `Room - ${user.currentRoomName}`;
    socketCode();
    setInterval(() => {
      setIsFullScreen(document.fullscreenElement ? true : false);
    }, 500);
  }, []);
  useEffect(() => {
    sessionStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    if (inputRef.current.value === "" || !inputRef.current.value.trim()) {
      toast.error("Invalid message!");
    } else if (inputRef.current.value.length >= 500) {
      toast.error("Message Length Too Long !");
    } else {
      const newMessage: Message = {
        author: user.name,

        created_at: new Date(),
        accentColor: constants.appAccentColor,
        content: inputRef.current.value,
        type: "text",
        className: "Outgoing",
        profilePic: user.avatarSvg,
      };
      setMsgs((p) => [...p, newMessage]);
      Pop.play();
      socket.emit("message", { ...newMessage, className: "Incoming" });
      inputRef.current.value = "";
      inputRef.current.focus();
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
        {imgsOpen ? (
          <AiFillFileImage
            data-tip='Close Images'
            onClick={() => setImgsOpen(false)}
          />
        ) : (
          <AiOutlineFileImage
            data-tip='Open Images'
            onClick={() => {
              setImgsOpen(true);
            }}
          />
        )}

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
        <FaTrashAlt data-tip='Clear Chat' onClick={() => setMsgs([])} />
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
      setImgsOpen(false);
    }
  }, [emojiOpen]);
  useEffect(() => {
    if (imgsOpen === true) {
      setShareOpen(false);
      setUsersOpen(false);
      setEmojiOpen(false);
    }
  }, [imgsOpen]);
  useEffect(() => {
    if (shareOpen === true) {
      setEmojiOpen(false);
      setUsersOpen(false);
      setImgsOpen(false);
    }
  }, [shareOpen]);

  useEffect(() => {
    if (usersOpen === true) {
      setShareOpen(false);
      setEmojiOpen(false);
      setImgsOpen(false);
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
  const imagesTransition = useTransition(imgsOpen, config);
  const LeaveRoom = () => {
    history.push("/");
    sessionStorage.clear();
    //@ts-ignore
    socket.disconnect(true);
  };

  const socketCode = () => {
    socket.emit("new-user", {
      name: user.name,
      roomName: user.currentRoomName,
      profilePic: user.avatarSvg,
    });
    socket.on("room-info", (newUsers: ChatUser[]) => {
      setUsers(newUsers);
    });
    socket.on("user-left", (leftUser: string, newUsers: ChatUser[]) => {
      setUsers(newUsers);
    });
    socket.on("message", (newMessage: Message) => {
      const parsed: ChatUser[] = JSON.parse(sessionStorage.getItem("users"));
      setMsgs((p) => [
        ...p,
        {
          ...newMessage,
          created_at: new Date(newMessage.created_at),
          profilePic: parsed.find((p) => p.name === newMessage.author)
            .profilePic,
        },
      ]);
      Pop.play();
    });
    socket.on("new-user-join", (mems: ChatUser[], user: string) => {
      setUsers(mems);
      // setMsgs((p) => [
      //   ...p,
      //   {
      //     className: "Entered",
      //     content: `${user} Joined The Chat.`,
      //     type: "tooltip",
      //   },
      // ]);
    });
  };
  return (
    <>
      <ChatPage style={backgroundAnimation}>
        <ChatHeader roomName={user.currentRoomName} onClick={LeaveRoom} />
        <RemainingChatArea style={colorSetter}>
          <ChatArea
            theme={theme === "#232424" ? "#fff" : "#232424"}
            ref={ScrollRef}
          >
            <Scroll className='rstb' followButtonClassName='scrollButton'>
              {msgs.length > 0 &&
                msgs.map((msg) => (
                  <MessageComponent
                    {...msg}
                    key={getRandomKey()}
                    content={msg.content}
                  />
                ))}
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
                <MessageContext.Provider value={inputRef.current}>
                  <EmojiPanelInfo />
                </MessageContext.Provider>
              </EmojiPanel>
            ) : (
              ""
            );
          })}
          {imagesTransition((style, item) => {
            return item ? (
              <>
                <ImagesPanel style={style}>
                  <SidePanelHeaderComponent
                    onClose={() => setImgsOpen(false)}
                    style={{
                      borderBottom: `1px solid ${
                        theme === "#232424" ? "#fff" : "#232424"
                      }`,
                    }}
                  >
                    Images
                  </SidePanelHeaderComponent>
                  <ImagesContent />
                </ImagesPanel>
              </>
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
              //@ts-ignore
              ref={inputRef}
              autoFocus
              placeholder='Say Something ...'
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
