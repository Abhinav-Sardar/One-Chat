import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FC, FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";
import { AccentText, Button, Modal, Toggle } from "../constants/Components";
import { ClientAvatar, getAvatars, getConstants, validateText } from "../constants/constants";
import styles from "../styles/CreateChat.module.scss";
import { BiCurrentLocation, BiUser } from "react-icons/bi";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { AvatarsProps } from "../constants/Types";
const title = "Create A Chat Room";
const { accentColor, avatarCategories, serverURls } = getConstants();
const Avatars: FC<AvatarsProps> = ({ avatars, currentAvatar, onClose, currentAvatarCategory }) => {
  const currentAvatars = avatars.find(category => category[0].kind === currentAvatarCategory)!;
  const variants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.3,
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <div className={styles.avatars}>
      <AnimatePresence exitBeforeEnter>
        <motion.main variants={variants} initial='initial' animate='animate' exit='exit' key={currentAvatarCategory}>
          {currentAvatars.map((avatar, i) => (
            <motion.div
              key={avatar.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onClose(avatar)}
              dangerouslySetInnerHTML={{ __html: avatar.avatar }}
              style={{ border: `3px solid ${currentAvatar.avatar === avatar.avatar ? "yellow" : "white"}` }}
            ></motion.div>
          ))}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};
// @ts-ignore
const CreateRoomPge: NextPage = ({ avatars }: { avatars: ClientAvatar[][] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<typeof avatarCategories[number]>("Classic");
  const [currentAvatar, setCurrentAvatar] = useState<ClientAvatar>({ avatar: "", kind: "Adventurer", id: "" });
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const roomRef = useRef<HTMLInputElement | null>(null);
  console.log("I am being rendered");
  const handleSubmit: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { value: inpValue } = inpRef.current!;
    const { value: roomValue } = roomRef.current!;
    console.log(inpValue, roomValue);
    try {
      await validateText(inpValue, 15, "Name");
      try {
        await validateText(roomValue, 20, "Room Name");
        const res = await fetch(serverURls.rooms, {
          method: "POST",
          body: JSON.stringify({
            name: inpValue.trimStart().trimEnd(),
            roomName: roomValue.trim(),
            avatar: currentAvatar.avatar,
            public: !isToggled,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await res.json();
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setCurrentAvatar(avatars[0][0]);
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
            <input type='text' name='Name' autoComplete='off' ref={inpRef} />
          </div>
          <div className={styles.field}>
            <label htmlFor='Room Name'>
              <AccentText inverted={false}>Room Name</AccentText>
            </label>
            <input type='text' name='Room Name' autoComplete='off' ref={roomRef} />
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
          <ul className={styles.tabs}>
            {avatarCategories.map(category => (
              <motion.li
                onClick={() => setCurrentCategory(category)}
                animate={{
                  scale: currentCategory === category ? 1.2 : 1,

                  fontWeight: currentCategory === category ? 600 : 400,
                  transition: {
                    duration: 0.3,
                  },
                }}
                key={category}
              >
                <AccentText inverted={true}>{category}</AccentText>

                {category === currentCategory ? (
                  <motion.div
                    layoutId='underline'
                    transition={{
                      duration: 0.3,
                    }}
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
          <Avatars
            avatars={avatars}
            currentAvatar={currentAvatar}
            currentAvatarCategory={currentCategory}
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
