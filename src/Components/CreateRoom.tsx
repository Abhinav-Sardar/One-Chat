import { useRef, FC as FunctionalComponent, FormEvent } from "react";
import {
  AvatarActionBtns,
  AvatarsWrapper,
  Page,
} from "../Styled-components/CreateRoom.styled";

import io from "socket.io-client";
import { Form } from "../Styled-components/CreateRoom.styled";
import { useEffect } from "react";
import Modal from "react-responsive-modal";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import parse from "html-react-parser";
import { constants } from "../Constants";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineArrowDown } from "react-icons/hi";
const CreateRoom: FunctionalComponent = () => {
  type maxAvatarType = {
    isNew: boolean;
    number: number;
  };

  const NameRef = useRef<HTMLInputElement | null>()!;
  const RoomRef = useRef<HTMLInputElement | null>()!;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [maxAvatarIndex, setMaxAvatar] = useState<maxAvatarType>({
    number: 42,
    isNew: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    NameRef.current?.focus();
  }, []);
  function handleClose() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    if (maxAvatarIndex.isNew) {
      let acc = [];
      while (acc.length !== maxAvatarIndex.number) {
        acc.push(returnRandomAvatar());
      }
      setAvatars(acc);
    } else {
      let acc = [...avatars];
      while (acc.length !== maxAvatarIndex.number) {
        acc.push(returnRandomAvatar());
      }
      setAvatars(acc);
    }
    setLoading(false);
    console.log(maxAvatarIndex);
  }, [maxAvatarIndex]);
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
            background: constants.appAccentColor,
            color: "white",
          },
        }}
        onClose={() => handleClose()}
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
        <AvatarActionBtns>
          <h1>Choose you avatar</h1>
        </AvatarActionBtns>
        <AvatarsWrapper>
          {avatars.map((avatar: string) => {
            return <div onClick={() => alert("Wassup")}>{parse(avatar)}</div>;
          })}
        </AvatarsWrapper>
        <br />
        <AvatarActionBtns>
          {loading ? (
            <AiOutlineReload className="loader" />
          ) : (
            <>
              <button
                onClick={() =>
                  setMaxAvatar((prev) => {
                    setLoading(true);
                    return { isNew: false, number: prev.number + 18 };
                  })
                }
              >
                <span>Load More</span>
                <HiOutlineArrowDown />
              </button>
              <button
                onClick={() =>
                  setMaxAvatar((prev) => {
                    setLoading(true);
                    return { isNew: true, number: prev.number };
                  })
                }
              >
                <span>Load New </span>
                <AiOutlineReload className="loader2" />
              </button>
            </>
          )}
        </AvatarActionBtns>
      </Modal>
    </Page>
  );
};
export default CreateRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
