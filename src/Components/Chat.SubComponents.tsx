import {
  FC,
  memo,
  useEffect,
  useState,
  useContext,
  useRef,
  FormEvent,
} from "react";
import axios from "axios";

import useSwr from "swr";
import {
  constants,
  getRandomKey,
  HeaderProps,
  Message,
  PanelHeaderProps,
  ReturnFormattedDate,
  ShareProps,
  UsersInChatProps,
  validateModal,
  numOrStr,
  returnUpdatedDate,
  decrypt,
  useSharedPanelValue,
  exitFullScreen,
  goFullScreen,
} from "../Constants";
import { IoMdExit } from "react-icons/io";
import { MdContentCopy, MdGif } from "react-icons/md";
import Modal from "react-responsive-modal";

import {
  ModalContent,
  EmojiPanel,
  ImagesPanel,
  MeetInfo,
  SidePanelHeader,
  User,
  Indicator,
} from "../Styled-components/Chat.style";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaSearch,
  FaSpinner,
  FaCrown,
  FaMoon,
  FaRegSmile,
  FaShareAlt,
  FaSmile,
  FaSun,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import { Animals, Food, HumanRelatedEmojis, Objects, Symbols } from "../Emojis";
import Emojis, { Pop } from "../Images/Accumulator";

import { BiSad, BiSend, BiTimeFive } from "react-icons/bi";
import { HiOutlineBan } from "react-icons/hi";
import { SelfClientContext } from "../App";
import { Button } from "../Styled-components/Customize.style";
import {
  AiFillFileImage,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineFileImage,
  AiOutlineGif,
  AiOutlineUser,
} from "react-icons/ai";
import { FiShare2, FiMinimize, FiMaximize } from "react-icons/fi";
import { RiFileGifLine, RiFileGifFill } from "react-icons/ri";
import { animated, useSpring } from "react-spring";

export const ChatHeader: FC<HeaderProps> = memo(({ roomName, onClick }) => {
  //@ts-ignore
  const [time, setTime] = useState<numOrStr>(returnUpdatedDate());
  //@ts-ignore
  const [hours, minutes, seconds] = time;

  useEffect(() => {
    setInterval(() => {
      //@ts-ignore
      setTime(returnUpdatedDate());
    }, 1000);
  }, []);
  return (
    <MeetInfo style={{ color: constants.appAccentColor }}>
      <span className='roomName'>Room - {roomName}</span>
      <span className='roomName'>
        <BiTimeFive />
        {hours}:{minutes}:{seconds}
      </span>
      <button onClick={onClick}>
        Leave Room <IoMdExit />
      </button>
    </MeetInfo>
  );
});

