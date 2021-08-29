import styled from "styled-components";
import { constants } from "../Constants";

export const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  svg {
    color: red;
    font-size: 10vw;
  }
  h1,
  h2 {
    color: ${constants.appAccentColor};
    font-family: "Poppins", sans-serif;
  }
  h1 {
    big {
      color: red;
    }
    font-size: 3vw;
  }
`;
