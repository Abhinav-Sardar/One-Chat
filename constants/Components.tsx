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
          height: 3.5rem;
          width: 15rem;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2rem;
          font-family: "Poppins", sans-serif;
          border-radius: 10px;
          cursor: pointer;
          border: 0;
          outline: 0;
          color: white;
          background: ${constants.accentColor};
          transition: 400ms ease-in-out;
        }
        button:hover {
          color: ${constants.accentColor};
          background-color: white;
          transform: scale(1.1);
        }
      `}</style>
      <button style={styles}>{children}</button>
    </>
  );
};
