import { animated } from "react-spring";
import styled, { keyframes } from "styled-components";
import { constants } from "../Constants";
export const Page = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${constants.appAccentColor};
  > * {
    margin: 0.5vw 0;
  }
  .purpose {
    color: white;
    font-family: "Quicksand", sans-serif;
    font-size: 4vw;
    &::selection {
      color: ${constants.appAccentColor};
      background-color: white;
    }
  }
`;

export const Form = styled.form`
  overflow-x: hidden;
  overflow-y: hidden;
  button.submit {
    color: #053fb3;
    background-color: yellow;
    padding: 0.5vw 2.5vw;
    transition: 300ms ease-in-out;
    font-size: 1.5vw;
    border-radius: 10px;
    border: 1px solid yellow;
    font-family: "Poppins", sans-serif;
    &:hover {
      color: yellow;
      background-color: #053fb3;
    }
  }
  background-color: #053fb3;
  overflow-y: auto;
  border: 1px solid black;
  height: 40vw;
  width: 45vw;
  border-radius: 20px;
  border: 0;

  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  .field {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    svg:not(.btn-avatar) {
      width: 5vw;
      height: 5vw;
      border-radius: 50%;
      border: 2px solid white;
    }

    span {
      font-size: 2vw;
      font-family: "Poppins", sans-serif;
      color: white;
      &::selection {
        color: ${constants.appAccentColor};
        background-color: white;
      }
    }
    input {
      width: 80%;
      height: 2vw;
      font-size: 1.2vw;
      font-family: "Open Sans", sans-serif;
      border-radius: 5px;
      border: 0;
      &::placeholder {
        font-size: 1.1vw;
        margin-left: 5px;
      }
    }
    button.choose__avatar {
      background-color: ${constants.appAccentColor};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 0;
      color: white;
      font-size: 1.1vw;
      border-radius: 10px;
      padding: 0 2vw;
      height: 2.5vw;
      transition: 300ms ease-in-out;
      &:hover {
        background-color: white;
        svg,
        span {
          color: ${constants.appAccentColor};
        }
      }
      span {
        font-family: "Poppins", sans-serif;
        font-size: 1.2vw;
      }

      svg {
        padding: 0;
        margin-left: 0.5vw;
        color: white;
      }
    }
  }
`;

export const AvatarsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 40vw;
  .current {
    border: 2px solid yellow;
  }
  div {
    border: 2px solid white;
    svg {
      width: 5vw;
      height: 5vw;
      border-radius: 50%;

      justify-content: center;
    }
    border-radius: 50%;

    margin: 0.5vw;
  }
`;

export const AvatarActionBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  .loader {
    font-family: "Poppins", arial, sans-serif;
  }
  h1 {
    font-family: "Quicksand", sans-serif;
    font-size: 2.5vw;
  }
  button {
    margin: 1vw 1vw;
    background-color: #1741ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 0;
    color: white;
    font-size: 1.4vw;
    border-radius: 10px;
    padding: 0 2.5vw;
    height: 3vw;
    transition: 200ms ease-in-out;
    &:hover {
      background-color: steelblue;
    }
    span {
      font-family: "Poppins", sans-serif;
    }

    svg {
      padding: 0;
      margin-left: 0.5vw;
      color: white;
    }
  }
`;
const num = 4;
const height = `${num / 2}vw`;
const width = `${num}vw`;
const br = `${num / 4}vw`;
export const Toggler = styled.label`
  margin: 0 1vw;
  cursor: pointer;
  input {
    display: none;
    &:checked ~ div {
      background: ${constants.appAccentColor};
    }
    &:checked ~ div::after {
      transform: translateX(${height});
    }
  }
  div {
    position: relative;
    width: ${width};
    height: ${height};
    border-radius: ${br};
    background: #ccc;
    transition: background 0.4s;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: ${height};
      width: 2vw;
      background: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
      border-radius: ${br};
      transition: transform 0.4s;
    }
  }
`;
