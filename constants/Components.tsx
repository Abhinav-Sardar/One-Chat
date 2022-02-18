import { AnimatePresence, motion, Variants } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { CSSProperties, FC, ReactPortal, useEffect, useState } from "react";
import { IoChatboxSharp } from "react-icons/io5";
import { getConstants } from "./constants";
import { ButtonProps, SafeLinkProps, ModalProps } from "./Types";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
const [accentColor] = getConstants("accentColor") as [string];
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
  const defaultButtonStyles = {
    fontSize: "20px",
    minHeight: "3rem",
    minWidth: "10rem",
    border: 0,
    fontFamily: '"Poppins", sans-serif',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "0 1em",
  };
  return (
    <>
      <motion.button
        onClick={onClick}
        // @ts-ignore
        initial={{ ...defaultButtonStyles, ...rest.style, color, backgroundColor }}
        {...rest}
        whileHover={{
          backgroundColor: color,
          color: backgroundColor,
          transition: {
            duration: 0.4,
          },
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        {children}
      </motion.button>
    </>
  );
};

export const AccentText: FC<{ style?: CSSProperties }> = ({ children, style }) => {
  return (
    <>
      <style jsx>
        {`
          span {
            color: ${accentColor};
            font-family: "Raleway", sans-serif;
            font-size: 1.9rem;
          }
          span::selection {
            background: ${accentColor};
            color: white;
          }
        `}
      </style>

      <span style={style}>{children}</span>
    </>
  );
};

export const Modal: FC<ModalProps> = ({ onClose, isOpen, children, title }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const initialStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50% , -50%)",
    zIndex: 2,
    display: "flex",
    background: accentColor,

    flexDirection: "column",
  };
  const overlayVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const modalVariants: Variants = {
    initial: {
      opacity: 0,
      borderRadius: "10px",
      height: 0,
      width: 0,
    },

    animate: {
      height: "40rem",
      width: "50rem",
      opacity: 1,

      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      width: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
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
          <style jsx>
            {`
              .header-title {
                color: white;
                font-family: "Raleway", sans-serif;
                font-size: 1.9rem;
              }
              .header-title::selection {
                background: white;
                color: ${accentColor};
              }
            `}
          </style>
          <motion.div
            className='modal-overlay'
            variants={overlayVariants}
            initial='initial'
            animate='animate'
            onClick={onClose}
            exit='exit'
          />
          <motion.div
            style={initialStyles}
            variants={modalVariants}
            className='modal'
            exit='exit'
            initial='initial'
            animate='animate'
          >
            <div className='header'>
              <div />
              <span className='header-title'>{title}</span>

              <VscChromeClose
                fill='white'
                fontSize='2rem'
                style={{ marginRight: ".5rem", cursor: "pointer" }}
                onClick={onClose}
              />
            </div>
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
