import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { AccentText, Button, Modal } from "../constants/Components";
import { ClientAvatar, getAvatars, getConstants } from "../constants/constants";
import styles from "../styles/CreateChat.module.scss";
import { BiUser } from "react-icons/bi";
import { motion } from "framer-motion";
const title = "Create A Chat Room";
const { accentColor, avatarCategories } = getConstants();
// @ts-ignore
const CreateRoomPge: NextPage = ({ avatars }: { avatars: ClientAvatar[][] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<typeof avatarCategories[number]>("Classic");
  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  useEffect(() => {
    console.log(avatars[0][1].avatar);
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
            <AccentText inverted={false}>Name</AccentText>
            <input type='text' name='Name' required autoComplete='off' />
          </div>
          <div className={styles.field}>
            <AccentText inverted={false}>Room Name</AccentText>
            <input type='text' name='Room Name' required autoComplete='off' />
          </div>
          <div className={styles.avatars}>
            <Button
              style={{ border: `1px solid ${accentColor}`, width: "15rem" }}
              type='button'
              onClick={() => setIsModalOpen(true)}
            >
              Choose Avatar <BiUser />
            </Button>
          </div>
          <Button style={{ border: `1px solid ${accentColor}` }} type='submit'>
            Create Room
          </Button>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Choose Your Avatar'>
        <>
          <div className={styles.content}>
            <ul className={styles.tabs}>
              {avatarCategories.map(category => (
                <motion.li
                  onClick={() => setCurrentCategory(category)}
                  animate={{
                    scale: currentCategory === category ? 1.3 : 1,
                    transition: {
                      type: "spring",
                      damping: 6,
                    },
                  }}
                  key={category}
                >
                  <AccentText inverted={true}>{category}</AccentText>
                </motion.li>
              ))}
            </ul>
          </div>
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
