import styled from "styled-components";
import { constants } from "../Constants";
export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
  background-color: ${constants.appAccentColor};
`;

export const Form = styled.form`
  background-color: #053fb3;
  overflow-y: auto;
  border: 1px solid black;
  height: 36vw;
  width: 40vw;

  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  .field {
    width: 100%;
    text-align: center;

    span {
      font-size: 2vw;
      font-family: "Poppins", sans-serif;
      color: white;
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
  }
`;
