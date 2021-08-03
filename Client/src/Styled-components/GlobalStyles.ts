import styled, { createGlobalStyle } from "styled-components";
import { constants } from "../Constants";
export const GlobalStyles = createGlobalStyle`

* {
    padding:0 ; 
    margin:0 ; 
}

body {
  height:100vh ; 
  width:100vw; 
  overflow-x: hidden;
  scroll-behavior: smooth;
  > *:not(.logo , .tagline)::selection {
    background:white ; 
    color:${constants.appAccentColor}
}
}
svg:root {
  color:white ; 
}
.logo > span::selection {
  color:white ; 
  background-color:${constants.appAccentColor}

}

.tagline::selection {
  color:white ; 
  background-color:${constants.appAccentColor}
  
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
