import { GetServerSideProps, GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Header } from "../../constants/Chat.SubComponents";
import { getConstants } from "../../constants/constants";
import { useUser } from "../../constants/Context";
import { Room } from "../../constants/Types";
import styles from "../../styles/Chat.module.scss";
const { serverURls } = getConstants();
const Chat: FC = () => {
  const socket = useRef<Socket | null>(null);
  const [user, setUser] = useUser();
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
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
        {/* <section className={styles["bottom-panel"]}></section> */}
        <footer className={styles["message-input"]}></footer>
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
