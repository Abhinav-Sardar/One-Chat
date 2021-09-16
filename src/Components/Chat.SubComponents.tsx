import {
  FC,
  memo,
  useEffect,
  useState,
  useContext,
  useRef,
  FormEvent,
} from "react";
import {
  constants,
  getRandomKey,
  HeaderProps,
  Message,
  PanelHeaderProps,
  ReturnFormattedDate,
  ShareProps,
  UsersInChatProps,
  copy,
  fetchApi,
  setApiUrl,
} from "../Constants";
import { IoMdExit } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

import {
  EmojiPanel,
  MeetInfo,
  SidePanelHeader,
  User,
} from "../Styled-components/Chat.style";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { FaTimes, FaSearch, FaSpinner, FaCrown } from "react-icons/fa";
import { Animals, Food, HumanRelatedEmojis, Objects, Symbols } from "../Emojis";
import Emojis from "../Images/Accumulator";
import { MessageContext } from "./ChatComponent";
import { BiSad } from "react-icons/bi";
import { HiOutlineBan } from "react-icons/hi";
import { SelfClientContext } from "../App";
import { useSpring } from "react-spring";

export const ChatHeader: FC<HeaderProps> = memo(({ roomName, onClick }) => {
  const [hours, setHours] = useState<number>(new Date().getHours());
  const [minutes, setMinutes] = useState<number>(new Date().getMinutes());
  const [seconds, setSeconds] = useState<string>("");

  return (
    <MeetInfo style={{ color: constants.appAccentColor }}>
      <span className='roomName'>Room - {roomName}</span>
      <span className='roomName'>
        {hours}:{minutes}:{seconds}
      </span>
      <button onClick={onClick}>
        Leave Room <IoMdExit />
      </button>
    </MeetInfo>
  );
});

export const UsersPanelInfo: FC<UsersInChatProps> = memo(
  ({ theme, users, onBan, isHost }) => {
    const { name } = useContext(SelfClientContext)[0];

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
        {users.map((user) => {
          if (isHost) {
            return (
              <User theme={theme} key={getRandomKey()}>
                {parse(user.profilePic)}
                <h2>{user.name}</h2>
                {user.name === name ? (
                  ""
                ) : (
                  <HiOutlineBan
                    className='ban__icon'
                    onClick={() => onBan(user.name)}
                  />
                )}
                {user.host === true ? <FaCrown className='host__crown' /> : ""}
              </User>
            );
          } else {
            return (
              <User theme={theme} key={getRandomKey()}>
                {parse(user.profilePic)}
                <h2>{user.name}</h2>
                {user.host === true ? (
                  <FaCrown
                    className='host__crown'
                    data-tip={`${user.name} is host`}
                  />
                ) : (
                  ""
                )}
              </User>
            );
          }
        })}
      </>
    );
  }
);

export const SharePanelInfo: FC<ShareProps> = memo(
  ({ roomName, theme, onClose }) => {
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
          Simply by going to this URL
          <br />
          <a>{roomUrl}</a>
          <br />
          <CopyBtn text={roomUrl} />
        </h2>
        <h1 className='breaker'>OR</h1>
        <h2>
          Going to this URL <br />
          <a>{joinUrl}</a>
          <br />
          <CopyBtn text={joinUrl} />
          <br />
          and writing {roomName} as the name of the room <br />
          and filling out the other information.
        </h2>
      </>
    );
  }
);

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
  toast.info(constants.copySuccess);
}

