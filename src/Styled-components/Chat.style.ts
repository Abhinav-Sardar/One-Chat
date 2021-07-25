import { animated } from "react-spring";
import styled from "styled-components";
import { constants } from "../Constants";

export const MeetInfo = styled.section`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  height: 10%;
`;
export const RemainingChatArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 78%;
  justify-content: flex-start;
  .idk {
    flex: 1;
    display: flex;
    justify-content: flex-start;
  }
`;

export const MeetControls = styled.footer`
  width: 100vw;
  height: 12%;
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
      margin: 0 1.3vw;
      color: ${constants.appAccentColor};
      transition: 400ms ease-ease-in-out;
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  flex-direction: column;
`;
