import {
  useRef,
  FC as FunctionalComponent,
  FormEvent,
  useContext,
} from "react";
import {
  AvatarActionBtns,
  AvatarsWrapper,
  Page,
} from "../Styled-components/CreateRoom.styled";

import io from "socket.io-client";
import { Form } from "../Styled-components/CreateRoom.styled";
import { useEffect } from "react";
import Modal from "react-responsive-modal";
import { FaHome, FaTimes, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import parse from "html-react-parser";
import {
  constants,
  maxAvatarType,
  user,
  userInfoStorageKey,
} from "../Constants";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineArrowDown } from "react-icons/hi";
import { Button } from "../Styled-components/Customize.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
import { isPropertySignature } from "typescript";

const JoinRoom: FunctionalComponent<{ isAuth: boolean; roomName?: string }> = ({
  isAuth,
  roomName,
}) => {
  //@ts-ignore
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [maxAvatarIndex, setMaxAvatar] = useState<maxAvatarType>({
    number: 42,
    isNew: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    if (isModalOpen === true) {
      //@ts-ignore
      setTimeout(() => window.scroll(0, 0), 1000);
    }
  }, [isModalOpen]);
  function handleClose() {
    setIsModalOpen(false);
  }
  function setAvatarIcon(avatar: string): void {
    handleClose();
    setCurrentAvatar(avatar);
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
    const newRoom = isAuth ? roomName : room;
    if (name && newRoom && name.trim() && newRoom.trim()) {
      const newUser: user = {
        avatarSvg: currentAvatar,
        name: name,
        currentRoomName: newRoom,
      };
      console.log(newUser);
      sessionStorage.setItem(userInfoStorageKey, JSON.stringify(newUser));
      window.location.assign(`/room/${newRoom}`);
    } else {
      toast.error("Invalid Username Or Room Name !");
    }
  }

  useEffect(() => {
    if (avatars.length === 42) {
      setCurrentAvatar(avatars[0]);
    }
  }, [avatars]);
  return (
    <Page>
      <h1 className="purpose">Join</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <span>Name</span>
          <br />
          <input
            type="text"
            /* @ts-ignore */
            value={name}
            onChange={(e) => setName(e.target.value)}
            spellCheck
            required
            placeholder="Your Name"
          />
        </div>
        {isAuth ? (
          <div className="field">
            <h2
              style={{
                color: "white",
                fontFamily: '"Poppins" , arial , sans-serif',
                fontSize: "1.7vw",
              }}
            >
              Room Name:{roomName}
            </h2>
          </div>
        ) : (
          <div className="field">
            <span>Room Name</span>
            <br />
            <input
              type="text"
              //@ts-ignore
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              spellCheck
              required
              placeholder="Name Your Room"
            />
          </div>
        )}
        <div className="field">
          <span>Avatar</span>
          {currentAvatar && parse(currentAvatar)}
          <br />
          <button
            onClick={() => setIsModalOpen(true)}
            className="choose__avatar"
            type="button"
          >
            <span>Choose Avatar</span> <FaUserAlt className="btn-avatar" />
          </button>
        </div>
        <button type="submit" className="submit">
          Join Room
        </button>
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
          <h1>Choose your avatar</h1>
        </AvatarActionBtns>
        <AvatarsWrapper>
          {avatars.map((avatar: string, index: number) => {
            if (avatar !== currentAvatar) {
              return (
                <div
                  onClick={() => setAvatarIcon(avatar)}
                  key={(new Date().getSeconds() * Math.random()).toString()}
                >
                  {parse(avatar)}
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => setAvatarIcon(avatar)}
                  className="current"
                  key={(new Date().getSeconds() * Math.random()).toString()}
                >
                  {parse(avatar)}
                </div>
              );
            }
          })}
        </AvatarsWrapper>
        <br />
        <AvatarActionBtns>
          {loading ? (
            <h2 className="loader">Loading . . .</h2>
          ) : (
            <>
              <button
                onClick={() => {
                  setLoading(true);
                  setMaxAvatar((prev) => {
                    return { isNew: false, number: prev.number + 24 };
                  });
                }}
              >
                <span>Load More</span>
                <HiOutlineArrowDown />
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  setMaxAvatar((prev) => {
                    return { isNew: true, number: prev.number };
                  });
                }}
              >
                <span>Load New </span>
                <AiOutlineReload className="loader2" />
              </button>
            </>
          )}
        </AvatarActionBtns>
      </Modal>
      <ToastContainer
        draggable={false}
        pauseOnHover={false}
        closeOnClick={false}
      />
      <Link to="/">
        <Button>
          <span>Back To Home</span> <FaHome />
        </Button>{" "}
      </Link>
    </Page>
  );
};
export default JoinRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}