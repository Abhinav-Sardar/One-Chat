import { FC, memo, useEffect, useRef, useState } from "react";
import { useUser } from "./Context";
import styles from "../styles/Chat.module.scss";
import { AccentText, Button, SafeLink } from "./Components";
import { AiFillClockCircle, AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { BiExit, BiSend, BiSun } from "react-icons/bi";
import { formatDate, getConstants, getFabVaraints } from "./constants";
import { AnimatePresence, motion } from "framer-motion";
import { useChat } from "../pages/chat/[chatRoom]";
import { IconType } from "react-icons";
import { FaRegSmile, FaRegImage, FaRegMoon } from "react-icons/fa";
import { RiFileGifLine } from "react-icons/ri";
import { EmojisType, HangerBtnsType } from "./Types";
import { VscChromeClose } from "react-icons/vsc";
import EmojisData from "./data/Emojis";
const { varaints, OptionsPanelInfo, accentColor } = getConstants();
const Emojis: FC = () => {
  const [currentEmojiType, setCurrentEmojiType] = useState<EmojisType["title"]>("human");
  const { theme } = useChat();
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div className={styles["emojis-icons-wrapper"]} style={{ display: "flex", height: "10%" }}>
        {EmojisData.map(e => (
          <>
            <motion.div
              key={e.title}
              animate={{
                color: currentEmojiType === e.title ? accentColor : theme === "light" ? "#000" : "#fff",
                y: currentEmojiType === e.title ? 0 : 1,
              }}
              onClick={() => setCurrentEmojiType(e.title)}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <e.icon fontSize={"1.7rem"} />
              {currentEmojiType === e.title && (
                <motion.div
                  style={{ height: "5px", width: "100%", background: accentColor, marginTop: ".5rem" }}
                  layoutId={"underline"}
                  transition={{ type: "spring", damping: 20 }}
                />
              )}
            </motion.div>
          </>
        ))}
      </div>
    </div>
  );
};
export const Header: FC<{ onLeave: () => void }> = memo(({ onLeave }) => {
  const [currentDate, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(counterInterval);
    };
  }, []);
  const [user] = useUser();
  const currentTime = formatDate(currentDate, true);
  return (
    <header className={styles.header}>
      <AccentText inverted={false}>Room - {user?.room ?? "Gotcha!"}</AccentText>
      <section className='clock'>
        <AiOutlineClockCircle />
        <AccentText inverted={false} style={{ fontFamily: '"Poppins" , sans-serif' }}>
          {currentTime}
        </AccentText>
      </section>
      <SafeLink href='/' passHref>
        <Button
          color='#fff'
          backgroundColor='red'
          style={{ border: "1px solid red", height: "80%", minWidth: "13rem" }}
          onClick={onLeave}
        >
          <span>Leave Room</span>
          <BiExit />
        </Button>
      </SafeLink>
    </header>
  );
});

export const SidePanel: FC = () => {
  const { isSidePanelOpen, currentSidePanelContent, theme, setIsSidePanelOpen } = useChat();
  return (
    <AnimatePresence exitBeforeEnter>
      {isSidePanelOpen && (
        <motion.aside
          variants={varaints.sidePanelVaraints}
          initial='initial'
          animate='animate'
          exit='initial'
          transition={{ duration: 1 }}
          className={styles["side-panel"]}
          key={currentSidePanelContent}
        >
          <header>
            <AccentText inverted={false}>{currentSidePanelContent}</AccentText>
            <VscChromeClose
              onClick={() => {
                setIsSidePanelOpen(false);
              }}
            />
          </header>
          {currentSidePanelContent === "Emojis" && <Emojis />}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export const MessageSection: FC = () => {
  const inpRef = useRef<HTMLInputElement>(null);
  const [isHangerOpen, setIsHangerOpen] = useState<boolean>(false);
  const { setCurrentSidePanelContent, isSidePanelOpen, setIsSidePanelOpen, theme, setTheme } = useChat();

  return (
    <footer className={styles["message-input"]}>
      <div className={styles["button-wrapper"]}>
        <div
          className={styles.button}
          onClick={() => {
            setIsHangerOpen(!isHangerOpen);
          }}
        >
          <AiOutlinePlus
            style={{
              transition: "400ms ease-in-out",
              transform: isHangerOpen ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          />
        </div>
        <AnimatePresence>
          {isHangerOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
              }}
            >
              {OptionsPanelInfo.map((item, i) => (
                <motion.button
                  className={styles.button}
                  key={item.type}
                  style={{ position: "absolute", left: 0, right: 0, zIndex: 2 }}
                  onClick={() => {
                    if (item.type === "theme") {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setIsHangerOpen(true);
                    } else {
                      setCurrentSidePanelContent(item.type);
                      setIsHangerOpen(false);

                      setIsSidePanelOpen(true);
                    }
                  }}
                  variants={getFabVaraints(i)}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                >
                  {item.type === "theme" ? theme === "dark" ? <FaRegMoon /> : <BiSun /> : <item.Icon />}
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
      <input type='text' name='Message' placeholder='Say Something...' ref={inpRef} id='message__input' />
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
  );
};
