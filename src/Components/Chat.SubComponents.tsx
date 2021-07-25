import { FC, memo } from "react";
import { CSSProperties } from "react";
import { ChatUser, HeaderProps, UsersInChatProps } from "../Constants";
import { MeetInfo, StyledUsers } from "../Styled-components/Chat.style";
import { useSpring } from "@react-spring/core";

export const ChatHeader: FC<HeaderProps> = memo(({ roomName }) => {
  return (
    <MeetInfo>
      <span className="roomName">Room - {roomName}</span>
    </MeetInfo>
  );
});

export const UsersInChat: FC<UsersInChatProps> = ({
  users,
  usersOpen,
  borderColor,
}) => {
  const subComponentSpring = useSpring({
    marginLeft: usersOpen ? 0 : 1000,
    width: usersOpen ? "20vw" : "0vw",
  });
  return (
    <>
      <StyledUsers
        style={subComponentSpring}
        theme={borderColor}
        about={String(usersOpen)}
      >
        {users.map((user) => {
          return <h2>{user.name}</h2>;
        })}
      </StyledUsers>
    </>
  );
};
