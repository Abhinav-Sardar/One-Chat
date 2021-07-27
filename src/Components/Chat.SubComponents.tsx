import { FC, memo } from "react";
import {
  ChatUser,
  constants,
  getRandomKey,
  HeaderProps,
  ShareProps,
  UsersInChatProps,
} from "../Constants";
import { MeetInfo, User } from "../Styled-components/Chat.style";
import { useSpring } from "@react-spring/core";
import parse from "html-react-parser";

export const ChatHeader: FC<HeaderProps> = memo(({ roomName, onClick }) => {
  return (
    <MeetInfo style={{ color: constants.appAccentColor }}>
      <span className='roomName'>Room - {roomName}</span>
      <button onClick={onClick}>Leave Room</button>
    </MeetInfo>
  );
});

export const UsersPanelInfo: FC<UsersInChatProps> = memo(({ users, theme }) => {
  return (
    <>
      {users.map((user) => (
        <User theme={theme} key={getRandomKey()}>
          {parse(user.profilePic)}
          <h2>{user.name}</h2>
        </User>
      ))}
    </>
  );
});
