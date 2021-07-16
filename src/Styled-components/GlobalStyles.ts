import styled, { createGlobalStyle } from "styled-components";
import { constants } from "../Constants";
export const GlobalStyles = createGlobalStyle`

* {
    padding:0 ; 
    margin:0 ; 
}
*::selection{
  color:white ; 
  background-color: ${constants.appAccentColor};
}
body {
  height:100vh ; 
  width:100vw; 
  overflow-x: hidden;
  background: linear-gradient(60deg, #be3fbe, #fff);
}
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(60deg, #be3fbe, #fff); ;
`;
