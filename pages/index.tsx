import { NextPage } from "next";
import Link from "next/link";
import { AccentText, Button, Logo, SafeLink } from "../constants/Components";
import { getConstants } from "../constants/constants";
import styles from "../styles/Homepage.module.scss";
import Head from "next/head";
import { AnimateSharedLayout, motion } from "framer-motion";
import { URLPaths } from "../constants/Types";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChatboxSharp } from "react-icons/io5";
import { IconType } from "react-icons";
type PathsItemArray = {
  route: Exclude<Exclude<URLPaths, "/">, `/chat/${string}`>;
  Icon: IconType;
  navigationContent: string;
}[];
const paths: PathsItemArray = [
  {
    route: "/create-chat",
    Icon: AiOutlinePlus,
    navigationContent: "Create A Chat Room",
  },
  {
    route: "/join-chat",
    Icon: IoChatboxSharp,
    navigationContent: "Join A Chat",
  },
];

const HomePage: NextPage = () => {
  const { accentColor, appName } = getConstants();
  return (
    <>
      <Head>
        <title>{appName}</title>
      </Head>
      <div className={styles.page} style={{ background: `linear-gradient(60deg ,${accentColor} , white)` }}>
        <header className={styles.header} style={{ color: accentColor }}>
          <Logo size={0.3} />
          <AccentText inverted={false}>One-Chat</AccentText>
        </header>
        <main className={styles["main-content"]}>
          <motion.div
            initial={{ position: "relative", bottom: 0 }}
            animate={{ bottom: "4vw", transition: { duration: 1, yoyo: Infinity } }}
            className='logo-wrapper'
          >
            <Logo size={1.3} />
          </motion.div>
          <div className='text' style={{ display: "flex", flexDirection: "column", textAlign: "center", width: "80%" }}>
            <AccentText style={{ fontSize: "5rem" }} inverted={false}>
              One-Chat
            </AccentText>
            <br />
            <AccentText inverted={false}>The best place for One-Time chats with anyone in the world.</AccentText>
          </div>
          <div className={styles["navigation-btns"]}>
            {paths.map(path => (
              <SafeLink href={path.route} key={path.route}>
                <div>
                  <Button
                    style={{
                      minHeight: "4rem",
                      fontSize: "1.4rem",
                      border: "none",
                    }}
                  >
                    <span> {path.navigationContent}</span> <path.Icon style={{ marginLeft: "1rem" }} />
                  </Button>
                </div>
              </SafeLink>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};
export default HomePage;
