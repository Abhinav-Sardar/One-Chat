import { NextPage } from "next";
import { AccentText } from "../constants/Components";
import styles from "../styles/index.module.scss";
import { IoChatboxSharp } from "react-icons/io5";
import { constants } from "../constants/constants";
const HomePage: NextPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <AccentText fontFamily='Raleway, sans-serif'>One-Chat</AccentText>
        <IoChatboxSharp fill={constants.accentColor} fontSize='2rem' />
      </header>
    </div>
  );
};
export default HomePage;
