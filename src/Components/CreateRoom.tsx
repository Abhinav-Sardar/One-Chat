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
  getRandomKey,
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
import { animated, useSpring, useSprings } from "react-spring";

const CreateRoom: FunctionalComponent = () => {
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
    if (name && room && name.trim() && room.trim()) {
      const splitted = room.split(" ");
      if (splitted.includes("")) {
        toast.error(
          "Room Names should not have spaces in between. Consider seperating mutliple words with characters like '-'"
        );
      } else {
        const newUser: user = {
          avatarSvg: currentAvatar,
          name: name,
          currentRoomName: room,
        };
        console.log(newUser);
        sessionStorage.setItem(userInfoStorageKey, JSON.stringify(newUser));
        window.location.assign(`/room/${room}`);
      }
    } else {
      toast.error("Invalid Username Or Room Name !");
    }
  }

  useEffect(() => {
    if (avatars.length === 42) {
      setCurrentAvatar(avatars[0]);
    }
  }, [avatars]);
  const appear = useSpring({
    from: {
      transform: "scale(0.4)",
      opacity: 0,
    },
    to: {
      transform: "scale(1)",
      opacity: 1,
    },
  });

  return (
    <Page style={appear}>
      <h1 className='purpose'>Create</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className='field'>
          <span>Name</span>
          <br />
          <input
            type='text'
            /* @ts-ignore */
            value={name}
            onChange={(e) => setName(e.target.value)}
            spellCheck
            required
            placeholder='Your Name'
          />
        </div>
        <div className='field'>
          <span>Room Name</span>
          <br />
          <input
            type='text'
            //@ts-ignore
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            spellCheck
            required
            placeholder='Name Your Room'
          />
        </div>
        <div className='field'>
          <span>Avatar</span>
          {currentAvatar && parse(currentAvatar)}
          <br />
          <button
            onClick={() => setIsModalOpen(true)}
            className='choose__avatar'
            type='button'
          >
            <span>Choose Avatar</span> <FaUserAlt className='btn-avatar' />
          </button>
        </div>
        <button type='submit' className='submit'>
          Create Room
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
            fill='red'
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
                <div onClick={() => setAvatarIcon(avatar)} key={getRandomKey()}>
                  {parse(avatar)}
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => setAvatarIcon(avatar)}
                  className='current'
                  key={getRandomKey()}
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
            <h2 className='loader'>Loading . . .</h2>
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
                <AiOutlineReload className='loader2' />
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
      <Link to='/'>
        <Button>
          <span>Back To Home</span> <FaHome />
        </Button>{" "}
      </Link>
    </Page>
  );
};
export default CreateRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
