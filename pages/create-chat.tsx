import { NextPage } from "next";
import Head from "next/head";
import { FormEvent, FormEventHandler, useState } from "react";
import { AccentText, Button, Modal } from "../constants/Components";
import { getConstants } from "../constants/constants";
import styles from "../styles/CreateChat.module.css";
import { BiUser } from "react-icons/bi";
const title = "Create A Chat Room";
const [accentColor, avatarCategories] = getConstants("accentColor", "avatarCategories") as [string, string[]];
const CreateRoomPge: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit: FormEventHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={title} />
      </Head>
      <div className={styles.page}>
        <div className='header-wrapper'>
          <AccentText style={{ fontSize: "3.5rem" }}>{title}</AccentText>

          <hr color={accentColor} style={{ height: "10px" }} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <AccentText>Name</AccentText>
            <input type='text' name='Name' required autoComplete='off' />
          </div>
          <div className={styles.field}>
            <AccentText>Room Name</AccentText>
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
          <style jsx>{`
            .content {
              height: 100%;
            }
          `}</style>
          <div className='content'></div>
        </>
      </Modal>
    </>
  );
};
export default CreateRoomPge;
