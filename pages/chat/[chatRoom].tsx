import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Header } from "../../constants/Chat.SubComponents";
import { getConstants, getFabVaraints } from "../../constants/constants";
import { useUser } from "../../constants/Context";
import styles from "../../styles/Chat.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegSmile } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
const { serverURls } = getConstants();

const Chat: FC = () => {
  const socket = useRef<Socket | null>(null);
  const [user, setUser] = useUser();
  const inpRef = useRef<HTMLInputElement>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(AiOutlinePlus({}));
    socket.current = io(serverURls.socket);
    socket.current.on("connect", async () => {
      // @ts-ignore
      setUser({ ...user, id: socket.current!.id });
      try {
        const response = await fetch(`${serverURls.rooms}/users`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...user, id: socket.current?.id }),
          method: "POST",
        });
        console.log(await response.json());
      } catch (e) {
        console.error(e);
      }
    });
    document.querySelector("html")!.style.overflow = "hidden";
    return () => {
      socket.current?.off();
    };
  }, []);
  return (
    <>
      <div className={styles.page}>
        <Header
          // @ts-ignore
          onLeave={() => {
            socket.current?.disconnect();
          }}
        />
        <main className={styles["chat-area"]}></main>
        {/* <section className={styles[""]}></section> */}
        <footer className={styles["message-input"]}>
          <FaRegSmile />
          <div className={styles.button} onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
            <AiOutlinePlus
              style={{
                transition: "400ms ease-in-out",
                transform: isOptionsOpen ? "rotate(-45deg)" : "rotate(0deg)",
              }}
            />
            <AnimatePresence>
              {isOptionsOpen && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <motion.button
                      className={styles.button}
                      key={_}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        zIndex: 2,
                      }}
                      variants={getFabVaraints(i)}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                    >
                      <AiOutlinePlus />
                    </motion.button>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
          <input type='text' name='Message' placeholder='Say Something...' ref={inpRef} />
          <button className={`${styles.button} send-btn`}>
            <BiSend />
          </button>
          <style jsx>
            {`
              .send-btn:active {
                transform: scale(0.9);
              }
            `}
          </style>
        </footer>
      </div>
    </>
  );
};
// @ts-ignore
const ChatRoom: NextPage = ({ chatRoom }) => {
  const [user] = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      console.log("NOPE");
      setIsAuthenticated(false);
    } else {
      console.log("YUP");
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Room - {chatRoom}</title>
      </Head>
      {isAuthenticated ? <Chat /> : <h1>JOIN BISH</h1>}
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
