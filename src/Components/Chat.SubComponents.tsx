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
  fetchPexelsApi,
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
import { FaTimes, FaSearch, FaSpinner } from "react-icons/fa";
import { Animals, Food, HumanRelatedEmojis, Objects, Symbols } from "../Emojis";
import Emojis from "../Images/Accumulator";
import { MessageContext } from "./ChatComponent";
import { BiSad } from "react-icons/bi";

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
      <button onClick={onClick}>
        Leave Room <IoMdExit />
      </button>
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

        <h2>
          Simply go to this URL
          <br />
          <a>{roomUrl}</a>
          <br />
          <CopyBtn text={roomUrl} />
        </h2>
        <h1 className='breaker'>OR</h1>
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
  let setMessage = useContext(MessageContext);
  return (
    <>
      {HumanRelatedEmojis.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setMessage.value += h;
            setMessage.focus();
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const SignsComponent: FC = memo(() => {
  let setMessage = useContext(MessageContext);
  return (
    <>
      {Symbols.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setMessage.value += h;
            setMessage.focus();
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const ObjectsComponent: FC = memo(() => {
  let setMessage = useContext(MessageContext);
  return (
    <>
      {Objects.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setMessage.value += h;
            setMessage.focus();
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const AnimalComponent: FC = memo(() => {
  let setMessage = useContext(MessageContext);
  return (
    <>
      {Animals.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setMessage.value += h;
            setMessage.focus();
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const FoodComponent: FC = memo(() => {
  let setMessage = useContext(MessageContext);
  return (
    <>
      {Food.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            setMessage.value += h;
            setMessage.focus();
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
  const imgRef = useRef();
  if (props.type === "text") {
    return (
      <section className={props.className}>
        <div>
          <div className='info'>
            {/* @ts-ignore */}
            {parse(props.profilePic)}
            <span>
              {/* @ts-ignore */}
              {props.className === "Outgoing" ? "You" : props.author} -{" "}
              {ReturnFormattedDate(props.created_at)}
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
  const [cachedSearches, setCachedSearches] = useState();
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  async function fetchData() {
    try {
      //@ts-ignore
      const res = await fetchPexelsApi(setApiUrl(inputRef.current.value));

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
      !inputRef.current.value ||
      //@ts-ignore
      !inputRef.current.value.trim() ||
      //@ts-ignore
      inputRef.current.value.length >= 30
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
        <input type='text' ref={inputRef} />
        <button type='submit'>
          <FaSearch />
        </button>
      </form>
      {isFetching === true ? (
        <IsFetching />
      ) : isFetching === false ? (
        <>
          <div className='sponsor'>
            <span>Images Provided By</span>
            <a href='https://www.pexels.com' target='_blank'>
              Pexels
            </a>
          </div>

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
        <h1 className='phrase'>Fetching Images ...</h1>
      </div>
    </>
  );
};

const FailedFetch: FC = () => {
  return (
    <>
      <div className='status__wrapper'>
        <BiSad className='error-svg' />
        <h1 className='error-content'>Couldn't find any images</h1>
      </div>
    </>
  );
};

const GotImages: FC<{ result: any }> = memo(({ result }) => {
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
