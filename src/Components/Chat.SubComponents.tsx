import { FC, memo } from "react";
import {
  constants,
  getRandomKey,
  HeaderProps,
  PanelHeaderProps,
  ShareProps,
  UsersInChatProps,
} from "../Constants";
import { MdContentCopy } from "react-icons/md";
import copy from "clipboard-copy";
import {
  MeetInfo,
  SidePanelHeader,
  User,
} from "../Styled-components/Chat.style";
import { useSpring } from "@react-spring/core";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

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

export const SharePanelInfo: FC<ShareProps> = ({
  roomName,
  theme,
  onClose,
}) => {
  const roomUrl = `${window.location.origin}/room/${roomName}`;
  const joinUrl = `${window.location.origin}/join`;
  return (
    <>
      <SidePanelHeaderComponent
        style={{
          borderBottom: `1px solid ${theme}`,
        }}
        onClose={onClose}
      >
        Share
      </SidePanelHeaderComponent>
      <h3>Users can join this room by :</h3>
      <h2>
        Go to this URL <br />
        <a>{joinUrl}</a>
        <br />
        <CopyBtn text={joinUrl} />
        <br />
        and write {roomName} as the name of the room <br />
        and fill out the other information.
      </h2>
      <h1 className='breaker'>OR</h1>
      <h2>
        Simply go to this URL
        <br />
        <a>{roomUrl}</a>
        <br />
        <CopyBtn text={roomUrl} />
      </h2>
    </>
  );
};

const CopyBtn: FC<{ text: string }> = memo(({ text }) => {
  return (
    <>
      <button className='copy' onClick={() => CopyToClipBoard(text)}>
        <MdContentCopy />
        Copy Link
      </button>
    </>
  );
});

function CopyToClipBoard(text: string): void {
  copy(text);
  toast.info("Copied ✅. You can share this Url with anyone you trust");
}

export const SidePanelHeaderComponent: FC<PanelHeaderProps> = ({
  children,
  onClose,
  style,
}) => {
  return (
    <>
      <SidePanelHeader style={style ? style : {}}>
        <span>{children}</span>

        <FaTimes onClick={onClose} />
      </SidePanelHeader>
    </>
  );
};

export const MeetInfoComponent: FC = () => {
  const startDate = new Date();

  return <>{startDate.toLocaleDateString()}</>;
};
