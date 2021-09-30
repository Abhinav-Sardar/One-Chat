import styled from "styled-components";
import { constants } from "../Constants";

export const ReportPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  & > * {
  }
  .header {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    span {
      font-size: 5vw;
      color: ${constants.appAccentColor};
      font-family: "Poppins", sans-serif;
    }
    svg {
      color: red;
    }
  }
  button {
    flex: 0.3;
  }
  .input {
    flex: 2;
    border: 1px solid ${constants.appAccentColor};
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      label {
        font-size: 2vw;
        font-family: "Poppins", sans-serif;
      }
      input {
        width: 80%;
        padding: 1.2vw 0;
        border: 2px solid #ccc;
        border-radius: 10px;
        outline: 0;
        font-size: 1.5vw;
        &:focus {
          border: 3px solid ${constants.appAccentColor};
        }
      }
    }
  }
`;
