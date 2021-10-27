import styled from "styled-components";
import { constants } from "../Constants";
export const DocsPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  background-color: white;
  .titles {
    .header {
      margin-top: 2vh;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        font-size: 2vw;
        font-family: "Poppins", sans-serif;
        color: #bd14ca;
      }
    }
    width: 20vw;
    border-right: 1px solid black;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    .current {
      color: ${constants.appAccentColor};
      border-right: 7px solid ${constants.appAccentColor};
    }
  }
  .currentTitleContent {
    width: 80vw;
    overflow-x: hidden;
    overflow-y: auto;
  }
`;

export const Title = styled.h1`
  font-size: 2.5vw;
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  svg {
    font-size: 3vw;
    color: black;
  }
`;

export const TitleButton = styled.button`
  margin-top: 1vw;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  outline: 0;
  border: 0;
  color: gray;
  cursor: pointer;
  svg {
    font-size: 3vw;
    width: 20%;
  }
  span {
    font-size: 1.2vw;
    width: 80%;
    font-family: "Quicksand", sans-serif;
  }
`;
export const Typography = styled.p`
  font-family: "Quicksand", sans-serif;
  font-size: 1.5vw;
`;
export const Wrapper = styled.section`
  > * {
    width: 78vw;
    margin: 0.5vw 0;
  }
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
