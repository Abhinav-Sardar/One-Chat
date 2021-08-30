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
  user,
  userInfoStorageKey,
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
//@ts-ignore
const socket = io.connect(constants.serverName);
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
  const history = useHistory();

  useEffect(() => {
    if (isModalOpen === true) {
      //@ts-ignore
      setTimeout(() => window.scroll(0, 0), 1000);
    }
  }, [isModalOpen]);
  useEffect(() => {
    document.title = "Join A Room";
    sessionStorage.clear();
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
  useEffect(() => {
    if (avatars.length === 42) {
      setCurrentAvatar(avatars[0]);
    }
  }, [avatars]);

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    const newRoom = isAuth ? roomName : room;
    if (name && newRoom && name.trim() && newRoom.trim()) {
      socket.emit("rooms");
      socket.on("rooms-back", (rooms: any[]) => {
        const particularRoom = rooms.find((r: any) => r.name === newRoom);
        if (!particularRoom) {
          toast.error(constants.roomDoesntExistError);
          //@ts-ignore
          socket.removeAllListeners("rooms-back");
        } else {
          if (isAuth) {
            const newUser: user = {
              avatarSvg: currentAvatar,
              name: name,
              currentRoomName: newRoom,
            };
            console.log(newUser);
            setUser(newUser);
          } else {
            const newUser: user = {
              avatarSvg: currentAvatar,
              name: name,
              currentRoomName: newRoom,
            };
            console.log(newUser);
            setUser(newUser);
            socket.disconnect();
            history.push(`/room/${newRoom}`);
          }
        }
      });
    } else {
      toast.error("Invalid Username Or Room Name !");
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

      <Link to='/'>
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
