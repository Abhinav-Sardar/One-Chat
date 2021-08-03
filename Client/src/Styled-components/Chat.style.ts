import { animated } from "react-spring";
import styled from "styled-components";
import { constants } from "../Constants";

export const MeetInfo = styled(animated.section)`
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
  }
  button {
    &:hover {
      background-color: whitesmoke;
      color: red;
    }
    transition: 400ms ease-in-out;

    height: 70%;
    color: white;
    background-color: red;
    margin-right: 2vw;
    padding: 0 1vw;
    font-size: 1.5vw;
    border-radius: 20px;
    outline: 0;
    border: 1px solid red;
  }
`;
export const RemainingChatArea = styled(animated.div)`
  display: flex;
  flex-direction: row;
  height: 78%;
  justify-content: flex-start;
`;

export const MeetControls = styled(animated.footer)`
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

      outline: 0;

      color: ${constants.appAccentColor};
      transition: 400ms ease-ease-in-out;
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  flex-direction: column;
  h1 {
    margin-left: 50%;
  }
  border-right: 1px solid ${(pr) => pr.theme};
`;

export const UsersSection = styled(animated.aside)`
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
  svg {
    height: 4vw;
    width: 4vw;
    border-radius: 50%;
    border: 1px solid ${(pr) => pr.theme};
  }
  h2 {
    font-size: 1.5vw;
    font-family: "Quicksand", sans-serif;
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

export const ChatPage = styled(animated.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const SharePanel = styled(animated.aside)`
  overflow-y: auto;
  h3 {
    width: 100%;
    text-align: center;
    font-family: "Mulish", sans-serif;
    font-size: 1.4vw;
  }
  h2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: "Roboto", sans-serif;
    margin: 2vh 0;
    font-size: 1.2vw;
    letter-spacing: 1px;
    .copy {
      color: ${constants.appAccentColor};
      width: 70%;
      font-size: 1.5vw;
      background-color: transparent;
      &:hover {
        color: white;
        background-color: ${constants.appAccentColor};
      }
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      border: 1px solid ${constants.appAccentColor};
      padding: 0.5vw 0;
      transition: 400ms ease-in-out;
      outline: 0;
    }
    a {
      color: ${constants.appAccentColor};
      font-size: 1.3vw;
      margin: 0.5vw 0;
      word-break: break-all;
      width: 80%;
    }
  }
  .breaker {
    font-family: "Poppins", sans-serif;
    font-size: 1.6vw;
    text-align: center;
  }
`;

export const EmojiPanel = styled(animated.aside)`
  span {
    font-size: 2rem;
    margin: 1vw;
  }
  width: 95%;
  display: flex;
  flex-direction: column;
`;
