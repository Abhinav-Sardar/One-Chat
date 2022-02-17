import { motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { CSSProperties, FC } from "react";
import { IoChatboxSharp } from "react-icons/io5";
import { getConstants } from "./constants";
import { ButtonProps, SafeLinkProps } from "./Types";
const accentColor = getConstants("accentColor") as string;
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
        initial={{ ...defaultButtonStyles, ...rest.style, color, backgroundColor }}
        {...rest}
        whileHover={{
          backgroundColor: color,
          color: backgroundColor,
          transition: {
            duration: 0.5,
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
