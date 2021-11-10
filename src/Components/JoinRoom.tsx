import {
  useRef,
  FC as FunctionalComponent,
  FormEvent,
  useContext,
} from "react";
import {
  AvatarActionBtns,
  AvatarsWrapper,
  FormSubmitBtn,
  Page,
} from "../Styled-components/CreateRoom.styled";
import { SelfClientContext } from "../Context";
import io from "socket.io-client";
import { Form } from "../Styled-components/CreateRoom.styled";
import { useEffect } from "react";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import parse from "html-react-parser";
import {
  constants,
  getRandomKey,
  IsRoomThere,
  room,
  user,
  validator,
} from "../Constants";
import { Button } from "../Styled-components/Customize.style";
import { toast } from "react-toastify";

import ChatComponent from "./ChatComponent";
import { CustomModal, FadedAnimationWrapper } from "./Chat.SubComponents";
import { motion } from "framer-motion";
import { LoadingButton } from "./CreateRoom";
import { useNavigate } from "react-router-dom";
const socket = io(constants.serverName);

const JoinRoom: FunctionalComponent<{ isAuth: boolean; roomName?: string }> = ({
  isAuth,
  roomName,
}) => {
  const [user, setUser] = useContext(SelfClientContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const roomRef = useRef();

  useEffect(() => {
    document.title = "Join A Room";
    sessionStorage.clear();
    const init = () => {
      const initAvatars = [];
      for (let i = 0; i < 6 * 15; i++) {
        initAvatars.push(returnRandomAvatar());
      }
      setAvatars(initAvatars);
      setCurrentAvatar(initAvatars[0]);
    };
    init();
  }, []);
  function handleClose(avatar: string) {
    setCurrentAvatar(avatar);
    setIsModalOpen(false);
  }

  function handleSubmit(e: FormEvent): void {
    if (isConnecting) {
      return;
    } else {
      socket.connect();
      setIsConnecting(true);
      e.preventDefault();
      //@ts-ignore
      const name = document.getElementById("name").value as string;
      //@ts-ignore
      const room = document.getElementById("room")?.value as string;
      const newRoom = isAuth ? roomName : room;
      const res = validator(name, newRoom);
      if (res) {
        socket.emit("rooms");
        socket.on("rooms-back", (rooms: room[]) => {
          //@ts-ignore
          socket.removeAllListeners("rooms-back");
          const doesRoomExist = IsRoomThere(rooms, newRoom);
          if (doesRoomExist) {
            const chosenRoom = rooms.find((room) => room.name === newRoom);
            const isMe = chosenRoom.members.find((m) => m.name === name);
            if (isMe) {
              toast.error(
                "A person with the same name is already present in the room."
              );
              setIsConnecting(false);
              return;
            } else {
              const newUser: user = {
                name: name,
                currentRoomName: newRoom,
                avatarSvg: currentAvatar,
                hasCreatedPrivateRoom: "Join",
                isHost: false,
              };
              setUser(newUser);
              //@ts-ignore
              socket.disconnect(true);

              if (!isAuth) {
                setIsConnecting(false);
                navigate("/room/" + newRoom);
              } else {
                setIsConnecting(false);
                setIsDone(true);
              }
            }
          } else {
            setIsConnecting(false);
            //@ts-ignore
            socket.disconnect(true);
            toast.error(constants.roomDoesntExistError);
            if (!isAuth) {
              //@ts-ignore
              roomRef.current.focus();
            } else {
              return;
            }
          }
        });
      } else {
        setIsConnecting(false);
      }
    }
  }
  const formVariants = {
    initial: {
      width: 0,
    },
    animated: {
      width: "45vw",
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.6,
      },
    },
  };

  return (
    <>
      {isDone ? (
        <ChatComponent isPrivate={"Join"} />
      ) : (
        <FadedAnimationWrapper>
          <Page>
            <h1 className='purpose'>Join</h1>
            <Form
              onSubmit={(e) => handleSubmit(e)}
              variants={formVariants}
              initial='initial'
              animate='animated'
            >
              <div className='field'>
                <span>Name</span>
                <br />
                <input
                  type='text'
                  id='name'
                  spellCheck
                  required
                  placeholder='Your Name'
                  autoFocus
                />
              </div>
              {isAuth ? (
                <div className='field'>
                  <span>Room Name:{roomName}</span>
                </div>
              ) : (
                <div className='field'>
                  <span>Room Name</span>
                  <br />
                  <input
                    type='text'
                    id='room'
                    spellCheck
                    required
                    placeholder='Name Of The Room You Want To Join'
                    autoFocus={isAuth ? true : false}
                    ref={roomRef}
                  />
                </div>
              )}
              <motion.div className='field'>
                <span>Avatar</span>
                {currentAvatar && parse(currentAvatar)}
                <br />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='choose__avatar'
                  type='button'
                >
                  <span>Choose Avatar</span>{" "}
                  <FaUserAlt className='btn-avatar' />
                </button>
              </motion.div>
              {isConnecting ? (
                <LoadingButton />
              ) : (
                <FormSubmitBtn type='submit' className='submit'>
                  Join Room
                </FormSubmitBtn>
              )}
            </Form>
            <CustomModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <AvatarActionBtns>
                <h1>Choose your avatar</h1>
              </AvatarActionBtns>
              <AvatarsWrapper>
                {avatars.map((avatar) => {
                  if (avatar === currentAvatar) {
                    return (
                      <div className='current' key={getRandomKey()}>
                        {parse(avatar)}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={() => {
                          handleClose(avatar);
                        }}
                        key={getRandomKey()}
                      >
                        {parse(avatar)}
                      </div>
                    );
                  }
                })}
              </AvatarsWrapper>
              <br />
            </CustomModal>
            <Button
              onClick={() => {
                //@ts-ignore
                socket.disconnect(true);
                navigate("/");
              }}
            >
              <span>Back To Home</span> <FaHome />
            </Button>{" "}
          </Page>
        </FadedAnimationWrapper>
      )}
    </>
  );
};
export default JoinRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}
