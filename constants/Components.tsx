import { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import { constants } from "./constants";
import { AccentTextProps, ButtonProps, Component } from "./types";
import { IoChatboxSharp } from "react-icons/io5";

export const AccentText: Component<AccentTextProps> = ({
  inverse = false,
  fontFamily = "Poppins, sans-serif",
  fontSize = "2rem",
  children,
}) => {
  return (
    <>
      <style jsx>
        {`
          span {
            color: ${!inverse ? constants.accentColor : "white"};

            font-family: ${fontFamily};
            font-size: ${fontSize};
          }
          span::selection {
            color: ${!inverse ? "white" : constants.accentColor};
            background: ${!inverse ? constants.accentColor : "white"};
          }
        `}
      </style>
      <span>{children}</span>
    </>
  );
};
export const Logo: Component<{ size?: number }> = ({ size = 2.5 }) => {
  return <IoChatboxSharp fontSize={`${size}rem`} color={constants.accentColor as string} />;
};

export const Button: Component<ButtonProps> = ({ children, styles }) => {
  return (
    <>
      <style jsx>{`
        button {
          font-family: "Poppins", sans-serif;
          cursor: pointer;
          border: 0;
          outline: 0;
          color: white;
          background-color: ${constants.accentColor};
          transition: color 400ms, background-color 400ms, transform 50ms ease-in-out;
          min-height: 2.5rem;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 1rem;
          border-radius: 5px;
        }
        button:hover {
          color: ${constants.accentColor};
          background-color: white;
        }
        button:active {
          transform: scale(0.9);
        }
      `}</style>
      <button style={styles}>{children}</button>
    </>
  );
};
