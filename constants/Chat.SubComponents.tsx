/* eslint-disable react/display-name */
import { Dispatch, FC, FormEvent, FormEventHandler, memo, SetStateAction, useEffect, useRef, useState } from "react";
import { useUser } from "./Context";
import styles from "../styles/Chat.module.scss";
import { AccentText, Button, Categories, Modal, SafeLink } from "./Components";
import { AiFillClockCircle, AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import { BiExit, BiSend, BiShareAlt, BiSun } from "react-icons/bi";
import { formatDate, getConstants, getRandomKey, useAddToast } from "./constants";
import { AnimatePresence, motion, createMotionComponent } from "framer-motion";
import { useChat } from "../constants/Context";
import { IconType } from "react-icons";
import { FaRegSmile, FaRegImage, FaRegMoon, FaTrashAlt } from "react-icons/fa";
import { RiFileGifLine } from "react-icons/ri";
import { ChatContextType, EmojisType, HangerBtnsType, Message, TextMessage, User } from "./Types";
import { VscChromeClose } from "react-icons/vsc";
import EmojisData from "./data/Emojis";
import { BsArrowDown, BsArrowUp, BsFillFileMusicFill } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { MdOutlineKeyboardVoice } from "react-icons/md";
// @ts-ignore
const { varaints, OptionsPanelInfo, accentColor, tenorApiKey } = getConstants();
const Gifs: FC = memo(() => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1>GIFS/</h1>
    </motion.div>
  );
});
const Emojis: FC = memo(() => {
  const [currentEmojiType, setCurrentEmojiType] = useState<EmojisType["title"]>("human");
  const { theme } = useChat();
  const [currentEmojisData, setCurrentEmojisData] = useState<string[]>(EmojisData[0].emojis);
  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ display: "flex", height: "15%" }}>
        {EmojisData.map(e => (
          <motion.div
            key={e.title}
            transition={{ type: "spring" }}
            animate={{
              color: currentEmojiType === e.title ? accentColor : theme === "light" ? "#000" : "#fff",
              scale: currentEmojiType === e.title ? 1.3 : 1,
            }}
            onClick={() => {
              setCurrentEmojiType(e.title);
              setCurrentEmojisData(e.emojis);
            }}
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
          </motion.div>
        ))}
      </div>
      <motion.div
        className={styles.emojis}
        variants={varaints.emojisContainerVariants}
        initial='initial'
        animate='animate'
        key={currentEmojiType}
      >
        {currentEmojisData.map(e => (
          <motion.span
            variants={varaints.emojiVariants}
            key={e}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const element = document.getElementById("message__input") as HTMLInputElement;
              element.value += e;
              element.focus();
            }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
});
export const Header: FC = memo(() => {
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
  const { socket } = useChat();
  const router = useRouter();
  return (
    <header className={styles.header}>
      <AccentText inverted={false}>Room - {user?.room ?? "Gotcha!"}</AccentText>
      <section className='clock'>
        <AiOutlineClockCircle />
        <AccentText inverted={false} style={{ fontFamily: '"Poppins" , sans-serif' }}>
          {currentTime}
        </AccentText>
      </section>
      <Button
        color='#fff'
        backgroundColor='red'
        style={{ border: "1px solid red", height: "80%", minWidth: "13rem" }}
        onClick={() => {
          socket.current!.off();
          router.push("/");
        }}
      >
        <span>Leave Room</span>
        <BiExit />
      </Button>
    </header>
  );
});
const Audio: FC = memo(() => {
  const [currentCategory, setCurrentCategory] = useState<string>("Record Your Voice");
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div style={{ height: "100%" }}>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Add A Caption'>
        <h1>HELLO</h1>
      </Modal>
      <Categories
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        categories={[
          { icon: MdOutlineKeyboardVoice, text: "Record Your Voice" },
          { text: "Choose File", icon: BsFillFileMusicFill },
        ]}
      />
      <div style={{ height: "90%" }}>
        {currentCategory === "Choose File" ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Button
              style={{ minWidth: "15rem" }}
              onClick={() => {
                const file = document.getElementById("audio__input") as HTMLInputElement;
                file.click();
                file.onchange = () => {
                  const audio = document.createElement("audio");
                  console.log(file.files[0]);
                  audio.src = URL.createObjectURL(new Blob([file.files[0]], { type: "audio/mp3" }));
                  document.body.appendChild(audio);
                  audio.play();
                  file.value = null;
                };
              }}
            >
              Choose File <BsArrowUp />
            </Button>
            <input type='file' accept='audio/*' id='audio__input' style={{ display: "none" }} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});
export const SidePanel: FC = memo(() => {
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
        >
          <header>
            <div>
              {currentSidePanelContent.split("").map((l, i) => (
                <motion.span
                  style={{
                    fontSize: "2rem",
                    color: accentColor,
                    fontFamily: '"Poppins" , sans-serif',
                    display: "inline-block",
                  }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`${l}${currentSidePanelContent}`}
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <VscChromeClose
              onClick={() => {
                setIsSidePanelOpen(false);
              }}
            />
          </header>
          <div style={{ height: "90%" }}>
            <AnimatePresence>
              {currentSidePanelContent === "Emojis" ? (
                <Emojis />
              ) : currentSidePanelContent === "Gifs" ? (
                <Gifs />
              ) : currentSidePanelContent === "Audio" ? (
                <Audio />
              ) : (
                ""
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
});

export const MessageInput: FC = memo(() => {
  const inpRef = useRef<HTMLInputElement>(null);
  const {
    setMessages,
    setTheme,
    theme,
    setCurrentSidePanelContent,
    setIsSidePanelOpen,
    setIsHangerOpen,
    isHangerOpen,
  } = useChat();
  const add = useAddToast();
  const [user] = useUser() as [User, Dispatch<SetStateAction<User>>];
  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
    const { value } = inpRef.current!;
    if (!value || !value.trim()) {
      add("Invalid Message!", "error");
    } else if (value.length > 400) {
      add("Message is too long!", "error");
    } else {
      let newMessage: TextMessage = {
        author: user.name,
        avatar: user.avatar,
        content: value,
        type: "text",
        className: "Outgoing",
        createdAt: new Date(),
        id: getRandomKey(),
      };
      setMessages(prev => [...prev, newMessage]);
      inpRef.current!.value = "";
      setIsHangerOpen(false);
    }
  };
  return (
    <form className={styles["message-input"]} onSubmit={handleSubmit}>
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
            <>
              {OptionsPanelInfo.map((item, i) => (
                <motion.button
                  className={styles.button}
                  type='button'
                  key={item.type}
                  style={{ position: "absolute", left: 0, right: 0, zIndex: 2 }}
                  onClick={() => {
                    setCurrentSidePanelContent(item.type);
                    setIsSidePanelOpen(true);
                    setIsHangerOpen(false);
                  }}
                  initial={{ scale: 0, opacity: 0, bottom: 0 }}
                  animate={{ scale: 1, opacity: 1, bottom: (i + 1) * 100 }}
                  transition={{ delay: i * 0.05, type: "spring", damping: 10 }}
                  exit={{ scale: 0, opacity: 0, bottom: 0, transition: { delay: i * 0.1, duration: 0.5 } }}
                >
                  <item.Icon />
                </motion.button>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      <button
        className={styles.button}
        type='button'
        onClick={() => {
          setMessages([]);
          setIsHangerOpen(false);
        }}
      >
        <FaTrashAlt />
      </button>
      <button
        type='button'
        className={styles.button}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? <FaRegMoon /> : <BiSun />}
      </button>
      <button
        type='button'
        className={styles.button}
        onClick={async () => {
          const content = `One-Chat : Best place for One-Time chats with anyone in the world.\nTo join this room, click this link 👉 ${window.location.href}.`;
          await navigator.clipboard.writeText(content);
          add("Copied joining info to clipboard!", "success");
        }}
      >
        <BiShareAlt />
      </button>
      <input type='text' name='Message' placeholder='Say Something...' ref={inpRef} id='message__input' />

      <button className={`${styles.button} send-btn`} type='submit'>
        <BiSend />
      </button>
      <style jsx>
        {`
          .send-btn:active {
            transform: scale(0.9);
          }
        `}
      </style>
    </form>
  );
});

export const MessageComponent: FC<{ message: Message }> = memo(({ message }) => {
  const [user] = useUser();
  if (message.type === "text" || message.type === "reply-text") {
    return (
      <motion.div
        className={`${styles.message} ${message.className}`}
        id={message.id}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div
          className='avatar'
          dangerouslySetInnerHTML={{ __html: message.avatar }}
          style={{ order: message.className === "Incoming" ? 1 : 0 }}
        />
        <div className='rest-wrapper'>
          <AccentText style={{ fontWeight: "bold", fontFamily: '"Quicksand" , sans-serif' }} inverted={false}>
            {message.author === user!.name ? "You" : message.author} - {formatDate(message.createdAt, false)}
          </AccentText>
          <div className='message-content'>{message.content}</div>
        </div>
      </motion.div>
    );
  } else {
    return <></>;
  }
});