export const SidePanelHeaderComponent: FC<PanelHeaderProps> = memo(
  ({ children, onClose, style }) => {
    return (
      <>
        <SidePanelHeader style={style ? style : {}}>
          <span>{children}</span>

          <FaTimes onClick={onClose} />
        </SidePanelHeader>
      </>
    );
  }
);
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
  const setText = useContext(MessageContext);
  return (
    <>
      {HumanRelatedEmojis.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setText((prev: string) => (prev += h));
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const SignsComponent: FC = memo(() => {
  const setText = useContext(MessageContext);
  return (
    <>
      {Symbols.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setText((prev: string) => (prev += h));
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const ObjectsComponent: FC = memo(() => {
  const setText = useContext(MessageContext);
  return (
    <>
      {Objects.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setText((prev: string) => (prev += h));
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const AnimalComponent: FC = memo(() => {
  const setText = useContext(MessageContext);
  return (
    <>
      {Animals.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setText((prev: string) => (prev += h));
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const FoodComponent: FC = memo(() => {
  const setText = useContext(MessageContext);
  return (
    <>
      {Food.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setText((prev: string) => (prev += h));
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

//@ts-ignore
export const MessageComponent: FC<Message> = memo((props) => {
  if (props.type === "text") {
    return (
      <section className={props.className}>
        <div>
          <div className='info'>
            {/* @ts-ignore */}
            {parse(props.profilePic)}
            <span>
              {/* @ts-ignore */}
              {props.className === "Outgoing"
                ? `${props.author} (You)`
                : props.author}{" "}
              - {ReturnFormattedDate(props.created_at)}
            </span>
          </div>
          <div
            className='content'
            style={{
              backgroundColor: props.accentColor,
            }}
          >
            {props.content}
          </div>
        </div>
      </section>
    );
  } else if (props.type === "image") {
    return "";
  }

  // else if (props.type === "tooltip") {
  //   if (props.className === "Entered") {
  //     return <Tooltip content={props.content} className={props.className} />;
  //   }
  // }
  else {
    return <span></span>;
  }
});

// const Tooltip: FC<{ content: string; className: "Entered" | "Left" }> = ({
//   className,
//   content,
// }) => {
//   if (className === "Entered") {
//   }
// };

export const ImagesContent: FC<{}> = memo(() => {
  const inputRef = useRef();
  const [content, setContent] = useState<object>({});
  const [isFetching, setIsFetching] = useState<boolean | "Failed" | "Got">(
    false
  );
  const [text, setText] = useState<string>("");
  const [cachedSearches, setCachedSearches] = useState();
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  async function fetchData() {
    try {
      //@ts-ignore
      const res = await fetchApi(setApiUrl(text, "image"), "image");

      console.log(res);
      if (res.photos.length === 0) {
        setIsFetching("Failed");
      } else {
        setContent(res);
        setIsFetching("Got");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      //@ts-ignore
      !text ||
      //@ts-ignore
      !text.trim() ||
      //@ts-ignore
      text.length >= 30
    ) {
      toast.error(constants.ImageInputErrorMsgs);
      setIsFetching(false);
    } else {
      setIsFetching(true);

      fetchData();
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Search For Images'
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </form>
      <div className='sponsor'>
        <span>Images Provided By</span>
        <a href='https://www.pexels.com' target='_blank'>
          Pexels
        </a>
      </div>

      {isFetching === true ? (
        <IsFetching />
      ) : isFetching === false ? (
        <>
          <h1>initial</h1>
        </>
      ) : isFetching === "Failed" ? (
        <FailedFetch />
      ) : (
        <GotImages result={content} />
      )}
    </>
  );
});

const IsFetching: FC = () => {
  return (
    <>
      <div className='status__wrapper'>
        <FaSpinner className='fetching-svg' />
        <h1 className='phrase'>Fetching ...</h1>
      </div>
    </>
  );
};

const FailedFetch: FC = () => {
  return (
    <>
      <div className='status__wrapper'>
        <BiSad className='error-svg' />
        <h1 className='error-content'>No items found!</h1>
      </div>
    </>
  );
};
const GotImages: FC<{ result: any }> = memo(({ result }) => {
  console.log(result);
  return (
    <>
      <div className='images__wrapper'>
        {result.photos.map((p: any) => (
          <img src={p.src.original} alt='' />
        ))}
      </div>
    </>
  );
});

export const GifContent: FC = () => {
  const inputRef = useRef();
  const [content, setContent] = useState<object>({});
  const [isFetching, setIsFetching] = useState<boolean | "Failed" | "Got">(
    false
  );
  const [text, setText] = useState<string>("");
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  async function fetchData() {
    try {
      //@ts-ignore
      const res = await fetchApi(setApiUrl(text, "gif"), "gif");
      console.log(res);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e: FormEvent) {
    setIsFetching(true);
    e.preventDefault();
    fetchData();
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder='Search for GIFs'
          type='text'
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </form>
      <div className='sponsor'>
        <span>GIFs Provided By</span>
        <a href='https://www.tenor.com' target='_blank'>
          Tenor
        </a>
      </div>

      {isFetching === true ? (
        <IsFetching />
      ) : isFetching === false ? (
        <>
          <h1>initial</h1>
        </>
      ) : isFetching === "Failed" ? (
        <FailedFetch />
      ) : (
        <GotImages result={content} />
      )}
    </>
  );
};
