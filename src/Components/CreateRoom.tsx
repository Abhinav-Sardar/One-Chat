import {
  useRef,
  FC as FunctionalComponent,
  FormEvent,
  useContext,
  FC,
} from "react";
import {
  AvatarActionBtns,
  AvatarsWrapper,
  FormSubmitBtn,
  LoadingButtonStyled,
  Page,
  Toggler,
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
  IsRoomThere,
  user,
  validator,
  room,
  getRandomKey,
} from "../Constants";

import { Button } from "../Styled-components/Customize.style";
import { toast } from "react-toastify";
import { CustomModal, FadedAnimationWrapper } from "./Chat.SubComponents";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const socket = io(constants.serverName);

const CreateRoom: FunctionalComponent = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [user, setUser] = useContext(SelfClientContext);
  const formVariants = {
    initial: {
      width: 0,
    },
    animated: {
      width: "45vw",
      transition: {
        type: "spring",
        stiffness: 100,
        staggerChildren: 0.5,
      },
    },
  };
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const roomRef = useRef();
  useEffect(() => {
    if (isModalOpen === true) {
      //@ts-ignore
      setTimeout(() => window.scroll(0, 0), 1000);
    }
  }, [isModalOpen]);
  function handleClose(avatar: string) {
    setCurrentAvatar(avatar);
    setIsModalOpen(false);
  }

  useEffect(() => {
    document.title = "Create A Room";
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

  function handleSubmit(e: FormEvent): void {
    setIsConnecting(true);
    e.preventDefault();
    // @ts-ignore
    const room = document.querySelector("input#room").value;
    // @ts-ignore
    const name = document.querySelector("input#name").value;
    if (isConnecting) {
      return;
    } else {
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
            setIsConnecting(false);
            //@ts-ignore
            socket.disconnect(true);

            toast.error(constants.roomAlreadyExistsError);
            //@ts-ignore
            roomRef.current.focus();
          } else {
            const newUser: user = {
              avatarSvg: currentAvatar,
              currentRoomName: room,
              hasCreatedPrivateRoom: isPrivate,
              name: name,
              isHost: true,
            };
            setUser(newUser);
            //@ts-ignore
            socket.disconnect(true);
            setIsConnecting(false);
            navigate(`/room/${room}`);
          }
        });
      } else {
        setIsConnecting(false);
      }
    }
  }

  return (
    <>
      <FadedAnimationWrapper>
        <Page>
          <h1 className='purpose'>Create</h1>
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
                /* @ts-ignore */
                id='name'
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
                id='room'
                spellCheck
                required
                placeholder='Name Your Room'
                ref={roomRef}
              />
            </div>
            <div className='field'>
              <span>Avatar</span>
              {currentAvatar && parse(currentAvatar)}

              <button
                onClick={() => setIsModalOpen(true)}
                className='choose__avatar'
                type='button'
              >
                <span>Choose Avatar</span> <FaUserAlt className='btn-avatar' />
              </button>
            </div>
            <div className='field'>
              <span>Private Or Public Room</span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span>{isPrivate ? "Private" : "Public"}</span>
                <Toggler>
                  <input
                    type='checkbox'
                    id='pp-check'
                    disabled={isConnecting}
                    //@ts-ignore
                    onChange={(e) => {
                      setIsPrivate(e.target.checked);
                    }}
                  />
                  <div></div>
                </Toggler>
              </div>
            </div>
            {isConnecting ? (
              <LoadingButton />
            ) : (
              <FormSubmitBtn type='submit' className='submit'>
                Create Room
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
          </CustomModal>
          <Button
            onClick={() => {
              navigate("/");
              //@ts-ignore
              socket.disconnect(true);
            }}
          >
            <span>Back To Home</span> <FaHome />
          </Button>{" "}
        </Page>
      </FadedAnimationWrapper>
    </>
  );
};
export default CreateRoom;
function returnRandomAvatar(): string {
  return createAvatar(style);
}

export const LoadingButton: FC = () => {
  return (
    <LoadingButtonStyled>
      <AiOutlineReload />
    </LoadingButtonStyled>
  );
};
