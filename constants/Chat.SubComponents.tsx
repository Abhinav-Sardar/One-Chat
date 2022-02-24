import { FC, memo, useEffect, useState } from "react";
import { useUser } from "./Context";
import styles from "../styles/Chat.module.scss";
import { AccentText, Button, SafeLink } from "./Components";
import { AiFillClockCircle, AiOutlineClockCircle } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { formatDate } from "./constants";
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
      <AccentText inverted={false}>Room - {user!.room}</AccentText>
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
