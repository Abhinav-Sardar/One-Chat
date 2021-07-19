import { useRef, FC as FunctionalComponent, FormEvent } from "react";
import { AvatarsWrapper, Page } from "../Styled-components/CreateRoom.styled";

import io from "socket.io-client";
import { Form } from "../Styled-components/CreateRoom.styled";
import { useEffect } from "react";
import Modal from "react-responsive-modal";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import parse from "html-react-parser";

const CreateRoom: FunctionalComponent = () => {
  const NameRef = useRef<HTMLInputElement | null>()!;
  const RoomRef = useRef<HTMLInputElement | null>()!;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    NameRef.current?.focus();
  }, []);
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
  }
  return (
    <Page>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <span>Name</span>
          <br />
          {/* @ts-ignore */}
          <input type="text" ref={NameRef} spellCheck placeholder="Your Name" />
        </div>
        <div className="field">
          <span>Room Name</span>
          <br />
          <input
            type="text"
            //@ts-ignore
            ref={RoomRef}
            spellCheck
            placeholder="Name Your Room"
          />
        </div>
        <div className="field">
          <span>Avatar</span>
          <br />
          <button onClick={() => setIsModalOpen(true)}>Choose Avatar</button>
        </div>
        <button type="submit">Create Room</button>
      </Form>
      <Modal
        open={isModalOpen}
        styles={{
          modal: {
            background: "blue",
            color: "white",
          },
        }}
        onClose={() => setIsModalOpen(false)}
        closeIcon={
          <FaTimes
            fill="red"
            fontSize={"2vw"}
            style={{
              margin: "1vh 0",
            }}
          />
        }
      >
        <AvatarsWrapper>{parse(AvatarsHolder())}</AvatarsWrapper>
      </Modal>
    </Page>
  );
};
export default CreateRoom;

function AvatarsHolder() {
  let str = "";
  for (let i = 0; i < 100; i++) {
    let svg = createAvatar(style);
    str += `
    ${svg}
    
    `;
  }
  return str;
}
