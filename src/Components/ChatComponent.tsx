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
//@ts-ignore
import Scroll from "react-scroll-to-bottom";
import { BiExit } from "react-icons/bi";
import {
  FaRegSmile,
  FaSmile,
  FaUser,
  FaShareAlt,
  FaSun,
  FaMoon,
  FaMusic,
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
  userInfoStorageKey,
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
} from "../Styled-components/Chat.style";
import { Modal } from "react-responsive-modal";
import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
  EmojiPanelInfo,
  MessageComponent,
} from "./Chat.SubComponents";
import { MessageGenerator } from "../Constants";
import { Pop } from "./Images/Accumulator";
const { config } = Animations;
const socket = io(constants.serverName);

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
  const ImageRef = useRef<HTMLInputElement>(null);
  const ScrollRef = useRef(null);
  const inputRef = useRef(null);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    document.title = `Room - ${user.currentRoomName}`;
    socketCode();
    setInterval(() => {
      setIsFullScreen(document.fullscreenElement ? true : false);
    }, 1000);
    ImageRef.current.onchange = () => {
      const image = ImageRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        //@ts-ignore
        setImage(reader.result);
        setIsModalOpen(true);
        ImageRef.current.value = null;
      };
    };
  }, []);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    //@ts-ignore
    if (text === "" || !text.trim()) {
      toast.error("Invalid message!");
    } else if (text.length >= 500) {
      toast.error("Message Length Too Long !");
    } else {
      const newMessage: Message = {
        author: user.name,

        created_at: new Date(),
        accentColor: constants.appAccentColor,
        content: text,
        type: "text",
        className: "Outgoing",
        profilePic: user.avatarSvg,
      };
      setMsgs((p) => [...p, newMessage]);
      Pop.play();
      socket.emit("message", { ...newMessage, className: "Incoming" });
      setText("");
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
        <AiFillFileImage
          data-tip='Image Upload'
          onClick={() => ImageRef.current.click()}
        />

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
    socket.emit("disconnect");
  };

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
      setMsgs((p) => [
        ...p,
        { ...newMessage, created_at: new Date(newMessage.created_at) },
      ]);
      Pop.play();
    });
    socket.on("new-user-join", (mems, user) => {
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
            {/* <ScrollWrapper
              wrapperStyle={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
              }}
              smoothBehavior
            > */}
            <Scroll className='rstb' followButtonClassName='scrollButton'>
              {msgs.length > 0 &&
                msgs.map((msg) => (
                  <MessageComponent {...msg} key={getRandomKey()} />
                ))}
            </Scroll>

            {/* </ScrollWrapper> */}
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
              autoFocus
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
      <input type='file' ref={ImageRef} accept='image/*' />

      <Modal
        open={isModalOpen}
        center={true}
        onClose={() => setIsModalOpen(false)}
        styles={{
          closeButton: {
            outline: "none",
          },
          modal: {
            backgroundColor: constants.appAccentColor,
            color: "white",
            width: "60vw",
          },
        }}
        closeIcon={<FaTimes style={{ fontSize: "2.5vw", color: "red" }} />}
        closeOnEsc={true}
        closeOnOverlayClick={false}
      >
        <div className='upload-content'>
          <h1>Image Upload</h1>
          <img src={image} alt='' />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newMessage = {
                content: image,
                accentColor: constants.appAccentColor,
                author: user.name,
                className: "Outgoing",
                created_at: new Date(),
                profilePic: user.avatarSvg,
                type: "image",
                caption: caption === "" || !caption.trim() ? "" : caption,
              };
              //@ts-ignore
              setMsgs((p) => [...p, newMessage]);
              socket.emit("message", { ...newMessage, className: "Incoming" });
              setCaption("");
              setImage("");
              setIsModalOpen(false);
              inputRef.current.focus();
            }}
          >
            <h2>Caption</h2>
            <br />
            <div>
              {" "}
              <input
                type='text'
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <button type='submit'>
                <BiSend />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default ChatComponent;
