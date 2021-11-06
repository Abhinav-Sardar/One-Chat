import styled from "styled-components";
import { constants } from "../Constants";

export const Page = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  .faq-content {
    width: 60%;
    font-size: 1.5vw;
    font-family: "Poppins", sans-serif;
    border-top: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-y: auto;
    span {
      display: block;
    }
  }

  .faqs {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10vh;
    > * {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 2vh 0;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export const FaqTitle = styled.section`
  width: 60%;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  height: 10vh;
  align-items: center;
  justify-content: space-around;
  background-color: ${constants.appAccentColor};
  cursor: pointer;
  span {
    color: white;
    font-size: 1.8vw;
    font-family: "Poppins", sans-serif;
  }
  i {
    font-size: 2vw;
    color: white;
  }
`;
