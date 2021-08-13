import { FC, memo, useEffect, useState, useContext } from "react";
import {
  ChatUser,
  constants,
  getRandomKey,
  HeaderProps,
  Message,
  PanelHeaderProps,
  ReturnFormattedDate,
  ShareProps,
  UsersInChatProps,
} from "../Constants";
import io from "socket.io-client";
import { SelfClientContext } from "../App";
import { MdContentCopy } from "react-icons/md";
import copy from "clipboard-copy";
import {
  EmojiPanel,
  MeetInfo,
  SidePanelHeader,
  User,
} from "../Styled-components/Chat.style";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { Animals, Food, HumanRelatedEmojis, Objects, Symbols } from "./Emojis";
import Emojis from "./Images/Accumulator";
import { MessageContext } from "./ChatComponent";
const socket = io(constants.serverName);
export const ChatHeader: FC<HeaderProps> = memo(({ roomName, onClick }) => {
  const [hours, setHours] = useState<number>(new Date().getHours());
  const [minutes, setMinutes] = useState<number>(new Date().getMinutes());
  const [seconds, setSeconds] = useState<string>("");
  function setTime() {
    setInterval(() => {
      const date = new Date();

      setHours(date.getHours());
      setMinutes(date.getMinutes());
    }, 2000);
    setInterval(() => {
      const date = new Date();
      const dateSeconds = date.getSeconds();
      if (String(dateSeconds).length === 1) {
        setSeconds(`0${dateSeconds}`);
      } else {
        setSeconds(String(dateSeconds));
      }
    }, 1000);
  }

  setTime();

  return (
    <MeetInfo style={{ color: constants.appAccentColor }}>
      <span className='roomName'>Room - {roomName}</span>
      <span className='roomName'>
        {hours}:{minutes}:{seconds}
      </span>
      <button onClick={onClick}>Leave Room</button>
    </MeetInfo>
  );
});

export const UsersPanelInfo: FC<UsersInChatProps> = memo(({ theme, users }) => {
  return (
    <>
      <div
        className='length'
        style={{
          borderTop: `1px solid ${theme}`,
        }}
      >
        Number Of Users :{users.length}
      </div>
      {users.map((user) => (
        <User theme={theme} key={getRandomKey()}>
          {parse(user.profilePic)}
          <h2>{user.name}</h2>
        </User>
      ))}
    </>
  );
});

export const SharePanelInfo: FC<ShareProps> = ({
  roomName,
  theme,
  onClose,
}) => {
  const roomUrl = `${window.location.origin}/room/${roomName}`;
  const joinUrl = `${window.location.origin}/join`;
  return (
    <>
      <SidePanelHeaderComponent
        style={{
          borderBottom: `1px solid ${theme}`,
        }}
        onClose={onClose}
      >
        Share
      </SidePanelHeaderComponent>
      <h3>Users can join this room by :</h3>
      <h2>
        Go to this URL <br />
        <a>{joinUrl}</a>
        <br />
        <CopyBtn text={joinUrl} />
        <br />
        and write {roomName} as the name of the room <br />
        and fill out the other information.
      </h2>
      <h1 className='breaker'>OR</h1>
      <h2>
        Simply go to this URL
        <br />
        <a>{roomUrl}</a>
        <br />
        <CopyBtn text={roomUrl} />
      </h2>
    </>
  );
};

const CopyBtn: FC<{ text: string }> = memo(({ text }) => {
  return (
    <>
      <button className='copy' onClick={() => CopyToClipBoard(text)}>
        <MdContentCopy />
        Copy Link
      </button>
    </>
  );
});

function CopyToClipBoard(text: string): void {
  copy(text);
  toast.info("Copied ✅. Share this Url with anyone you trust");
}

export const SidePanelHeaderComponent: FC<PanelHeaderProps> = ({
  children,
  onClose,
  style,
}) => {
  return (
    <>
      <SidePanelHeader style={style ? style : {}}>
        <span>{children}</span>

        <FaTimes onClick={onClose} />
      </SidePanelHeader>
    </>
  );
};
const { apple, car, heart, fox, smile } = Emojis;
export const EmojiPanelInfo: FC = () => {
  const [emojiResourceType, setEmojiResourceType] = useState<
    "human" | "food" | "animals" | "objects" | "signs"
  >("human");
  return (
    <EmojiPanel>
      <div className='images_wrapper'>
        <img
          src={smile.src}
          alt={smile.alt}
          onClick={() => setEmojiResourceType("human")}
          style={{
            opacity: emojiResourceType === "human" ? 1 : 0.5,
          }}
        />
        <img
          src={fox.src}
          alt={fox.alt}
          onClick={() => setEmojiResourceType("animals")}
          style={{
            opacity: emojiResourceType === "animals" ? 1 : 0.5,
          }}
        />

        <img
          src={apple.src}
          alt={apple.alt}
          onClick={() => setEmojiResourceType("food")}
          style={{
            opacity: emojiResourceType === "food" ? 1 : 0.5,
          }}
        />
        <img
          src={car.src}
          alt={car.alt}
          onClick={() => setEmojiResourceType("objects")}
          style={{
            opacity: emojiResourceType === "objects" ? 1 : 0.5,
          }}
        />
        <img
          src={heart.src}
          alt={heart.alt}
          onClick={() => setEmojiResourceType("signs")}
          style={{
            opacity: emojiResourceType === "signs" ? 1 : 0.5,
          }}
        />
      </div>
      <div className='emojis__wrapper'>
        {emojiResourceType === "human" && <HumansComponent />}
        {emojiResourceType === "animals" && <AnimalComponent />}
        {emojiResourceType === "food" && <FoodComponent />}
        {emojiResourceType === "objects" && <ObjectsComponent />}
        {emojiResourceType === "signs" && <SignsComponent />}
      </div>
    </EmojiPanel>
  );
};

const HumansComponent: FC = memo(() => {
  const setMessage = useContext(MessageContext);
  return (
    <>
      {HumanRelatedEmojis.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          onClick={() => setMessage((prev) => prev + h)}
          key={getRandomKey()}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const SignsComponent: FC = memo(() => {
  const setMessage = useContext(MessageContext);
  return (
    <>
      {Symbols.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          onClick={() => setMessage((prev) => prev + h)}
          key={getRandomKey()}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const ObjectsComponent: FC = memo(() => {
  const setMessage = useContext(MessageContext);
  return (
    <>
      {Objects.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          onClick={() => setMessage((prev) => prev + h)}
          key={getRandomKey()}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const AnimalComponent: FC = memo(() => {
  const setMessage = useContext(MessageContext);
  return (
    <>
      {Animals.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          onClick={() => setMessage((prev) => prev + h)}
          key={getRandomKey()}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const FoodComponent: FC = memo(() => {
  const setMessage = useContext(MessageContext);
  return (
    <>
      {Food.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          onClick={() => setMessage((prev) => prev + h)}
          key={getRandomKey()}
        >
          {h}
        </span>
      ))}
    </>
  );
});

export const MessageComponent: FC<Message> = (props) => {
  if (props.type === "text") {
    return (
      <section className={props.className}>
        <div>
          <div className='info'>
            {/* @ts-ignore */}
            {parse(props.profilePic)}
            <span>
              {/* @ts-ignore */}
              {props.author} - {ReturnFormattedDate(props.created_at)}
            </span>
          </div>
          <div className='content'>
            {props.type === "text" ? props.content : ""}
          </div>
        </div>
      </section>
    );
  } else {
    return <span></span>;
  }
};
