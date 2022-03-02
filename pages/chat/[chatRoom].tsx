import { GetServerSideProps, NextPage, GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { ContextType, createContext, FC, memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Header, MessageComponent, MessageInput, SidePanel } from "../../constants/Chat.SubComponents";
import { getConstants } from "../../constants/constants";
import { ChatContext, useUser } from "../../constants/Context";
import styles from "../../styles/Chat.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegImage, FaRegSmile } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { IconType } from "react-icons";
import { ChatContextType, HangerBtnsType, Message, SocketMessages, User } from "../../constants/Types";
import { RiFileGifLine } from "react-icons/ri";
import JoinRoomPage from "../join-chat";
const { serverURls } = getConstants();
function Chat(): JSX.Element {
  const socket = useRef<Socket | null>(null);
  const [user, setUser] = useUser();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
  const [currentSidePanelContent, setCurrentSidePanelContent] = useState<Exclude<HangerBtnsType, "theme">>("Emojis");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    socket.current = io(serverURls.socket);
    socket.current.on("connect", async () => {
      // @ts-ignore
      setUser(p => {
        const newValue = { ...user, id: socket.current!.id };
        socket.current?.emit(SocketMessages.newUser, newValue);
        return newValue;
      });
      socket.current?.on(SocketMessages.newUser, (newUser: User) => {
        console.log(newUser);
      });
    });
    document.querySelector("html")!.style.overflow = "hidden";
    const messagesELement = document.getElementById("main__chat") as HTMLDivElement;
    // write an event listener to listen for the scroll event
    // if the div is scrolled to the bottom, it should console.log "scrolled to bottom"
    messagesELement.addEventListener("scroll", () => {
      if (messagesELement.scrollHeight - messagesELement.scrollTop - messagesELement.clientHeight < 1) {
        console.log("scrolled to bottom");
      }
    });
    return () => {
      socket.current?.off();
    };
  }, []);
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <ChatContext.Provider
      value={{
        isSidePanelOpen,
        setIsSidePanelOpen,
        currentSidePanelContent,
        setCurrentSidePanelContent,
        socket,
        theme,
        messages,
        setMessages,
        setTheme,
      }}
    >
      <motion.div
        animate={{
          backgroundColor: theme === "light" ? "#fff" : "#1f1f1f",
        }}
        className={styles.page}
      >
        <Header
          // @ts-ignore
          onLeave={() => {
            socket.current?.disconnect();
          }}
        />
        <main style={{ display: "flex", height: "80%" }}>
          <div className={styles.chat} id='main__chat'>
            {messages.map(m => (
              <MessageComponent key={m.id} message={m} />
            ))}
          </div>
          <SidePanel />
        </main>
        <MessageInput />
      </motion.div>
    </ChatContext.Provider>
  );
}
const MemoiezedChat = memo(Chat);
// @ts-ignore
const ChatRoom: NextPage = ({ chatRoom }) => {
  const [user] = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      console.log("NOPE");
      setIsAuthenticated(false);
      router.replace("/join-chat");
    } else {
      console.log("YUP");
      setIsAuthenticated(true);
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Room - {chatRoom}</title>
      </Head>
      {/* @ts-ignore */}
      {isAuthenticated ? <MemoiezedChat /> : null}
    </>
  );
};
export default ChatRoom;
// @ts-ignore
export const getServerSideProps: GetServerSideProps = ctx => {
  return {
    props: {
      chatRoom: ctx.params?.chatRoom,
    },
  };
};
