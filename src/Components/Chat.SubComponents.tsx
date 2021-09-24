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
} from "../Constants";
import { IoMdExit } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import Modal from "react-responsive-modal";

import {
  BanModalContent,
  EmojiPanel,
  ImagesPanel,
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
import { BiSad, BiSend } from "react-icons/bi";
import { HiOutlineBan } from "react-icons/hi";
import { SelfClientContext } from "../App";
import { Button } from "../Styled-components/Customize.style";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

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
    const [userToBeBannned, setUserToBeBanned] = useState<string>("");
    const [modalOpen, setIsModalOpen] = useState<boolean>(false);
    const [banText, setBanText] = useState<string>("");
    const ban = () => {
      if (banText && banText.trim()) {
        if (banText.length >= 51) {
          toast.error("Reason Length Too Big!");
        } else {
          onBan(userToBeBannned, banText);
          setBanText("");
          setIsModalOpen(false);
          setUserToBeBanned("");
        }
      } else {
        toast.error("Invalid Reason");
      }
    };
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
                    onClick={() => {
                      setUserToBeBanned(user.name);
                      setIsModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
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
        <Modal
          closeOnEsc={true}
          open={modalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setUserToBeBanned("");
          }}
          closeIcon={<FaTimes style={{ color: "white ", fontSize: "2vw" }} />}
          styles={{
            modal: {
              backgroundColor: constants.appAccentColor,
              color: "white",
              width: "50vw",
              padding: "2vw 0",
            },
            closeIcon: {
              outline: "none",
              border: "none",
            },
          }}
        >
          <BanModalContent>
            <div className='header'>Reason For Your Ban</div>

            <div
              style={{
                fontFamily: '"Poppins" , sans-serif',
                fontSize: "2vw",
              }}
            >
              Tell Us Why You Want To Ban User '{userToBeBannned}'
            </div>
            <div className='form'>
              <input
                type='text'
                value={banText}
                onChange={(e) => setBanText(e.target.value)}
              />
              <button className='submit__ban' onClick={ban}>
                <BiSend />
              </button>
            </div>
            <div className='actionsWrapper'>
              <button
                className='action'
                onClick={() => {
                  setIsModalOpen(false);
                  setUserToBeBanned("");
                }}
              >
                <span>Cancel</span> <FaTimes />
              </button>
              <button className='action' onClick={ban}>
                <span>Ban</span> <HiOutlineBan />
              </button>
            </div>
          </BanModalContent>
        </Modal>
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
        {emojiResourceType === "human" ? (
          <HumansComponent />
        ) : emojiResourceType === "animals" ? (
          <AnimalComponent />
        ) : emojiResourceType === "food" ? (
          <FoodComponent />
        ) : emojiResourceType === "objects" ? (
          <ObjectsComponent />
        ) : (
          <SignsComponent />
        )}
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

export const ImagesContent: FC = memo(() => {
  const inputRef = useRef();
  const [images, setImages] = useState();
  const [isFetching, setIsFetching] = useState<boolean | "Failed" | "Got">(
    false
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const [currentImgUrl, setCurrentImgUrl] = useState<string>("");
  const paginate: (isPrev: boolean) => void = (isPrev: boolean) => {
    setIsFetching(true);
    //@ts-ignore
    fetchData(isPrev ? images.prev_page : images.next_page);
  };
  const Images: FC = () => {
    return (
      <div className='images__wrapper'>
        {/* @ts-ignore */}
        {images.photos.map((img) => (
          <img
            key={getRandomKey()}
            src={img.src.landscape}
            //eslint-disable-nexxt-line
            alt={`Photo Taken By ${img.photographer} `}
            onClick={() => {
              setCurrentImgUrl(() => {
                setIsModalOpen(true);
                return img.src.landscape;
              });
            }}
          />
        ))}
        <div className='btns'>
          {/* @ts-ignore */}
          {images.prev_page ? (
            <Button onClick={() => paginate(true)}>
              <AiOutlineArrowLeft />
            </Button>
          ) : (
            ""
          )}
          {/* @ts-ignore */}
          {images.next_page ? (
            <Button onClick={() => paginate(false)}>
              <AiOutlineArrowRight />{" "}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
    fetchData("https://api.pexels.com/v1/curated");
  }, []);
  async function fetchData(paginatedUrl?: string) {
    const url = paginatedUrl
      ? paginatedUrl
      : `https://api.pexels.com/v1/search?query=${text}&orientation=landscape&per_page=40&page=1`;
    const response = await fetch(url, {
      headers: {
        //@ts-ignore
        Authorization: constants.PEXELS_API_KEY,
      },
    });
    const result = await response.json();
    if (result.photos.length === 0) {
      setIsFetching("Failed");
    } else {
      setImages(result);
      setIsFetching("Got");
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
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeIcon={<FaTimes style={{ color: "white", fontSize: "2vw" }} />}
        styles={{
          modal: {
            backgroundColor: constants.appAccentColor,
          },
        }}
      >
        <img src={currentImgUrl} alt='Image Loading' />
      </Modal>
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
        <h1
          style={{
            marginTop: "1vw",
            fontFamily: '"Poppins" , sans-serif',
          }}
        >
          One Sec
        </h1>
      ) : isFetching === "Failed" ? (
        <FailedFetch />
      ) : (
        <Images />
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
  async function fetchData() {}
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
        // <GotImages result={content} />
        <span></span>
      )}
    </>
  );
};
