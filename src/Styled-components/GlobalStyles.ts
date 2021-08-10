import styled, { createGlobalStyle } from "styled-components";
import { constants } from "../Constants";
export const GlobalStyles = createGlobalStyle`

* {
    padding:0 ; 
    margin:0 ; 
}
.mainChat {
  display:flex ; 
  flex-direction:column ;
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


::-webkit-scrollbar {
  width: 0.7vw ; 
}


::-webkit-scrollbar-track {
  background: transparent ; 

}

::-webkit-scrollbar-thumb {
  background:${constants.appAccentColor} ; 
  
  border-radius:30px ; 
}

::-webkit-scrollbar-thumb:hover {
  background: gray ; 
}  ; 
.Outgoing {
  

  margin:1vw 0 ; 
  margin-left:1vw ; 
  .info {
    margin:0.1vw 0 ; 
    display:flex ; 
    align-items: center;

    svg {
      height:4vw ; 
      width:4vw ; 
      border-radius:50% ; 
      border:2px solid ${constants.appAccentColor} ; 
    }
    span {
      font-size:2vw ; 
      font-family:"Quicksand", sans-serif;
      margin 0 1.3vw ; 
      color:#2f9ee0 ; 
    }
  }
  .content {
    color:white ;
  border-radius:10px ; 

    background:${constants.appAccentColor} ; 
    width:50% ; 
    font-size:1.8vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    padding:0.5vw ; 
  }
}
.Incoming {
  margin:1vw 0 ; 
  margin-right: 1vw ; 
  display:flex ; 
  flex-direction: column ;
  align-items:flex-end ; 
  .info {
    margin:0.1vw 0 ; 
    display:flex ; 
    align-items: center;

    svg {
      height:4vw ; 
      width:4vw ; 
      border-radius:50% ; 
      border:2px solid ${constants.appAccentColor} ; 
    }
    span {
      font-size:2vw ; 
      font-family:"Quicksand", sans-serif;
      margin 0 1.3vw ; 
      color:#2f9ee0 ; 
    }
  }
  .content {
    color:black ; 
  border-radius:10px ; 

    background:whitesmoke; 
    width:50% ; 
    font-size:1.8vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    padding:0.5vw ; 
    border:1px solid #232424 ; 

  }
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
