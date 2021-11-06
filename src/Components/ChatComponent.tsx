import { memo, useContext } from "react";
import {
  FC,
  useState,
  useEffect,
  FormEvent,
  useRef,
  createContext,
} from "react";
import { VscChromeClose } from "react-icons/vsc";
import {
  AiFillFileImage,
  AiOutlineUser,
  AiOutlineFileImage,
} from "react-icons/ai";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { BiSend, BiHappy } from "react-icons/bi";
import { useHistory } from "react-router";
import io from "socket.io-client";
//@ts-ignore
import Scroll from "react-scroll-to-bottom";
import { RiFileGifLine, RiFileGifFill } from "react-icons/ri";

import {
  FaRegSmile,
  FaSmile,
  FaUser,
  FaShareAlt,
  FaSun,
  FaMoon,
  FaTrashAlt,
  FaTimes,
  FaLock,
  FaRegSadTear,
} from "react-icons/fa";

import { FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { ReplyContext, SelfClientContext } from "../Context";
import {
  ChatUser,
  exitFullScreen,
  goFullScreen,
  constants,
  Message,
  getRandomKey,
  MeetInputAttributesConfig,
  config,
  encrypt,
  useSharedPanelValue,
  initContextValue,
  reply,
  decrypt,
  scrollMessageIntoView,
  messageVariants,
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
  Reply,
} from "../Styled-components/Chat.style";

import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
  EmojiPanelInfo,
  MessageComponent,
  ImagesContent,
  GifContent,
  MiniatureReplyPreview,
  FadedAnimationWrapper,
} from "./Chat.SubComponents";
//@ts-ignore

import { Pop, ForeignMessagePop, KickSound } from "../Images/Accumulator";
import Banned from "./Banned";
import { AnimatePresence, motion } from "framer-motion";

const socket = io(constants.serverName);

