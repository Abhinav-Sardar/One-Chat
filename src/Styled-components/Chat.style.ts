import styled from "styled-components";
import { constants } from "../Constants";

export const ChatPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const RemainingChatArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 80vw;
  justify-content: flex-start;
`;

export const MeetControls = styled.footer`
  border: 1px solid black;
  width: 100vw;
  height: 20vh;
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
      border: 1px solid gray;
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
      margin: 0 1.3vw;
      color: ${constants.appAccentColor};
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  flex-direction: column;
`;
