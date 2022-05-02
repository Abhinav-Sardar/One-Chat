import { AnimatePresence, AnimateSharedLayout, motion, useMotionValue, useTransform, Variants } from "framer-motion";
import Link, { LinkProps } from "next/link";
import {
  createContext,
  CSSProperties,
  Dispatch,
  FC,
  FormEventHandler,
  memo,
  ReactPortal,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoChatboxSharp } from "react-icons/io5";
import { formatAudioDuration, getConstants, getRandomKey, pad, useAddToast, validateText } from "./constants";
import { ButtonProps, SafeLinkProps, ModalProps, ToggleProps, ToastMessage, CategoriesType } from "./Types";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
import styles from "../styles/Components.module.scss";
import { ToastContext } from "./Context";
import { RiContactsBookLine, RiH1 } from "react-icons/ri";
import { BiCheck, BiErrorCircle, BiSend, BiVolumeFull } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { IconType } from "react-icons/";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdForward5, MdReplay5 } from "react-icons/md";
const {
  accentColor,
  varaints: { modalVariants, modalOverlayVariants },
} = getConstants();
export const PageWrapper: FC = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className='page-wrapper'
    >
      {children}
    </motion.div>
  );
};
export const Logo: FC<{ size: number }> = ({ size }) => {
  return (
    <IoChatboxSharp
      style={{
        fontSize: `${size * 10}rem`,
        fill: accentColor,
      }}
    />
  );
};
export const SafeLink: FC<SafeLinkProps> = ({ children, ...rest }) => {
  return <Link {...rest}>{children}</Link>;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  backgroundColor = "#bd14ca",
  color = "#fff",
  children,
  ...rest
}) => {
  return (
    <>
      <style jsx>
        {`
          button {
            color: ${color};
            background-color: ${backgroundColor};
            border: 1px solid ${backgroundColor};
            transition: color 400ms ease-in-out, background-color 400ms ease-in-out, transform 100ms ease-in-out;
          }
          button:hover {
            background-color: ${color};

            color: ${backgroundColor};
          }
          button:active {
            transform: scale(0.9);
          }
        `}
      </style>
      <button className={styles.button} {...rest} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export const AccentText: FC<{ style?: CSSProperties; inverted: boolean }> = ({ children, style, inverted }) => {
  return (
    <>
      <style jsx>
        {`
          .accentText {
            color: ${inverted ? "#fff" : accentColor};
            font-family: "Raleway", sans-serif;
            font-size: 1.9rem;
          }
          .accentText::selection {
            background: ${inverted ? "#fff" : accentColor};
            color: ${inverted ? accentColor : "#fff"};
          }
        `}
      </style>
      <span className='accentText' style={style}>
        {children}
      </span>
    </>
  );
};

export const Modal: FC<ModalProps> = ({ onClose, isOpen, children, title }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const id = getRandomKey();
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  const element = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='modal-overlay'
            variants={modalOverlayVariants}
            initial='initial'
            animate='animate'
            onClick={onClose}
            exit='initial'
            transition={{ duration: 0.5 }}
          />
          <motion.div
            // @ts-ignore

            variants={modalVariants}
            className={styles.modal}
            exit='initial'
            id={id}
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
            initial='initial'
            animate='animate'
          >
            <header className='header'>
              <AccentText inverted={true}>{title}</AccentText>

              <VscChromeClose fill='white' fontSize='2rem' style={{ cursor: "pointer" }} onClick={onClose} />
            </header>
            <div className='content' style={{ flex: 1 }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  return mounted ? ReactDOM.createPortal(element, document.getElementById("modal")!) : null;
};
export const Toggle: FC<ToggleProps> = ({ isToggled, setIsToggled }) => {
  return (
    <>
      <motion.div
        className={`${styles.toggle}`}
        data-istoggled={isToggled}
        transition={{ duration: 1 }}
        onClick={() => setIsToggled(!isToggled)}
      >
        <motion.div className={`toggle-btn`} layout transition={{ duration: 0.3 }} />
      </motion.div>
    </>
  );
};
const toastColorSchemes: { [key in "success" | "error"]: { progressColor: string; backgroundColor: string } } = {
  error: {
    backgroundColor: "#ff1f0f",
    progressColor: "#ffabab",
  },
  success: {
    backgroundColor: "#38c742",
    progressColor: "#40ff60",
  },
};
const Toast: FC<{ toast: ToastMessage; index: number }> = memo(({ toast, index }) => {
  const [toasts, setToasts] = useContext(ToastContext);
  const width = useMotionValue("100%");
  return (
    <motion.div
      initial={{ x: 500 }}
      layout
      id={toast.id}
      animate={{ x: 0, transition: { type: "spring", damping: 10 } }}
      exit={{ x: 500 }}
      style={{ background: toastColorSchemes[toast.type].backgroundColor, top: (index + 0.1) * 80 }}
      className={styles.toast}
      onClick={() => {
        setToasts(toasts.filter(t => t.id !== toast.id));
      }}
    >
      <div className='toast-content'>
        {toast.type === "error" ? <BiErrorCircle /> : <BiCheck />}
        <span>{toast.content}</span>
      </div>
      <motion.div
        className='progress'
        style={{ width, background: toastColorSchemes[toast.type].progressColor }}
        animate={{
          width: "0%",
          transition: { duration: 5, type: "tween" },
        }}
        onAnimationComplete={() => {
          setToasts(toasts.filter(t => t.id !== toast.id));
        }}
      />
    </motion.div>
  );
});
export const Toasts: FC = () => {
  const [toasts, setToasts] = useContext(ToastContext);

  return (
    <>
      <AnimatePresence>
        {toasts.map((t, i) => (
          <Toast toast={t} key={t.id} index={i} />
        ))}
      </AnimatePresence>
    </>
  );
};
export const Categories: FC<CategoriesType> = ({ categories, currentCategory, setCurrentCategory }) => {
  return (
    <>
      <div className={styles.wrapper}>
        {categories.map(c => (
          <button
            style={{ background: currentCategory === c.text ? "#f4baf7" : "transparent" }}
            onClick={() => setCurrentCategory(c.text)}
            key={c.text}
          >
            {c.text} <c.icon />
          </button>
        ))}
      </div>
    </>
  );
};
export const AudioPlayer: FC<{ source: Blob }> = ({ source }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [paused, setPaused] = useState<boolean>(true);

  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [progress, setProgress] = useState<string>("0%");

  const [duration, setDuration] = useState<number>(0);
  useEffect(() => {
    const blob = new Blob([source]);
    const url = URL.createObjectURL(blob);
    audioRef.current!.src = url;
    audioRef.current!.addEventListener("ended", () => setPaused(true));
    audioRef.current!.addEventListener("timeupdate", () => {
      if (!audioRef.current) return;
      else {
        setProgress(`${(audioRef.current!.currentTime / audioRef.current!.duration) * 100}%`);

        setCurrentTime(formatAudioDuration(audioRef.current!.currentTime));
      }
    });
    document.addEventListener("keyup", ev => {
      const { activeElement } = document;
      if (activeElement && activeElement.tagName === "INPUT") return;
      if (ev.code === "Space") {
        audioRef.current!.paused ? audioRef.current!.play() : audioRef.current!.pause();
      } else if (ev.code === "ArrowRight") {
        audioRef.current!.currentTime += 5;
      } else if (ev.code === "ArrowLeft") {
        audioRef.current!.currentTime -= 5;
      }
    });

    audioRef.current!.addEventListener("play", () => {
      const audios = document.querySelectorAll("audio");
      audios.forEach(a => {
        if (a === audioRef.current) return;
        else {
          a.pause();
        }
      });
      setPaused(false);
      setDuration(audioRef.current!.duration);
    });
    audioRef.current!.addEventListener("pause", () => setPaused(true));

    return () => {
      URL.revokeObjectURL(url);
      audioRef.current?.removeEventListener("ended", () => setPaused(true));
      audioRef.current?.removeEventListener("timeupdate", () => {
        if (!audioRef.current) return;
        else {
          setProgress(`${(audioRef.current!.currentTime / audioRef.current!.duration) * 100}%`);
          setCurrentTime(formatAudioDuration(audioRef.current!.currentTime));
        }
      });

      audioRef.current?.removeEventListener("play", () => {
        const audios = document.querySelectorAll("audio");
        audios.forEach(a => {
          if (a === audioRef.current) return;
          else {
            a.pause();
          }
        });
        document.removeEventListener("keyup", ev => {
          const { activeElement } = document;
          if (activeElement && activeElement.tagName === "INPUT") return;
          if (ev.code === "Space") {
            audioRef.current!.paused ? audioRef.current!.play() : audioRef.current!.pause();
          } else if (ev.code === "ArrowRight") {
            audioRef.current!.currentTime += 5;
          } else if (ev.code === "ArrowLeft") {
            audioRef.current!.currentTime -= 5;
          }
        });
        setPaused(false);
        setDuration(audioRef.current!.duration);
      });
      audioRef.current?.removeEventListener("pause", () => setPaused(true));
    };
  }, []);
  return (
    <div className={styles["audio-player"]}>
      <audio ref={audioRef} />

      <Button onClick={() => (paused ? audioRef.current!.play() : audioRef.current!.pause())} className='play-pause'>
        {paused ? <BsFillPlayFill /> : <BsFillPauseFill />}
      </Button>
      <MdForward5
        onClick={() => {
          audioRef.current!.currentTime += 5;
        }}
        className='icon'
      />
      <AccentText inverted={false}>
        {currentTime} / {formatAudioDuration(duration)}
      </AccentText>

      <div className='track'>
        <div className='progress' style={{}}>
          <motion.div
            className='current-progress'
            style={{ height: "100%", width: "100%", backgroundColor: accentColor }}
            animate={{ width: progress }}
          />
        </div>
      </div>
      <MdReplay5
        onClick={() => {
          audioRef.current!.currentTime -= 5;
        }}
        className='icon'
      />

      <BiVolumeFull onClick={() => {}} className='icon' />
    </div>
  );
};

export const Caption: FC<{ onSubmit: (caption: string) => void }> = memo(({ onSubmit }) => {
  const add = useAddToast();
  const id = getRandomKey();
  const onCaptionSubmit: FormEventHandler = async e => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { value } = form.querySelector("input")!;
    try {
      await validateText(value, 50, "Caption");
      (document.getElementById(id) as HTMLInputElement).disabled = true;
      onSubmit(value);
    } catch (e) {
      add(e as string, "error");
    }
  };
  return (
    <form className={styles.caption} onSubmit={onCaptionSubmit}>
      <input type='text' name='caption' id={id} />
      <button type='submit'>
        <BiSend />
      </button>
    </form>
  );
});
