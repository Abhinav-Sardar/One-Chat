import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC, FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import { AccentText, Button, Modal, Toggle } from "../constants/Components";
import { getAvatars, getConstants, getRandomKey, validateText } from "../constants/constants";
import styles from "../styles/CreateChat.module.scss";
import { BiCurrentLocation, BiUser } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { AvatarsProps, ClientAvatar } from "../constants/Types";
import { useRouter } from "next/router";
import { REPL_MODE_SLOPPY } from "repl";
import { useUser } from "../constants/Context";
import { isUint8ClampedArray } from "util/types";
const title = "Create A Chat Room";
const { accentColor, serverURls, varaints } = getConstants();
const Avatars: FC<AvatarsProps> = ({ avatars, currentAvatar, onClose }) => {
  return (
    <motion.div className={styles.content}>
      {avatars.map((a, i) => (
        <motion.div
          className={styles["avatar"]}
          dangerouslySetInnerHTML={{ __html: a.avatar }}
          onClick={() => onClose(a)}
          key={a.id}
          initial={{
            scale: 0,
            y: 200,
          }}
          animate={{
            scale: 1,
            y: 0,
            transition: {
              duration: 0.4,
              delay: (i + 1) * 0.1,
            },
          }}
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.85,
          }}
          style={{
            borderColor: currentAvatar.id === a.id ? "yellow" : "white",
          }}
        />
      ))}
    </motion.div>
  );
};
// @ts-ignore

const CreateRoomPge: NextPage = ({ avatars }: { avatars: ClientAvatar[] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<ClientAvatar>({ avatar: "", id: "" });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const roomRef = useRef<HTMLInputElement | null>(null);
  const [user, setUser] = useUser();
  const router = useRouter();
  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { value: inpValue } = inpRef.current!;
    const { value: roomValue } = roomRef.current!;
    console.log(inpValue, roomValue);
    try {
      await validateText(inpValue, 20, "Name");

      try {
        await validateText(roomValue, 25, "Room Name");
        const res = await fetch(serverURls.rooms, {
          method: "POST",
          body: JSON.stringify({
            roomName: roomValue.trim(),
            isPublic: !isToggled,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!data.error) {
          setUser({
            avatar: currentAvatar.avatar,
            id: getRandomKey(),
            host: true,
            name: inpValue,
            room: roomValue,
          });
          router.push(`/chat/${roomValue}`);
        }
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    inpRef.current?.focus();
    setCurrentAvatar(avatars[0]);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Head>
      <div className={styles.page}>
        <div className='header-wrapper'>
          <AccentText inverted={false} style={{ fontSize: "3.5rem" }}>
            {title}
          </AccentText>

          <hr color={accentColor} style={{ height: "10px" }} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor='Name'>
              <AccentText inverted={false}>Name</AccentText>
            </label>
            <input type='text' name='Name' autoComplete='off' ref={inpRef} required autoFocus />
          </div>
          <div className={styles.field}>
            <label htmlFor='Room Name'>
              <AccentText inverted={false}>Room Name</AccentText>
            </label>
            <input type='text' name='Room Name' autoComplete='off' ref={roomRef} required />
          </div>
          <div className={styles["avatars-wrapper"]}>
            {currentAvatar.avatar && <div dangerouslySetInnerHTML={{ __html: currentAvatar.avatar }} />}
            <Button
              style={{ border: `1px solid ${accentColor}`, width: "15rem" }}
              type='button'
              onClick={() => setIsModalOpen(true)}
            >
              Choose Avatar <BiUser />
            </Button>
          </div>
          <div className={styles["toggle-wrapper"]}>
            <AccentText inverted={false}>{isToggled ? "Private" : "Public"}</AccentText>
            <Toggle isToggled={isToggled} setIsToggled={setIsToggled} />
          </div>
          <Button style={{ border: `1px solid ${accentColor}` }} type='submit'>
            Create Room
          </Button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Choose Your Avatar'>
        <>
          <Avatars
            avatars={avatars}
            currentAvatar={currentAvatar}
            onClose={newAvatar => {
              setCurrentAvatar(newAvatar);
              setIsModalOpen(false);
            }}
          />
        </>
      </Modal>
    </>
  );
};
export default CreateRoomPge;
export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      avatars: getAvatars(),
    },
  };
};
