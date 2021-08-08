import { FC } from "react";
import { getRandomKey, Message } from "../Constants";

const Messages: FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <>
      {messages.map((message) => (
        <h1 key={getRandomKey()}>{message.children}</h1>
      ))}
    </>
  );
};

export default Messages;
