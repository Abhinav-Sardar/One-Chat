import { FC, memo } from "react";
import { CSSProperties } from "react";
import {
  ChatUser,
  constants,
  HeaderProps,
  ShareProps,
  UsersInChatProps,
} from "../Constants";
import { MeetInfo } from "../Styled-components/Chat.style";
import { useSpring } from "@react-spring/core";
import parse from "html-react-parser";

export const ChatHeader: FC<HeaderProps> = memo(({ roomName }) => {
  return (
    <MeetInfo style={{ color: constants.appAccentColor }}>
      <span className="roomName">Room - {roomName}</span>
    </MeetInfo>
  );
});
