import { NextPage } from "next";
import Head from "next/head";
import { AccentText } from "../constants/Components";
import { getConstants } from "../constants/constants";
import styles from "../styles/CreateChat.module.css";
const CreateRoomPge: NextPage = () => {
  const accentColor = getConstants("accentColor") as string;

  return (
    <>
      <Head>
        <title>Create A Chat</title>
      </Head>
      <div className={styles.page}>
        <div className='header-wrapper'>
          <AccentText style={{ fontSize: "4rem" }}>Create A Chat</AccentText>

          <hr color={accentColor} style={{ height: "10px" }} />
        </div>
        <form className={styles.form}>
          <div className={styles.field}>
            <AccentText>Name</AccentText>
            <input type='text' />
          </div>
          <div className={styles.field}>
            <AccentText>Room Name</AccentText>
            <input type='text' />
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateRoomPge;