const ChatComponent: FC<{ isPrivate: boolean | "Join" }> = memo(
  ({ isPrivate }) => {
    const [isBanned, setIsBanned] = useState<[boolean, string]>([false, ""]);
    const [theme, setTheme] = useState<"#fff" | "#232424">("#fff");
    const history = useHistory();

    const [usersOpen, setUsersOpen] = useSharedPanelValue().users;
    const [shareOpen, setShareOpen] = useSharedPanelValue().share;
    const [emojiOpen, setEmojiOpen] = useSharedPanelValue().emoji;
    const [imgsOpen, setImgsOpen] = useSharedPanelValue().images;
    const [gifsOpen, setGifsOpen] = useSharedPanelValue().gifs;
    const [user, setUser] = useContext(SelfClientContext);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [users, setUsers] = useState<ChatUser[]>([]);
    const inputRef = useRef(null);

    const [replyState, setReplyState] = useState<reply>({
      isOpen: false,
      id: "",
      content: null,
    });
    const panelConfig = {
      variants: config,
      animate: "animate",
      initial: "initial",
      exit: "exit",
      key: "users",
    };
    const [msgs, setMsgs] = useState<Message[]>([
      {
        content: "Messages are encrypted for security",
        type: "indicator",
        Icon: FaLock,
        background: constants.appAccentColor,
        id: getRandomKey(),
      },
    ]);
    useEffect(() => {
      if (emojiOpen === true) {
        setShareOpen(false);
        setUsersOpen(false);
        setImgsOpen(false);
        setGifsOpen(false);
      }
    }, [emojiOpen]);
    useEffect(() => {
      if (gifsOpen === true) {
        setShareOpen(false);
        setUsersOpen(false);
        setImgsOpen(false);
        setEmojiOpen(false);
      }
    }, [gifsOpen]);
    useEffect(() => {
      if (imgsOpen === true) {
        setShareOpen(false);
        setUsersOpen(false);
        setEmojiOpen(false);
        setGifsOpen(false);
      }
    }, [imgsOpen]);
    useEffect(() => {
      if (shareOpen === true) {
        setEmojiOpen(false);
        setUsersOpen(false);
        setImgsOpen(false);
        setGifsOpen(false);
      }
    }, [shareOpen]);

    useEffect(() => {
      if (usersOpen === true) {
        setShareOpen(false);
        setEmojiOpen(false);
        setImgsOpen(false);
        setGifsOpen(false);
      }
    }, [usersOpen]);
    useEffect(() => {
      console.info(replyState);
    }, [replyState]);
    const [isHost, setisHost] = useState<boolean>(false);
    const oppositeTheme = theme === "#232424" ? "#fff" : "#232424";

    const socketCode = () => {
      socket.on("room-info", (newUsers: ChatUser[]) => {
        setUsers((prev) => newUsers);
      });
      socket.on("user-left", (leftUser: string, newUsers: ChatUser[]) => {
        setUsers((prev) => newUsers);
        setMsgs((p) => [
          ...p,
          {
            content: `${leftUser} has left the chat`,
            type: "indicator",
            Icon: FaRegSadTear,
            background: "#fc1302",
            id: getRandomKey(),
          },
        ]);
      });
      socket.on("message", (newMessage: Message) => {
        setMsgs((p) => [
          ...p,
          {
            ...newMessage,

            created_at: new Date(newMessage.created_at),
          },
        ]);
        Pop.play();
      });
      socket.on("new-user-join", (newusers: ChatUser[], user: string) => {
        setUsers((prev) => newusers);
        setMsgs((p) => {
          return [
            ...p,
            {
              content: `${user} has joined the chat`,
              type: "indicator",
              Icon: BiHappy,
              background: "#0cfc1c",

              id: getRandomKey(),
            },
          ];
        });
      });

      socket.on("host", () => {
        setisHost(true);
        console.log("i am host");
        setMsgs((p) => [
          ...p,
          {
            content: `You are the host`,
            type: "indicator",
            Icon: BiHappy,
            background: "#0cfc1c",
            id: getRandomKey(),
          },
        ]);
      });
      socket.on(
        "new-host",
        (userLeft: string, newUsers: ChatUser[], newHost: string) => {
          setUsers((p) => newUsers);
          setMsgs((p) => [
            ...p,
            {
              content: `${userLeft} has left the chat. ${newHost} is now the host.`,
              type: "indicator",
              Icon: FaRegSadTear,
              background: "#fc1302",
              id: getRandomKey(),
            },
          ]);
        }
      );
      socket.on("user-banned", (newUsers: ChatUser[], msg: string) => {
        setUsers((p) => newUsers);
        setMsgs((p) => [
          ...p,
          {
            content: msg,
            type: "indicator",
            Icon: FaRegSadTear,
            background: "#fc1302",
            id: getRandomKey(),
          },
        ]);
      });
      socket.on("ban", (reason) => {
        //@ts-ignore
        socket.disconnect(true);
        setIsBanned([true, reason]);
      });
    };

    useEffect(() => {
      socket.connect();
      socketCode();
      socket.emit("new-user", {
        name: user.name,
        roomName: user.currentRoomName,
        profilePic: user.avatarSvg,
        host: false,
        id: socket.id,
        isPrivate: isPrivate,
      });
      document.title = `Room - ${user.currentRoomName}`;
      setInterval(() => {
        setIsFullScreen(document.fullscreenElement ? true : false);
      }, 500);
      console.log(isPrivate);
    }, []);

    function handleSubmit(e: FormEvent): void {
      e.preventDefault();
      const el: HTMLInputElement = document.querySelector(
        "input#message__input"
      )!;
      let text: string = el.value;
      if (text === "" || !text.trim()) {
        toast.error("Invalid message!");
      } else if (text.length >= 500) {
        toast.error("Message Length Too Long !");
      } else {
        let newMessage: Message = {
          author: user.name,
          created_at: new Date(),
          accentColor: constants.appAccentColor,
          content: encrypt(text),
          type: replyState.isOpen ? "reply" : "text",
          className: "Outgoing",
          profilePic: user.avatarSvg,
          id: getRandomKey(),
          to: replyState.content,
        };

        setMsgs((p) => [...p, newMessage]);
        ForeignMessagePop.play();
        socket.emit("message", {
          ...newMessage,
          className: "Incoming",
        });
        el.value = "";
        inputRef.current.focus();
        setReplyState({
          content: null,
          id: "",
          isOpen: false,
        });
      }
    }
    useEffect(() => {
      window.onpopstate = () => {
        //@ts-ignore
        socket.disconnect(true);
      };
    }, []);
    function Icons(): JSX.Element {
      return (
        <>
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
          {!gifsOpen ? (
            <RiFileGifLine
              data-tip='Open Gifs'
              onClick={() => {
                setGifsOpen(true);
              }}
            />
          ) : (
            <RiFileGifFill
              onClick={() => setGifsOpen(false)}
              data-tip='Close Gifs'
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
          <FaTrashAlt
            data-tip='Clear Chat'
            onClick={() => {
              setMsgs([]);
              setReplyState({
                isOpen: false,
                id: "",
                content: null,
              });
            }}
          />
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
    const LeaveRoom = () => {
      history.push("/");
      //@ts-ignore
      socket.disconnect(true);
      setUser(initContextValue);
      KickSound.play();
    };
    const handleDragEnd = (msg: Message, offset: number) => {
      const { className } = msg;
      if (className === "Outgoing") {
        if (offset < 0) {
          return;
        } else {
          setTimeout(() => {
            setReplyState({
              isOpen: true,
              id: msg.id,
              content: msg,
            });
          }, 500);
        }
      } else {
        if (offset < 0) {
          setTimeout(() => {
            setReplyState({
              isOpen: true,
              id: msg.id,
              content: msg,
            });
          }, 900);
        } else {
          return;
        }
      }
    };
    return (
      <>
        {isBanned[0] ? (
          <Banned reason={isBanned[1]} />
        ) : (
          <FadedAnimationWrapper>
            <ChatPage
              animate={{
                backgroundColor: theme,
                color: oppositeTheme,
              }}
              transition={{
                type: "tween",
                duration: 0.4,
              }}
            >
              <ChatHeader roomName={user.currentRoomName} onClick={LeaveRoom} />
              {/* @ts-ignore */}
              <RemainingChatArea
                animate={{
                  height: replyState.isOpen
                    ? `${100 - (12 + 10 + 10)}vh`
                    : "78%",
                }}
                transition={{
                  type: "tween",
                  duration: 0.5,
                }}
              >
                <ChatArea theme={oppositeTheme}>
                  <Scroll
                    className='rstb'
                    followButtonClassName='scrollButton'
                    checkInterval={17}
                  >
                    <ReplyContext.Provider value={[replyState, setReplyState]}>
                      {msgs.length > 0 &&
                        msgs.map((msg) => {
                          if (msg.type !== "indicator") {
                            return (
                              <motion.div
                                key={getRandomKey()}
                                onDragEnd={(_, { offset }) =>
                                  handleDragEnd(msg, offset.x)
                                }
                                drag='x'
                                dragElastic={0.3}
                                dragConstraints={{ left: 0, right: 0 }}
                              >
                                <MessageComponent {...msg} />
                              </motion.div>
                            );
                          } else {
                            return (
                              <MessageComponent {...msg} key={getRandomKey()} />
                            );
                          }
                        })}
                    </ReplyContext.Provider>
                  </Scroll>
                </ChatArea>
                <AnimatePresence exitBeforeEnter>
                  {usersOpen && (
                    <UsersSection {...panelConfig} key='users'>
                      <SidePanelHeaderComponent
                        onClose={() => setUsersOpen(false)}
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                      >
                        <span> Users In Chat</span>
                      </SidePanelHeaderComponent>

                      <UsersPanelInfo
                        isHost={isHost}
                        users={users}
                        theme={oppositeTheme}
                        onBan={(user, reason) =>
                          socket.emit("ban-user", user, reason)
                        }
                      />
                    </UsersSection>
                  )}
                  {gifsOpen && (
                    <ImagesPanel {...panelConfig} key='gifs'>
                      <SidePanelHeaderComponent
                        onClose={() => setGifsOpen(false)}
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                      >
                        Gifs
                      </SidePanelHeaderComponent>
                      <GifContent
                        onGifSubmit={(gifurl, caption, preview) => {
                          const newMessage: Message = {
                            author: user.name,
                            created_at: new Date(),
                            accentColor: constants.appAccentColor,
                            content: encrypt(gifurl),
                            type: "gif",
                            className: "Outgoing",
                            profilePic: user.avatarSvg,
                            caption: encrypt(caption),
                            preview_url: encrypt(preview),
                            id: getRandomKey(),
                          };

                          setMsgs((p) => [...p, newMessage]);
                          socket.emit("message", {
                            ...newMessage,
                            className: "Incoming",
                          });
                        }}
                      />
                    </ImagesPanel>
                  )}
                  {shareOpen && (
                    <SharePanel {...panelConfig} key='share'>
                      <SidePanelHeaderComponent
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                        onClose={() => setShareOpen((p: boolean) => false)}
                      >
                        Share
                      </SidePanelHeaderComponent>
                      <SharePanelInfo />
                    </SharePanel>
                  )}
                  {emojiOpen && (
                    <EmojiPanel {...panelConfig} key='emoji'>
                      <SidePanelHeaderComponent
                        onClose={() => setEmojiOpen(false)}
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                      >
                        Emojis
                      </SidePanelHeaderComponent>
                      <EmojiPanelInfo />
                    </EmojiPanel>
                  )}
                  {imgsOpen && (
                    <ImagesPanel {...panelConfig} key='images'>
                      <SidePanelHeaderComponent
                        onClose={() => setImgsOpen(false)}
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                      >
                        Images
                      </SidePanelHeaderComponent>
                      <ImagesContent
                        onImgSubmit={(imgUrl, caption) => {
                          const newMessage: Message = {
                            author: user.name,
                            created_at: new Date(),
                            accentColor: constants.appAccentColor,
                            content: encrypt(imgUrl),
                            type: "image",
                            className: "Outgoing",
                            profilePic: user.avatarSvg,
                            caption: encrypt(caption),
                            id: getRandomKey(),
                          };

                          setMsgs((p) => [...p, newMessage]);
                          socket.emit("message", {
                            ...newMessage,
                            className: "Incoming",
                          });
                        }}
                      />
                    </ImagesPanel>
                  )}
                </AnimatePresence>
              </RemainingChatArea>
              {replyState.isOpen && (
                <AnimatePresence exitBeforeEnter>
                  <Reply
                    id='reply-cont'
                    key={"reply-cont"}
                    style={{
                      borderTop: `1px solid ${oppositeTheme}`,
                      borderLeft: `1px solid ${oppositeTheme}`,
                    }}
                    animate={{
                      height: "10vh",
                      opacity: 1,
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.5,
                    }}
                    initial={{
                      opacity: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: {
                        type: "tween",
                        duration: 0.5,
                      },
                    }}
                  >
                    <div className='icon'>
                      <VscChromeClose
                        onClick={() =>
                          setReplyState({
                            isOpen: false,
                            id: "",
                            content: null,
                          })
                        }
                        style={{
                          color: oppositeTheme,
                        }}
                      />
                    </div>

                    <div
                      className='content'
                      style={{
                        borderLeft: `1px solid ${oppositeTheme}`,
                        color: oppositeTheme,
                      }}
                      onClick={() =>
                        scrollMessageIntoView(replyState.content.id)
                      }
                    >
                      <MiniatureReplyPreview
                        props={replyState.content}
                        isProd={false}
                      />
                    </div>
                  </Reply>
                </AnimatePresence>
              )}
              <MeetControls
                style={{
                  borderTop: `1px solid ${oppositeTheme}`,
                }}
              >
                <form className='input' onSubmit={(e) => handleSubmit(e)}>
                  <input ref={inputRef} {...MeetInputAttributesConfig} />
                  <button type='submit'>
                    <BiSend />
                  </button>
                </form>
                <div className='icons'>
                  <Icons />
                </div>
              </MeetControls>
            </ChatPage>
          </FadedAnimationWrapper>
        )}
      </>
    );
  }
);
export default ChatComponent;
