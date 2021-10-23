import { animated } from "@react-spring/web";
import styled from "styled-components";
import { constants } from "../Constants";

export const StyledStickyHeader = styled.div`
  border: 1.5px solid lightgray;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 2vh 0vh;
  align-items: center;
  color: ${constants.appAccentColor};
  background-color: whitesmoke;
  text-decoration: none;
  border-bottom: 1px solid black;

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tagline {
    margin-right: 2vw;
    font-family: "Poppins", sans-serif;
    font-size: 1.7vw;
    text-transform: capitalize;
  }
  .logo > span {
    font-size: 2vw;
    font-family: "Poppins", sans-serif;
    color: ${constants.appAccentColor};
  }
`;

export const MainContent = styled.main`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  font-family: "Poppins", sans-serif;
  .logo > svg {
    color: ${constants.appAccentColor};
    font-size: 14vw;
    position: relative;
    animation: jump 2s infinite linear;
    transition: 400ms ease-in-out;
  }

  > * {
    margin: 0.8vw 0;
  }
  .info {
    width: 100vw;
    text-align: center;
    color: ${constants.appAccentColor};
    > *::selection {
      background-color: ${constants.appAccentColor};
      color: white;
    }
    h1 {
      font-family: "Raleway", sans-serif;
      font-size: 5vw;
    }
    h2 {
      font-size: 1.7vw;
    }
  }
`;
export const ActionButton = styled.button`
  border: 0;
  width: 14vw;
  height: 5vw;
  margin: 1vw 1vw;
  border-radius: 10px;
  font-size: 1.3vw;
  transition: 0.4s ease-in;
  color: white;
  font-family: "Quicksand", sans-serif;

  background-color: ${constants.appAccentColor};
  &:hover {
    color: ${constants.appAccentColor};
    background-color: white;
    transform: scale(1.06);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    animation: none;
    transition: none;
    font-size: 1.5vw;
    margin: 0 0.5vw;
  }
  .plus {
    font-size: 2vw;
  }
`;

export const ActionsButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: center;
`;


