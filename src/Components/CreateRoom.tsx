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
import AvatarsComponent from "./Avatars";
import {
  constants,
  IsRoomThere,
  maxAvatarType,
  user,
  validator,
  room,
} from "../Constants";

import { HiOutlineArrowDown } from "react-icons/hi";
import { Button } from "../Styled-components/Customize.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link, useHistory } from "react-router-dom";
import { animated, useSpring, useSprings } from "react-spring";
import PleaseWait from "./PleaseWait";
//@ts-ignore
const socket = io(constants.serverName);

const CreateRoom: FunctionalComponent = () => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [user, setUser] = useContext(SelfClientContext);

  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const roomRef = useRef();
  useEffect(() => {
    if (isModalOpen === true) {
      //@ts-ignore
      setTimeout(() => window.scroll(0, 0), 1000);
    }
  }, [isModalOpen]);
  function handleClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    sessionStorage.clear();

    document.title = "Create A Room";
    const init = () => {
      const initAvatars = [];
      for (let i = 0; i < 50; i++) {
        initAvatars.push(returnRandomAvatar());
      }
      setAvatars(initAvatars);
      setCurrentAvatar(initAvatars[0]);
      console.log(currentAvatar);
    };
    init();
  }, []);

  function handleSubmit(e: FormEvent): void {
    setIsConnecting(true);
    socket.connect();
    e.preventDefault();
    const res = validator(name, room);
    if (res) {
      socket.emit("rooms");
      socket.on("rooms-back", (rooms: room[]) => {
        //@ts-ignore
        socket.removeAllListeners("rooms-back");
        if (IsRoomThere(rooms, room)) {
          setTimeout(() => {
            setIsConnecting(false);
            //@ts-ignore
            socket.disconnect(true);

            toast.error(constants.roomAlreadyExistsError);
            //@ts-ignore
            roomRef.current.focus();
          }, 1000);
        } else {
          console.log("You are free to proceeed");
          const newUser: user = {
            avatarSvg: currentAvatar,
            currentRoomName: room,
            name: name,
          };
          setUser(newUser);
          //@ts-ignore
          socket.disconnect(true);
          setTimeout(() => {
            setIsConnecting(false);
            history.push(`/room/${room}`);
          }, 1000);
        }
      });
    } else {
      setIsConnecting(false);
    }
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
    <>
      {isConnecting ? (
        <PleaseWait />
      ) : (
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
                autoFocus
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
                ref={roomRef}
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
              <AvatarsComponent
                avatars={avatars}
                currentAvatar={currentAvatar}
                onClick={(newAvatar: string) => {
                  setCurrentAvatar(newAvatar);
                  setIsModalOpen(false);
                }}
              />
            </AvatarsWrapper>
          </Modal>
          <Button
            onClick={() => {
              history.push("/");
              //@ts-ignore
              socket.disconnect(true);
            }}
          >
            <span>Back To Home</span> <FaHome />
          </Button>{" "}
        </Page>
      )}
    </>
  );
};
export default CreateRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
