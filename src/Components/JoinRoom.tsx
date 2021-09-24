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
  IsRoomThere,
  maxAvatarType,
  user,
  userInfoStorageKey,
  validator,
} from "../Constants";
import { AiOutlineReload } from "react-icons/ai";
import { HiOutlineArrowDown } from "react-icons/hi";
import { Button } from "../Styled-components/Customize.style";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory, Link } from "react-router-dom";
import { useSpring } from "react-spring";
import Avatars from "./Avatars";
import ReactTooltip from "react-tooltip";
import ChatComponent from "./ChatComponent";
import PleaseWait from "./PleaseWait";
//@ts-ignore
const socket = io(constants.serverName);

const JoinRoom: FunctionalComponent<{ isAuth: boolean; roomName?: string }> = ({
  isAuth,
  roomName,
}) => {
  const [user, setUser] = useContext(SelfClientContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const history = useHistory();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen === true) {
      //@ts-ignore
      setTimeout(() => window.scroll(0, 0), 1000);
    }
  }, [isModalOpen]);

  useEffect(() => {
    document.title = "Join A Room";
    sessionStorage.clear();
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
  function handleClose() {
    setIsModalOpen(false);
  }

  function handleSubmit(e: FormEvent): void {
    socket.connect();
    setIsConnecting(true);
    e.preventDefault();
    const newRoom = isAuth ? roomName : room;
    const res = validator(name, newRoom);
    if (res) {
      socket.emit("rooms");
      socket.on("rooms-back", (rooms: any[]) => {
        //@ts-ignore
        socket.removeAllListeners("rooms-back");
        const doesRoomExist = IsRoomThere(rooms, newRoom);
        if (doesRoomExist) {
          console.log("reached");
          const newUser: user = {
            name: name,
            currentRoomName: newRoom,
            avatarSvg: currentAvatar,
          };
          setUser(newUser);
          //@ts-ignore
          socket.disconnect(true);

          if (!isAuth) {
            setTimeout(() => {
              setIsConnecting(false);
              history.push("/room/" + newRoom);
            }, 1000);
          } else {
            setTimeout(() => {
              setIsConnecting(false);
              setIsDone(true);
            }, 1000);
          }
        } else {
          setTimeout(() => {
            setIsConnecting(false);
            //@ts-ignore
            socket.disconnect(true);
            toast.error(constants.roomDoesntExistError);
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
      ) : isDone ? (
        <ChatComponent />
      ) : (
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
                  spellCheck
                  required
                  placeholder='Name Your Room'
                  onChange={(e) => setRoom(e.target.value)}
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
                onClick={(newAvatar: string) => {
                  setIsModalOpen(false);
                  setCurrentAvatar(newAvatar);
                }}
              />
            </AvatarsWrapper>
            <br />
          </Modal>
          <Button
            onClick={() => {
              //@ts-ignore
              socket.disconnect(true);
              history.push("/");
            }}
          >
            <span>Back To Home</span> <FaHome />
          </Button>{" "}
        </Page>
      )}
    </>
  );
};
export default JoinRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
