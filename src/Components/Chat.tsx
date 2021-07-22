import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import {
  ChatArea,
  ChatPage,
  MeetControls,
  RemainingChatArea,
} from "../Styled-components/Chat.style";

const Chat: FC = () => {
  return (
    <>
      <ChatPage>
        <RemainingChatArea>
          <ChatArea>Chats here</ChatArea>
        </RemainingChatArea>
        <MeetControls>
          <form className="input">
            <input type="text" name="" id="" />
            <button type="submit">Submit</button>
          </form>
          <div className="icons">icons here</div>
        </MeetControls>
      </ChatPage>
    </>
  );
};

export default Chat;
