import styled from "styled-components";

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
  .icons {
    flex-direction: row;
    > * {
      margin: 0 0.5vw;
    }
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  flex-direction: column;
`;
