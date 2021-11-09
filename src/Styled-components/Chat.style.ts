import { motion } from "framer-motion";
import { animated } from "react-spring";
import styled from "styled-components";
import { constants } from "../Constants";

export const MeetInfo = styled.section`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  height: 10vh;
  align-items: center;
  .roomName {
    font-size: 2vw;
    font-family: "Poppins", arial, sans-serif;
    color: ${constants.appAccentColor};
    margin-left: 2vw;
    &::selection {
      color: white;
      background-color: ${constants.appAccentColor};
    }
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5vw;
    }
  }
  .btn-wrapper {
    display: flex;
    height: 100%;
    align-items: center;
    button {
      border-radius: 10px;
      color: white;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 13vw;
      background-color: red;
      font-size: 1.5vw;
      margin-right: 2vw;
      border: 0;
      outline: 0;
      font-family: "Quicksand", sans-serif;
      border: 1px solid red;
      transition: 500ms ease-out;
      svg {
        font-size: 1.7vw;
      }
      &:hover {
        color: red;
        background-color: white;
      }
    }
  }
`;
export const RemainingChatArea = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  & > * {
    scrollbar-width: thin !important ;
  }
`;

export const MeetControls = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input {
    display: flex;
    height: 100%;
    align-items: center;
    button {
      cursor: pointer;

      &:active {
        transform: scale(0.9);
      }
      background-color: ${constants.appAccentColor};
      color: white;
      margin-left: 1vw;
      height: 4vw;
      width: 4vw;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      svg {
        font-size: 2vw;
      }
    }

    margin-left: 2vw;
    input {
      height: 3vw;

      width: 50vw;
      border: 2px solid gray;
      padding: 0 0.5vw;
      font-family: "Comfortaa", cursive;
      &:focus {
        border: 2px solid ${constants.appAccentColor};
        color: ${constants.appAccentColor};
        outline: 0;
      }
      border-radius: 20px;
      font-size: 1.7vw;
    }
  }
  .icons {
    flex-direction: row;
    svg {
      color: ${constants.appAccentColor};
      font-size: 2vw;
      margin: 0 1.1vw;
      cursor: pointer;

      outline: 0;

      color: ${constants.appAccentColor};
      transition: 400ms ease-ease-in-out;
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;

  overflow-y: auto;
  position: relative;
  border-right: 1px solid ${(pr) => pr.theme};
  border-top: 1px solid ${(pr) => pr.theme};
  border-left: 1px solid ${(pr) => pr.theme};
  scrollbar-width: thin !important;
  scroll-behavior: smooth;
`;

export const UsersSection = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  .length {
    width: 100%;
    font-size: 1.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw 0;
    font-family: "Mulish", sans-serif;
  }
`;

export const User = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  text-align: center;
  border-top: 1px solid ${(pr) => pr.theme};
  svg:not(.ban__icon, .host__crown) {
    height: 4vw;
    width: 4vw;
    border-radius: 50%;
    border: 1px solid ${(pr) => pr.theme};
  }
  span {
    font-size: 1.3vw;
    font-family: "Quicksand", sans-serif;
  }
  .ban__icon {
    color: red;
    font-size: 2vw;
  }
  .host__crown {
    color: #efc623;
    font-size: 2.5vw;
  }
`;

export const SidePanelHeader = styled.div`
  color: ${constants.appAccentColor};
  span {
    font-family: "Poppins", sans-serif;
    font-size: 1.9vw;
    margin-left: 0.5vw;
    &::selection {
      color: white;
      background-color: ${constants.appAccentColor};
    }
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: red;
    font-size: 2vw;
    margin-right: 1vw;
  }
`;

export const ChatPage = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SharePanel = styled(motion.aside)`
  > * {
    text-align: center;
  }
  .header {
    color: ${constants.appAccentColor};
    font-size: 1.6vw;
    font-family: "Poppins", sans-serif;
  }
  .description {
    font-family: "Quicksand", sans-serif;
    font-size: 1.4vw;
  }
  .url {
    width: 95%;
    font-style: italic;
    font-size: 1.3vw;
    font-family: "Poppins", sans-serif;
    color: ${constants.appAccentColor};
    margin-top: 1vw;
  }
  .copy {
    background-color: ${constants.appAccentColor};
    color: white;
    transition: 400ms ease;
    border: 1px solid ${constants.appAccentColor};
    width: 50%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: space-around;
    height: 3vw;
    font-size: 1.4vw;
    font-family: "Quicksand", sans-serif;
    border-radius: 10px;
    svg {
      font-size: 1.5vw;
    }
    margin-top: 1vw;

    &:hover {
      background-color: white;
      color: ${constants.appAccentColor};
    }
  }
`;

export const EmojiPanel = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  .images_wrapper {
    margin-top: 1vw;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      height: 2.5vw;
      width: 2.5vw;
      &::selection {
        background: transparent;
      }
    }
  }
  .emojis__wrapper {
    border: 1px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    scrollbar-width: thin;

    span {
      font-size: 2vw;
      margin: 1vw;
      width: 2vw;
      height: 2vw;
      cursor: pointer;
      &::selection {
        background-color: transparent;
      }
      &:active {
        transform: scale(0.8);
      }
    }
  }
