import styled, { createGlobalStyle } from "styled-components";
import { constants } from "../Constants";
export const GlobalStyles = createGlobalStyle`
#__next {
  background: linear-gradient(60deg, ${constants.appAccentColor}, #fff);
}
* {
    padding:0 ; 
    margin:0 ; 
   
}
#__next , body {
  overflow:hidden ; 
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
  
      border:2px solid #2f9ee0  ; 
    }
    span {
      font-size:2vw ; 
      font-family:"Quicksand", sans-serif;
      margin: 0 1.3vw ; 
      color:#2f9ee0 ; 
    }
  }
  .content {
    img {
   height:15vw ; 
   width:25vw ; 
    }
    color:white ;
  border-radius:10px ; 

    background:${constants.appAccentColor} ; 
    width:45vw ;  ; 
    font-size:1.45vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    padding:0.5vw ; 
  }
}
.Incoming {
  margin:1vw 0 ; 
    display:flex ; 
  flex-direction: column ;
  align-items:flex-end ; 
  div {
  margin-right: 0.5vw ; 
    
  .info {
    margin:0.1vw 0 ; 
    display:flex ; 
    align-items: center;
    svg {
      height:4vw ; 
      width:4vw ; 
      border-radius:50% ; 
      border:2px solid #2f9ee0  ; 
   
    }
    span {
      font-size:2vw ; 
      font-family:"Quicksand", sans-serif;
      margin: 0 1.3vw ; 
      color:#2f9ee0 ; 
    }
  }
  .content {
    img {
      height:15vw ; 
      width:25vw ; 
    }
    color:white ; 
  border-radius:10px ; 

    background:whitesmoke; 
    width:45vw ;  ; 
    font-size:1.45vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    padding:0.5vw ; 
   

  }
  }
}

.rstb {
  border: 1px solid black;
	height:100% ; 
	width: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	overflow-y:auto ; 
	overflow-x: hidden;
}
a {
  cursor:default ; 
}

.scrollButton {
  border:1px solid white ; 
  background:${constants.appAccentColor} !important ; 
  height:2vw !important; 
  width:2vw !important; 
  border-radius:50% !important; 
  &:hover {
    opacity:0.9 !important ; 
  }
  display:flex  !important; 
  justify-content: center !important ; 
  align-items: center !important;
  i {
    color:white  !important; 
    font-size:1.5vw  ; 
  }
}

.upload-content {
  margin-top:3vw ; 
  width:100% ; 
  text-align:center ;
  img {
    width:40% ; 
    height:15vw ;
    border:1px solid white ; 
  } 
   > * {
     margin:1.5vw 0 ;
   }
   h1 {
     font-family:"Quicksand", sans-serif;
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
