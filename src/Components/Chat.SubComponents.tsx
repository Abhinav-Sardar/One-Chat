import {
  FC,
  memo,
  useEffect,
  useState,
  useContext,
  useRef,
  FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactDom from "react-dom";

import {
  constants,
  getRandomKey,
  HeaderProps,
  Message,
  PanelHeaderProps,
  ReturnFormattedDate,
  UsersInChatProps,
  validateModal,
  numOrStr,
  returnUpdatedDate,
  decrypt,
  clipText,
  scrollMessageIntoView,
  ModalProps,
  PostChatProps,
} from "../Constants";
import { IoMdExit } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";

import {
  ModalContent,
  EmojiPanel,
  MeetInfo,
  SidePanelHeader,
  User,
  Indicator,
  MiniatureReplyPreviewDiv,
  StyledPostPage,
} from "../Styled-components/Chat.style";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { FaTimes, FaSearch, FaSpinner, FaCrown, FaHome } from "react-icons/fa";
import { Animals, Food, HumanRelatedEmojis, Objects, Symbols } from "../Emojis";
import Emojis, { Pop } from "../Images/Accumulator";

import { BiSad, BiSend, BiTimeFive } from "react-icons/bi";
import { HiOutlineBan } from "react-icons/hi";
import { ReplyContext, SelfClientContext } from "../Context";
import { Button } from "../Styled-components/Customize.style";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineGif,
} from "react-icons/ai";

