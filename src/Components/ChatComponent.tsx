import { memo, useContext } from "react";
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
import { useSpring, useTransition } from "react-spring";
import { toast } from "react-toastify";
import { SelfClientContext } from "../App";
import {
  ChatUser,
  exitFullScreen,
  goFullScreen,
  constants,
  Message,
  getRandomKey,
  MeetInputAttributesConfig,
  FooterExpanderConfig,
  config,
  encrypt,
  useSharedPanelValue,
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

import {
  ChatHeader,
  SidePanelHeaderComponent,
  UsersPanelInfo,
  SharePanelInfo,
  EmojiPanelInfo,
  MessageComponent,
  ImagesContent,
  GifContent,
} from "./Chat.SubComponents";
//@ts-ignore

import { Pop, ForeignMessagePop, KickSound } from "../Images/Accumulator";
import Banned from "./Banned";

const socket = io(constants.serverName);

const ChatComponent: FC<{ isPrivate: boolean | "Join" }> = memo(
  ({ isPrivate }) => {
    const footerAndHeaderExpander = useSpring(FooterExpanderConfig);
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
    const [msgs, setMsgs] = useState<Message[]>([
      {
        content: "Messages are encrypted for security",
        type: "indicator",
        Icon: FaLock,
        background: constants.appAccentColor,
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
    const [isHost, setisHost] = useState<boolean>(false);
    const [oppositeTheme, setOppositeTheme] = useState<"#fff" | "#232424">(
      "#232424"
    );

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
    useEffect(() => {
      setOppositeTheme(theme === "#232424" ? "#fff" : "#232424");
    }, [theme]);
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
          type: "text",
          className: "Outgoing",
          profilePic: user.avatarSvg,
        };

        setMsgs((p) => [...p, newMessage]);
        ForeignMessagePop.play();
        socket.emit("message", {
          ...newMessage,
          className: "Incoming",
        });
        el.value = "";
        inputRef.current.focus();
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

    const backgroundAnimation = useSpring({ backgroundColor: theme });
    const colorSetter = useSpring({
      color: oppositeTheme,
      borderBottom: `1px solid ${oppositeTheme}`,
    });

    const usersTransition = useTransition(usersOpen, config);
    const shareTransition = useTransition(shareOpen, config);
    const emojiTransition = useTransition(emojiOpen, config);
    const imagesTransition = useTransition(imgsOpen, config);
    const gifsTransition = useTransition(gifsOpen, config);
    const LeaveRoom = () => {
      history.push("/");

      //@ts-ignore
      socket.disconnect(true);
      setUser({
        name: "",
        avatarSvg: "",
        currentRoomName: "",
      });
      KickSound.play();
    };

    return (
      <>
        {isBanned[0] ? (
          <Banned reason={isBanned[1]} />
        ) : (
          <>
            <ChatPage style={backgroundAnimation}>
              <ChatHeader roomName={user.currentRoomName} onClick={LeaveRoom} />
              <RemainingChatArea style={colorSetter}>
                <ChatArea theme={oppositeTheme}>
                  <Scroll className='rstb' followButtonClassName='scrollButton'>
                    {msgs.length > 0 &&
                      msgs.map((msg) => (
                        <MessageComponent {...msg} key={getRandomKey()} />
                      ))}
                  </Scroll>
                </ChatArea>

                {usersTransition((style, item) => {
                  return item ? (
                    <>
                      <UsersSection style={style}>
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
                    </>
                  ) : (
                    ""
                  );
                })}
                {gifsTransition((style, item) => {
                  return item ? (
                    <ImagesPanel style={style}>
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
                            content: gifurl,
                            type: "gif",
                            className: "Outgoing",
                            profilePic: user.avatarSvg,
                            caption: caption,
                            preview_url: preview,
                          };

                          setMsgs((p) => [...p, newMessage]);
                          socket.emit("message", {
                            ...newMessage,
                            className: "Incoming",
                            profilePic: "",
                          });
                        }}
                      />
                    </ImagesPanel>
                  ) : (
                    ""
                  );
                })}
                {shareTransition((style, item) => {
                  return item ? (
                    <SharePanel style={style}>
                      <SidePanelHeaderComponent
                        style={{
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                        onClose={() => setShareOpen((p: boolean) => false)}
                      >
                        Share
                      </SidePanelHeaderComponent>
                      <SharePanelInfo roomName={user.currentRoomName} />
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
                          borderTop: `1px solid ${oppositeTheme}`,
                          borderBottom: `1px solid ${oppositeTheme}`,
                        }}
                      >
                        Emojis
                      </SidePanelHeaderComponent>
                      <EmojiPanelInfo />
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
                              content: imgUrl,
                              type: "image",
                              className: "Outgoing",
                              profilePic: user.avatarSvg,
                              caption: caption,
                            };

                            setMsgs((p) => [...p, newMessage]);
                            socket.emit("message", {
                              ...newMessage,
                              className: "Incoming",
                              profilePic: "",
                            });
                            setTimeout(() => {
                              console.log(
                                document.querySelector(
                                  ".react-scroll-to-bottom--css-lbkys-79elbk rstb"
                                )
                              );
                            }, 800);
                          }}
                        />
                      </ImagesPanel>
                    </>
                  ) : (
                    ""
                  );
                })}
              </RemainingChatArea>

              <MeetControls style={footerAndHeaderExpander}>
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
          </>
        )}
      </>
    );
  }
);
export default ChatComponent;
