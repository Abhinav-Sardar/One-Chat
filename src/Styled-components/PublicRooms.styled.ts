import { constants } from "../Constants";
import styled from "styled-components";

export const PubPage = styled.div`
  height: 100vh;
  width: 100vw;
  overfllow-y: auto;
  background-color: white;
  text-align: center;
  > * {
    margin-left: auto;
    margin-right: auto;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 15px;
    width: 25vw;
    input {
      border: 0;
      background-color: white;
      width: 20vw;
      height: 8vh;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      outline: 0;
      font-family: "Quicksand", sans-serif;
      font-size: 1.3vw;
    }
    svg {
      margin: 0 0.5vw;
      color: gray;
      font-size: 1.5vw;
    }
  }
`;

export const PrimaryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-family: "Poppins", sans-serif;
    font-size: 4vw;
    margin: 0 1vw;
    color: ${constants.appAccentColor};
  }
  svg {
    font-size: 4vw;
    margin: 0 1vw;
    color: ${constants.appAccentColor};
  }
`;
export const Room = styled.section`
  margin: 2vw auto;

  border: 1px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-radius: 10px;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh !important;
  > * {
    border: 1px solid black;
    width: 100%;
    text-align: center;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    font-family: "Urbanist", sans-serif;
    .roomName {
      border-bottom-left-radius: 0px;
    }
  }
`;