export const UsersPanelInfo: FC<UsersInChatProps> = memo(
  ({ theme, users, onBan }) => {
    const { name } = useContext(SelfClientContext)[0];
    const [userToBeBannned, setUserToBeBanned] = useState<string>("");
    const [modalOpen, setIsModalOpen] = useState<boolean>(false);
    const [banText, setBanText] = useState<string>("");
    const isHost = users.find((user) => user.name === name).host;
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
        <div className='length'>Number Of Users :{users.length}</div>
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
          <ModalContent>
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
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export const SharePanelInfo: FC<ShareProps> = memo(({ roomName }) => {
  const roomUrl = `${window.location.origin}/room/${roomName}`;
  const joinUrl = `${window.location.origin}/join`;
  return (
    <>
      <div className='header'>Users can join this room by :- </div>
      <div className='description'>
        <span>By Simply Going TO This URL</span>
        <div className='url' onClick={() => window.open(roomUrl)}>
          {roomUrl}
        </div>
        <CopyBtn text={roomUrl} />
      </div>
    </>
  );
});

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

async function CopyToClipBoard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
  toast.info(constants.copySuccess);
}

export const SidePanelHeaderComponent: FC<PanelHeaderProps> = memo(
  ({ children, onClose, style }) => {
    return (
      <>
        <SidePanelHeader style={style ? style : {}}>
          <span>{children}</span>

          <FaTimes onClick={onClose} style={{ cursor: "pointer" }} />
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
  return (
    <>
      {HumanRelatedEmojis.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            //@ts-ignore
            const el: HTMLInputElement =
              document.getElementById("message__input");
            el.value += h;
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const SignsComponent: FC = memo(() => {
  return (
    <>
      {Symbols.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            //@ts-ignore
            const el: HTMLInputElement =
              document.getElementById("message__input");
            el.value += h;
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});
const ObjectsComponent: FC = memo(() => {
  return (
    <>
      {Objects.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            //@ts-ignore
            const el: HTMLInputElement =
              document.getElementById("message__input");
            el.value += h;
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const AnimalComponent: FC = memo(() => {
  return (
    <>
      {Animals.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            //@ts-ignore
            const el: HTMLInputElement =
              document.getElementById("message__input");
            el.value += h;
          }}
        >
          {h}
        </span>
      ))}
    </>
  );
});

const FoodComponent: FC = memo(() => {
  return (
    <>
      {Food.map((h) => (
        <span
          className='emoji'
          //@ts-ignore
          key={getRandomKey()}
          onClick={() => {
            //@ts-ignore
            const el: HTMLInputElement =
              document.getElementById("message__input");
            el.value += h;
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
            {parse(props.profilePic)}
            <span>
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
            <span>{decrypt(props.content)}</span>
          </div>
        </div>
      </section>
    );
  } else if (props.type === "gif") {
    return <GifMessage props={props} key={getRandomKey()} />;
  } else if (props.type === "image") {
    return (
      <section className={props.className}>
        <div>
          <div className='info'>
            {parse(props.profilePic)}
            <span>
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={props.content}
              alt='Image Loading'
              style={{
                alignSelf: "center",
              }}
            />
            <br />
            <span className='caption'>{props.caption}</span>
          </div>
        </div>
      </section>
    );
  } else if (props.type === "indicator") {
    return (
      <Indicator
        className='tooltip'
        style={{ backgroundColor: props.background }}
      >
        <span>{props.content}</span>
        <props.Icon />
      </Indicator>
    );
  } else {
    return <span></span>;
  }
});

export const ImagesContent: FC<{
  onImgSubmit: (imgUrl: string, caption: string) => void;
}> = memo(({ onImgSubmit }) => {
  const inputRef = useRef();

  const [isFetching, setIsFetching] = useState<boolean | "Failed" | "Got">(
    false
  );
  const [url, setUrl] = useState<string>("https://api.pexels.com/v1/curated");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data } = useSwr(url, fetchData);
  const [currentImgUrl, setCurrentImgUrl] = useState<string>("");
  const paginate: (isPrev: boolean) => void = (isPrev: boolean) => {
    setIsFetching(true);
    //@ts-ignore
    setUrl(isPrev ? data?.prev_page : data?.next_page);
  };
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);

  async function fetchData() {
    const response = await axios.get(url, {
      headers: {
        Authorization: constants.PEXELS_API_KEY,
      },
    });
    let returned = null;
    const result = await response.data;
    console.log(result);
    if (result.photos.length === 0) {
      setIsFetching("Failed");
    } else {
      setIsFetching("Got");
      returned = result;
    }
    return returned;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const el: HTMLInputElement = document.querySelector("input#search__box");
    const text = el.value;
    if (!validateModal(text)) {
      toast.error(constants.imageInputErrorMsg);
      setIsFetching(false);
      setUrl("https://api.pexels.com/v1/curated");
    } else {
      setIsFetching(true);
      setUrl(
        `https://api.pexels.com/v1/search?query=${text}&orientation=landscape&per_page=40`
      );
    }
  };

  const Images: FC = memo(() => {
    return (
      <div className='images__wrapper'>
        {/* @ts-ignore */}
        {data?.photos.map((img) => (
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
          {data?.prev_page ? (
            <Button onClick={() => paginate(true)}>
              <AiOutlineArrowLeft />
            </Button>
          ) : (
            ""
          )}
          {/* @ts-ignore */}
          {data?.next_page ? (
            <Button onClick={() => paginate(false)}>
              <AiOutlineArrowRight />{" "}
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  });
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
        <ModalContent>
          <div className='header'>Add A Caption</div>
          <img src={currentImgUrl} alt='Image Loading' />
          <div className='form'>
            <input type='text' id='caption__box' />
          </div>

          <div className='actionsWrapper'>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCurrentImgUrl("");
              }}
            >
              Cancel <FaTimes />
            </button>
            <button
              onClick={() => {
                const el: HTMLInputElement =
                  document.querySelector("input#caption__box");
                const caption = el.value;
                if (!validateModal(caption)) {
                  toast.error("Invalid Message Or Message Length Too Long!");
                } else {
                  onImgSubmit(currentImgUrl, caption);
                  setIsModalOpen(false);

                  setCurrentImgUrl("");
                  Pop.play();
                }
              }}
            >
              Post <BiSend />
            </button>
          </div>
        </ModalContent>
      </Modal>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          ref={inputRef}
          id='search__box'
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
        <Images />
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

export const GifContent: FC<{
  onGifSubmit: (gifUrl: string, caption: string, preview: string) => void;
}> = memo(({ onGifSubmit }) => {
  const inputRef = useRef();
  const [url, setUrl] = useState<string>(
    `https://g.tenor.com/v1/trending?key=${constants.tenorApiKey}`
  );

  const { data, error } = useSwr(url, fetchData);
  const [isFetching, setIsFetching] = useState<boolean | "Failed" | "Got">(
    false
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentGifUrl, setCurrentGifUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    if (error === true) {
      setIsFetching("Failed");
    }
  }, [error]);

  async function fetchData() {
    const result = await (await axios.get(url)).data;
    let valueToBeReturned = null;
    if (result.results.length === 0 || Number(result.next) === 0) {
      setIsFetching("Failed");
    } else {
      valueToBeReturned = result.results;
      setIsFetching("Got");
    }

    return valueToBeReturned;
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFetching(true);
    const el: HTMLInputElement = document.querySelector("#search__box");
    const text = el.value;
    if (!validateModal(text)) {
      toast.error(constants.imageInputErrorMsg);
      setIsFetching(false);
    } else {
      console.log("Reached Here!");
      setUrl(
        `https://g.tenor.com/v1/search?key=${constants.tenorApiKey}&q=${text}&contentfilter=medium&limit=50`
      );
    }
  }
  const Images: FC = memo(() => {
    return (
      <>
        <div className='images__wrapper'>
          {data?.map((gif: any) => (
            <img
              className='gif'
              src={gif.media[0].tinygif.url}
              key={gif.id}
              alt='Loading ...'
              onClick={() => {
                setCurrentGifUrl(gif.media[0].tinygif.url);
                setIsModalOpen(true);
                setPreview(gif.media[0].tinygif.preview);
              }}
            />
          ))}
        </div>
      </>
    );
  });
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
        <ModalContent>
          <div className='header'>Add A Caption</div>
          <img src={currentGifUrl} alt='Image Loading' />
          <div className='form'>
            <input type='text' id='caption__box' />
          </div>

          <div className='actionsWrapper'>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setCurrentGifUrl("");

                setPreview("");
              }}
            >
              Cancel <FaTimes />
            </button>
            <button
              onClick={() => {
                const el: HTMLInputElement =
                  document.querySelector("input#caption__box");
                const caption = el.value;
                if (!validateModal(caption)) {
                  toast.error("Invalid Message Or Message Length Too Long!");
                } else {
                  onGifSubmit(currentGifUrl, caption, preview);
                  setIsModalOpen(false);
                  setCurrentGifUrl("");
                  setPreview("");
                  Pop.play();
                }
              }}
            >
              Post <BiSend />
            </button>
          </div>
        </ModalContent>
      </Modal>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder='Search for GIFs'
          type='text'
          ref={inputRef}
          id='search__box'
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
      ) : isFetching === "Failed" ? (
        <FailedFetch />
      ) : (
        <Images />
      )}
    </>
  );
});

/**
 *
 * d3pno32ne32
 * r32
 * rr32
 * Dhand dhand dhan dha da  phusssshhh
 */

const GifMessage: FC<{ props: Message }> = memo(({ props }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  return (
    <section className={props.className}>
      <div>
        <div className='info'>
          {parse(props.profilePic)}
          <span>
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {" "}
            <img
              src={isPlaying ? props.content : props.preview_url}
              alt='Image Loading'
              style={{
                alignSelf: "center",
              }}
            />
            {!isPlaying ? (
              <AiOutlineGif
                className='gifPlayer'
                onClick={() => {
                  setIsPlaying(true);

                  setInterval(() => {
                    setIsPlaying(false);
                  }, 6000);
                }}
              />
            ) : (
              ""
            )}
          </div>

          <span className='caption'>{props.caption}</span>
        </div>
      </div>
    </section>
  );
});

export const FadedAnimationWrapper: FC = ({ children }) => {
  const fadeAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: { opacity: 1 },
  });
  return <animated.div style={fadeAnimation}>{children}</animated.div>;
};