`;

export const ImagesPanel = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    justify-content: center;
    background-color: #8d8b8e;
    align-items: center;
    padding: 0.5vw 0;
    border: 1px solid black;
    width: 100%;
    border-top: 0;
    input {
      height: 3vw;
      width: 75%;
      border: 0;
      outline: 2px solid ${constants.appAccentColor};
      font-size: 1.5vw;
      font-family: "Urbanist", sans-serif;
    }
    button {
      background-color: ${constants.appAccentColor};
      &:active {
        transform: scale(0.9);
      }
      margin-left: 0.6vw;
      border-radius: 50%;
      svg {
        color: white;
        font-size: 1.5vw;
      }
      height: 3vw;
      width: 3vw;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
    }
  }
  .sponsor {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Urbanist", sans-serif;
    font-size: 1.3vw;
    span {
      margin-right: 0.5vw;
    }
    a {
      color: ${constants.appAccentColor};
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .status__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3vw;
    svg {
      font-size: 9.5vw;
    }
    h1 {
      font-size: 1.9vw;
      font-family: "Poppins", sans-serif;
    }
    .fetching-svg {
      animation: 3s spin linear infinite;
    }
    .error-svg {
      color: red;
    }
    .error-content {
      color: red;
    }
  }
  .images__wrapper {
    .btns {
      display: flex;
    }
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    img {
      height: 10vw;
      width: 90%;
      margin: 1vw 0;
      border-radius: 10px;
      border: 3px solid ${constants.appAccentColor};
    }
    .gif {
      height: 12.5vw;
      width: 93%;
      margin: 1vw 0;
      border-radius: 10px;
      border: 3px solid ${constants.appAccentColor};
    }
  }
`;

export const ModalContent = styled.div`
  > * {
    margin: 1.7vw 0;
  }
  img {
    width: 45vw;
    height: 23vw;
    border-radius: 10px;
  }

  text-align: center;
  .header {
    font-family: "Quicksand", sans-serif;
    font-size: 3vw;
    color: white;
    margin: 0;
  }
  .form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      width: 60%;
      height: 2.5vw;
      border-radius: 10px;
      border: 0;
      font-size: 1.2vw;
      font-family: "Poppins", sans-serif;
      font-weight: 550;
      color: ${constants.appAccentColor};
      padding: 0 0.5vw;
    }
    button.submit__ban {
      margin-left: 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3vw;
      width: 3vw;
      border-radius: 50%;
      outline: 0;
      border: 0;
      &:active {
        transform: scale(0.8);
      }
      svg {
        color: ${constants.appAccentColor};
        font-size: 1.5vw;
      }
    }
  }
  .actionsWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      transition: 600ms ease-in-out;
      width: 30%;
      height: 4vw;
      margin: 0 2vw;
      font-size: 1.5vw;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${constants.appAccentColor};
      font-family: "Poppins", sans-serif;
      background-color: white;
      border: 0;

      border-radius: 10px;

      &:hover {
        background-color: ${constants.appAccentColor};
        color: white;
        border: 3px solid white;
      }
      svg {
        font-size: 1.8vw;
        margin-left: 1.5vw;
      }
    }
  }
`;

export const Indicator = styled.div`
  color: white;
  width: 70%;
  display: flex;
  margin: 1vw auto;
  justify-content: center;
  align-items: center;
  padding: 0.5vw 0.5vw;
  border-radius: 10px;
  span {
    font-family: "Varela Round", sans-serif;
    font-size: 1.5vw;
  }
  svg {
    font-size: 1.8vw;
    margin-left: 3vw;
  }
`;

export const Reply = styled(motion.section)`
  display: flex;
  height: 10vh;
  .icon {
    height: 100%;
    width: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2vw;
      cursor: pointer;
    }
  }
  .content {
    height: 100%;
    width: 95vw;
    display: flex;
    flex-direction: row;
    display: flex;
    font-size: 1.8vw;
    align-items: center;

    > * {
      height: 100%;
      width: 100%;
    }
    img {
      width: 10%;
      height: 100%;
    }
  }
`;
export const MiniatureReplyPreviewDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  cursor: pointer;
  .info-reply {
    font-size: 1.3vw;
    height: 40%;
    font-family: "Quicksand", sans-serif;
    color: #2f9ee0;
    margin-left: 2.5%;
  }
  .content-reply {
    color: white;
    border-radius: 10px;
    width: 45%;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-size: 1.15vw;
    height: 50%;
    margin-left: 2.5%;
    padding: 0 1%;
  }
`;

export const StyledPostPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  font-family: "Poppins", sans-serif;
  color: ${constants.appAccentColor};
  .icon {
    font-size: 11vw;
  }
  .title {
    font-size: 3.5vw;
    font-family: "Poppins", sans-serif;
  }
  .description {
    font-size: 2vw;
  }
`;
