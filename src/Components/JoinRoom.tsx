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
import { SelfClientContext } from "../App";
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
  setUrl,
  user,
  userInfoStorageKey,
} from "../Constants";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineArrowDown } from "react-icons/hi";
import { Button } from "../Styled-components/Customize.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";
import { useSpring } from "react-spring";
import Avatars from "./Avatars";
import ReactTooltip from "react-tooltip";

const JoinRoom: FunctionalComponent<{ isAuth: boolean; roomName?: string }> = ({
  isAuth,
  roomName,
}) => {
  const [user, setUser] = useContext(SelfClientContext);
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
  const linkRef = useRef<HTMLElement | null>(null);
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
  useEffect(() => {
    if (avatars.length === 42) {
      setCurrentAvatar(avatars[0]);
    }
  }, [avatars]);
  useEffect(() => {
    setUrl();
  });
  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    const newRoom = isAuth ? roomName : room;
    if (name && newRoom && name.trim() && newRoom.trim()) {
      const newUser: user = {
        avatarSvg: currentAvatar,
        name: name,
        currentRoomName: newRoom,
      };
      console.log("Reached here!");
      setUser(newUser);
      //@ts-ignore
      linkRef.current.click();
    } else {
      toast.error("Invalid Username Or Room Name !");
    }
  }
  if (isAuth) {
    document.title = "Join a room";
  }

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
      <h1 className='purpose'>Join</h1>
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
            autoFocus
          />
        </div>
        {isAuth ? (
          <div className='field'>
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
              autoFocus={isAuth ? true : false}
            />
          </div>
        )}
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
          <Avatars
            avatars={avatars}
            currentAvatar={currentAvatar}
            setCurrentAvatar={setCurrentAvatar}
          />
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

      <Link
        style={{
          display: "none",
        }}
        //@ts-ignore

        ref={linkRef}
        to={`/room/${isAuth ? roomName : room}`}
      ></Link>
    </Page>
  );
};
export default JoinRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
