import { AnimatePresence, motion, useMotionValue, Variants } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { createContext, CSSProperties, FC, ReactPortal, useEffect, useState } from "react";
import { IoChatboxSharp } from "react-icons/io5";
import { getConstants } from "./constants";
import { ButtonProps, SafeLinkProps, ModalProps, ToggleProps } from "./Types";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
import styles from "../styles/Components.module.scss";
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
            transition: color 400ms ease-in-out, background-color 400ms ease-in-out, transform 200ms ease-in-out;
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