import {
  BsArrow90DegLeft,
  BsArrow90DegRight,
  BsArrowReturnRight,
} from "react-icons/bs";
import { useQuery } from "react-query";
import { FiTrendingUp, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ChatHeader: FC<HeaderProps> = memo(({ onClick, onEnd }) => {
  //@ts-ignore
  const [time, setTime] = useState<numOrStr>(returnUpdatedDate());
  const [user, setUser] = useContext(SelfClientContext);
  useEffect(() => {
    setInterval(() => {
      //@ts-ignore
      setTime(returnUpdatedDate());
    }, 1000);
  }, []);
  return (
    <MeetInfo>
      <span className='roomName'>Room - {user.currentRoomName}</span>
      <span className='roomName'>
        <BiTimeFive />
        {time}
      </span>
      <div className='btn-wrapper'>
        {user.isHost && (
          <button onClick={onEnd}>
            End Room <FiX />
          </button>
        )}
        <button onClick={onClick}>
          Leave Room <IoMdExit />
        </button>
      </div>
    </MeetInfo>
  );
});

export const UsersPanelInfo: FC<UsersInChatProps> = memo(
  ({ theme, users, onBan, userId }) => {
    const { isHost, name } = useContext(SelfClientContext)[0];
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
    useEffect(() => {
      if (modalOpen) {
        //@ts-ignore
        document.querySelector(".modal").style.height = "50vh";
      }
    }, [modalOpen]);
    return (
      <>
        <div className='length'>Number Of Users :{users.length}</div>
        {users.map((user) => {
          if (isHost) {
            return (
              <User theme={theme} key={getRandomKey()}>
                {parse(user.profilePic)}
                <span>
                  {user.name}
                  {user.name === name && user.id === userId && " (You)"}
                </span>
                {user.name === name && user.id === userId ? (
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
                <span>
                  {user.name}
                  {user.name === name && user.id === userId && " (You)"}
                </span>
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
        <CustomModal
          isOpen={modalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setUserToBeBanned("");
          }}
        >
          <ModalContent>
            <div className='header'>Reason for your kick ?</div>

            <div
              style={{
                fontFamily: '"Poppins" , sans-serif',
                fontSize: "2vw",
              }}
            >
              Tell Us Why You Want To kick user '{userToBeBannned}'
            </div>
            <div className='form'>
              <input
                type='text'
                value={banText}
                onChange={(e) => setBanText(e.target.value)}
              />
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
                <span>Kick</span> <HiOutlineBan />
              </button>
            </div>
          </ModalContent>
        </CustomModal>
      </>
    );
  }
);

export const SharePanelInfo: FC = memo(() => {
  const { currentRoomName: roomName } = useContext(SelfClientContext)[0];
  const roomUrl = `${window.location.origin}/room/${roomName}`;
  const joinUrl = `${window.location.origin}/join`;
  return (
    <>
      <div className='header'>Users Can Join This Room By:-</div>
      <div className='description'>
        <span>Going to this url</span>
        <div className='url'>{roomUrl}</div>
        <CopyBtn text={roomUrl} />
      </div>
      <div className='description' style={{ marginTop: "1vw" }}>
        <span>Or By Going to The Join Url</span>
        <div className='url'>{joinUrl}</div>
        <CopyBtn text={joinUrl} />
        <div className='description' style={{ fontSize: "1.5vw" }}>
          And filling out the necessary information
        </div>
      </div>
    </>
  );
});

const CopyBtn: FC<{ text: string }> = memo(({ text }) => {
  const copy: () => void = async () => {
    await navigator.clipboard.writeText(text);
    toast.info(constants.copySuccess);
  };
  return (
    <>
      <button className='copy' onClick={copy}>
        <MdContentCopy />
        Copy Link
      </button>
    </>
  );
});

export const SidePanelHeaderComponent: FC<PanelHeaderProps> = memo(
  ({ children, onClose, style }) => {
    return (
      <>
        <SidePanelHeader style={style ? style : {}}>
          <span>{children}</span>

          <FiX onClick={onClose} style={{ cursor: "pointer" }} />
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

export const MessageComponent: FC<Message> = memo((props) => {
  const [replyState, setReplyState] = useContext(ReplyContext);
  const onClick = () => {
    if (
      replyState.id === props.id &&
      replyState.isOpen === true &&
      replyState.content.author === props.author
    ) {
      return;
    } else {
      setReplyState({
        id: props.id,
        isOpen: true,
        content: props,
      });
    }
  };
  if (props.type === "text") {
    return (
      <section className={props.className} id={props.id}>
        <div>
          <div className='info'>
            {parse(props.profilePic)}
            <span>
              {props.className === "Outgoing"
                ? `${props.author} (You)`
                : props.author}{" "}
              - {ReturnFormattedDate(props.created_at)}
            </span>
            {props.className === "Incoming" && (
              <BsArrow90DegLeft className='reply' onClick={onClick} />
            )}
            {props.className === "Outgoing" && (
              <BsArrow90DegRight className='reply' onClick={onClick} />
            )}
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
      <section className={props.className} id={props.id}>
        <div>
          <div className='info'>
            {parse(props.profilePic)}
            <span>
              {props.className === "Outgoing"
                ? `${props.author} (You)`
                : props.author}{" "}
              - {ReturnFormattedDate(props.created_at)}
            </span>
            {props.className === "Incoming" && (
              <BsArrow90DegLeft className='reply' onClick={onClick} />
            )}
            {props.className === "Outgoing" && (
              <BsArrow90DegRight className='reply' onClick={onClick} />
            )}
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
              src={decrypt(props.content)}
              alt='Image Loading'
              style={{
                alignSelf: "center",
              }}
            />
            <br />
            <span className='caption'>{decrypt(props.caption)}</span>
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
    return (
      <section className={props.className} id={props.id}>
        <div>
          <div className='info'>
            {parse(props.profilePic)}
            <span>
              {props.className === "Outgoing"
                ? `${props.author} (You)`
                : props.author}{" "}
              - {ReturnFormattedDate(props.created_at)}
            </span>
            {props.className === "Incoming" && (
              <BsArrow90DegLeft className='reply' onClick={onClick} />
            )}
            {props.className === "Outgoing" && (
              <BsArrow90DegRight className='reply' onClick={onClick} />
            )}
          </div>
          <div
            className='content'
            style={{
              backgroundColor: props.accentColor,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <span>{decrypt(props.content)}</span>
          </div>
          <div className='reply-chip'>
            <BsArrowReturnRight />
            <span>Replying To...</span>
          </div>
          <div
            className='reply-cont'
            onClick={() => scrollMessageIntoView(props.to.id)}
          >
            <MiniatureReplyPreview props={props.to} isProd={true} />
          </div>
        </div>
      </section>
    );
  }
});

export const ImagesContent: FC<{
  onImgSubmit: (imgUrl: string, caption: string) => void;
}> = memo(({ onImgSubmit }) => {
  const inputRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImgUrl, setCurrentImgUrl] = useState<string>("");
  const [queryData, setQueryData] = useState<{ url: string; queryKey: any[] }>({
    url: "https://api.pexels.com/v1/curated?per_page=20",
    queryKey: ["images", "trending", 0],
  });
  const { data, status } = useQuery(
    queryData.queryKey,
    () => constants.fetcher(queryData.url, true),
    constants.queryConfig
  );
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);
  const paginate = (type: "previous" | "next") => {
    if (type === "next") {
      const queryKeys = [...queryData.queryKey];
      queryKeys[2] = queryKeys[2] + 1;
      const newData = {
        url: data.next_page,
        queryKey: queryKeys,
      };
      setQueryData(newData);
    } else {
      const queryKeys = [...queryData.queryKey];
      queryKeys[2] = queryKeys[2] - 1;
      const newData = {
        url: data.prev_page,
        queryKey: queryKeys,
      };
      setQueryData(newData);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const el: HTMLInputElement = document.querySelector("input#search__box");
    const text = el.value;
    if (!validateModal(text)) {
      toast.error(constants.imageInputErrorMsg);
    } else {
      setQueryData({
        url: `https://api.pexels.com/v1/search?query=${text}&per_page=20`,
        queryKey: ["images", text, 0],
      });
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
            <Button onClick={() => paginate("previous")}>
              <AiOutlineArrowLeft />
            </Button>
          ) : (
            ""
          )}
          {/* @ts-ignore */}
          {data?.next_page ? (
            <Button onClick={() => paginate("next")}>
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
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </CustomModal>
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
      {queryData.url.includes("curated") || (
        <Button
          style={{ height: "5vw" }}
          onClick={() => {
            setQueryData({
              url: "https://api.pexels.com/v1/curated?per_page=20",
              queryKey: ["images", "trending", 0],
            });
          }}
        >
          <span>Show Trending Images</span> <FiTrendingUp />
        </Button>
      )}

      {status === "loading" ? (
        <IsFetching />
      ) : status === "error" || data.photos.length === 0 ? (
        <FailedFetch />
      ) : status === "success" ? (
        <Images />
      ) : (
        ""
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
  const [queryData, setQueryData] = useState<{
    url: string;
    queryKey: string | any[];
  }>({
    url: `https://g.tenor.com/v1/trending?key=${constants.tenorApiKey}&limit=35`,
    queryKey: ["gifs", "trending"],
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentGifUrl, setCurrentGifUrl] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    //@ts-ignore
    inputRef.current.focus();
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const el: HTMLInputElement = document.querySelector("#search__box");
    const text = el.value;
    if (!validateModal(text)) {
      toast.error(constants.imageInputErrorMsg);
    } else {
      setQueryData({
        url: `https://api.tenor.com/v1/search?q=${text}&key=${constants.tenorApiKey}&limit=35`,
        queryKey: ["gifs", text],
      });
    }
  }

  const { data, status } = useQuery(
    queryData.queryKey,
    () => constants.fetcher(queryData.url, false),
    constants.queryConfig
  );

  const Images: FC = memo(() => {
    return (
      <>
        {queryData.url !==
          `https://g.tenor.com/v1/trending?key=${constants.tenorApiKey}&limit=35` && (
          <Button
            onClick={() =>
              setQueryData({
                url: `https://g.tenor.com/v1/trending?key=${constants.tenorApiKey}&limit=35`,
                queryKey: ["gifs", "trending"],
              })
            }
          >
            <span>Show Trending Gifs</span>
            <FiTrendingUp />
          </Button>
        )}
        <div className='images__wrapper'>
          {data?.results.map((gif: any) => (
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
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
      </CustomModal>
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
      {status === "loading" ? (
        <IsFetching />
      ) : status === "error" || data?.results.length === 0 ? (
        <FailedFetch />
      ) : status === "success" ? (
        <Images />
      ) : (
        ""
      )}
    </>
  );
});

const GifMessage: FC<{ props: Message }> = memo(({ props }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [replyState, setReplyState] = useContext(ReplyContext);
  const onClick = () => {
    if (
      replyState.id === props.id &&
      replyState.isOpen === true &&
      replyState.content.author === props.author
    ) {
      return;
    } else {
      setReplyState({
        id: props.id,
        isOpen: true,
        content: props,
      });
    }
  };
  return (
    <section className={props.className} id={props.id}>
      <div>
        <div className='info'>
          {parse(props.profilePic)}
          <span>
            {props.className === "Outgoing"
              ? `${props.author} (You)`
              : props.author}{" "}
            - {ReturnFormattedDate(props.created_at)}
          </span>
          {props.className === "Incoming" && (
            <BsArrow90DegLeft className='reply' onClick={onClick} />
          )}
          {props.className === "Outgoing" && (
            <BsArrow90DegRight className='reply' onClick={onClick} />
          )}
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
              src={decrypt(isPlaying ? props.content : props.preview_url)}
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

          <span className='caption'>{decrypt(props.caption)}</span>
        </div>
      </div>
    </section>
  );
});

export const FadedAnimationWrapper: FC = ({ children }) => {
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.3,
      }}
      initial={{
        opacity: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export const MiniatureReplyPreview: FC<{
  props: Message;
  isProd: boolean;
}> = ({ props, isProd }) => {
  const { type } = props;
  if (type === "text" || type === "reply") {
    return (
      <MiniatureReplyPreviewDiv style={{ flexDirection: "column" }}>
        <div className='info-reply' style={{ color: "#00baff" }}>
          {props.className === "Outgoing"
            ? `${props.author} (You)`
            : props.author}{" "}
          - {ReturnFormattedDate(new Date(props.created_at))}
        </div>
        <div
          className='content-reply'
          style={{
            background: props.accentColor,
            width: isProd ? "70%" : "45%",
          }}
        >
          {!isProd
            ? clipText(decrypt(props.content), 50)
            : clipText(decrypt(props.content), 35)}
        </div>
      </MiniatureReplyPreviewDiv>
    );
  } else if (type === "gif" || type === "image") {
    return (
      <MiniatureReplyPreviewDiv style={{ flexDirection: "row" }}>
        <img
          src={decrypt(props.content)}
          alt=''
          className='img'
          style={{
            width: isProd ? "20%" : "10%",
            height: "100%",
          }}
        />
        <div
          className='text'
          style={{
            width: isProd ? "80%" : "90%",
          }}
        >
          <div className='info-reply'>
            {props.className === "Outgoing"
              ? `${props.author} (You)`
              : props.author}{" "}
            - {ReturnFormattedDate(new Date(props.created_at))}
          </div>
          <div
            className='content-reply'
            style={{
              background: props.accentColor,
              width: isProd ? "90%" : "45%",
            }}
          >
            {!isProd
              ? clipText(decrypt(props.caption), 50)
              : clipText(decrypt(props.caption), 35)}
          </div>
        </div>
      </MiniatureReplyPreviewDiv>
    );
  }
};

export const CustomModal: (props: ModalProps) => any = ({
  children,
  isOpen,
  onClose,
}) => {
  const modalVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      return () =>
        document.removeEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            onClose();
          }
        });
    });
  });
  return ReactDom.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='modal-backdrop'
            onClick={onClose}
            initial='initial'
            animate='animate'
            exit='exit'
            variants={modalVariants}
          />
          <motion.div
            className='modal'
            variants={modalVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <div className='close' onClick={onClose}>
              <FiX />
            </div>
            <div className='content'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
};

export const PostChatComponent: FC<{ data: PostChatProps }> = ({
  data: { Icon, content },
}) => {
  const navigate = useNavigate();
  return (
    <FadedAnimationWrapper>
      <StyledPostPage>
        <div className='icon'>
          <Icon className='icon' />
        </div>
        <span className='title'>{content[0]}</span>
        <span className='description'>{content[1]}</span>
        <Button onClick={() => navigate("/")}>
          <span>Back To Home</span>
          <FaHome />
        </Button>
      </StyledPostPage>
    </FadedAnimationWrapper>
  );
};
