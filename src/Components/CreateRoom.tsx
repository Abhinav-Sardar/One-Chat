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

const CreateRoom: FunctionalComponent = () => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [user, setUser] = useContext(SelfClientContext);
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
    sessionStorage.clear();

    document.title = "Create A Room";
  }, []);

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
  }, [maxAvatarIndex]);

  function handleSubmit(e: FormEvent): void {
    //@ts-ignore
    const socket = io.connect(constants.serverName);
    console.log(socket);
    e.preventDefault();
    const res = validator(name, room);
    if (res) {
      socket.emit("rooms");
      socket.on("rooms-back", (rooms: room[]) => {
        //@ts-ignore
        socket.removeAllListeners("rooms-back");
        if (IsRoomThere(rooms, room)) {
          socket.disconnect(true);

          toast.error(constants.roomAlreadyExistsError);
        } else {
          console.log("You are free to proceeed");
          const newUser: user = {
            avatarSvg: currentAvatar,
            currentRoomName: room,
            name: name,
          };
          setUser(newUser);
          socket.disconnect(true);
          history.push(`/room/${room}`);
        }
      });
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
    <>
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
              setCurrentAvatar={setCurrentAvatar}
            />
          </AvatarsWrapper>
          <br />
          <AvatarActionBtns>
            {loading ? (
              <h2 className='loader'>Loading . . .</h2>
            ) : (
              <>
                {maxAvatarIndex.number < 300 ? (
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
                ) : (
                  ""
                )}
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
      )
    </>
  );
};
export default CreateRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
