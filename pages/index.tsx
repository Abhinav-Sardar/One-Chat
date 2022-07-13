import { NextPage } from "next";
import { AccentText, Button, Logo } from "../constants/Components";
import styles from "../styles/index.module.scss";
import { constants } from "../constants/constants";
import { motion } from "framer-motion";
import { AiOutlinePlus } from "react-icons/ai";
import { IoChatboxSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
const HomePage: NextPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <AccentText fontFamily='Raleway, sans-serif'>One-Chat</AccentText>
        <Logo />
      </header>

      <main className={styles.main}>
        <motion.div
          initial={{ position: "relative", bottom: 0, left: 0 }}
          animate={{ bottom: [50, 0, 50], transition: { duration: 3, repeat: Infinity } }}
        >
          <Logo size={12} />
        </motion.div>
        <>
          <AccentText fontSize='5rem' fontFamily='Raleway, sans-serif'>
            One-Chat
          </AccentText>
          <br />
          <AccentText fontFamily='Raleway, sans-serif'>
            The the best place for One-Time chats with anyone in the world.
          </AccentText>
        </>
        <section className={styles.btnWrapper}>
          <Link href='/create'>
            <a style={{ textDecoration: "none" }}>
              <Button onClick={() => {}} styles={{ minWidth: "19rem", height: "3.5rem", fontSize: "1.4rem" }}>
                Create A Chat Room <AiOutlinePlus />
              </Button>
            </a>
          </Link>
          <Button styles={{ minWidth: "19rem", height: "3.5rem", fontSize: "1.4rem" }} onClick={() => {}}>
            Join A Chat Room
            <IoChatboxSharp />
          </Button>
        </section>
      </main>
    </div>
  );
};
export default HomePage;
