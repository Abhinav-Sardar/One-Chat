import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { getConstants } from "../../constants/constants";
import { useUser } from "../../constants/Context";
import { Room } from "../../constants/Types";
import styles from "../../styles/Chat.module.scss";
const { serverURls } = getConstants();
const Chat: FC = () => {
  const socket = useRef<Socket | null>(null);
  const [user, setUser] = useUser();
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
      socket.current?.disconnect();
    };
  }, []);
  return (
    <>
      <main className={styles.page}>
        <header className={styles["header"]}>
          <h1>THIS IS THE HEADER</h1>
        </header>
      </main>
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
export const getStaticProps: GetStaticProps = ctx => {
  console.log(ctx.params?.chatRoom);
  return {
    props: {
      chatRoom: ctx.params?.chatRoom,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(serverURls.rooms);
  const data: Room[] = await response.json();
  const rooms: GetStaticPathsResult["paths"] = data.map(r => ({ params: { chatRoom: r.roomName } }));
  return {
    paths: rooms,
    fallback: true,
  };
};
