import { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import { constants } from "./constants";
import { Component } from "./types";
export const AccentText: Component<{ inverse?: boolean; fontSize?: string; fontFamily?: string }> = ({
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
            background: ${!inverse ? "white" : constants.accentColor};
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
