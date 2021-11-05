import { createGlobalStyle } from "styled-components";
import { constants } from "../Constants";
export const GlobalStyles = createGlobalStyle`
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes jump {
      10% {
        transform: translateY(2px);
      }
      20% {
        transform: translateY(4px);
      }
      30% {
        transform: translateYY(5px);
      }
      40% {
        transform: translateY(6px);
      }
      50% {
        transform: translateY(8px);
      }
      60% {
        transform: translateY(6px);
      }
      70% {
        transform: translateY(4px);
      }
      80% {
        transform: translateY(3px);
      }
      90% {
        transform: translateY(2px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    a {
      text-decoration: none;
    }
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
  .reply-cont {
    cursor:pointer;
    background-color:${constants.replyFadedBg};
    width:46vw;
    height:10vh;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  };
  .reply-chip {
    width:46vw;
    height:4vh;
    border-bottom:2px solid black;
    background-color:${constants.replyFadedBg};
    display:flex;
    align-items: center;
    svg {
      font-size:1.4vw;
      color:black;
      margin-left:1.5vw;
    }
    span {
      font-family:'Quicksand' , sans-serif;
      font-size:1.4vw;
      margin-left:2vw;
      color:black;
    }
  }
  margin:1vw 0 ; 
  margin-left:1vw ; 
  .info {
    margin:0.1vw 0 ; 
    display:flex ; 
    align-items:center ; 
    svg:not(.reply) {
      height:4vw ; 
      width:4vw ; 
      border-radius:50% ; 
  
      border:2px solid #2f9ee0  ; 
    };
    .reply {
      color:#2f9ee0;
      font-size:2vw;
      cursor:pointer;

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
   width:70% ;
   border-radius:5px ; 

    };
    color:white ;
    border-radius:10px ; 
    background:${constants.appAccentColor} ; 
    width:45vw ;  ; 

    padding:.5vw ; 
    span {
      font-size:1.45vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    }
    .caption {
    align-self:center;
    margin-top:1vw ; 
    }
    
  }
}
.Incoming {
    .reply-cont {
    cursor:pointer;
    background-color:${constants.replyFadedBg};
    width:46vw;
    height:10vh;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  };
  .reply-chip {
    width:46vw;
    background-color:${constants.replyFadedBg};
    height:4vh;
    border-bottom:2px solid black;
    display:flex;
    align-items: center;
    svg {
      font-size:1.9vw;
      color:black;
      margin-left:1.5vw;

    }
    span {
      font-family:'Quicksand' , sans-serif;
      font-size:1.4vw;
      margin-left:2vw;
      color:black;
      
     
    }
  }
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
       svg:not(.reply) {
      height:4vw ; 
      width:4vw ; 
      border-radius:50% ; 
  
      border:2px solid #2f9ee0  ; 
    };
    .reply {
      color:${constants.appAccentColor};
      font-size:2vw;
      cursor:pointer;
      
    }
    span {
      font-size:2vw ; 
      font-family:"Quicksand", sans-serif;
      margin: 0 1.3vw ; 
      color:#2f9ee0 ; 
    }
  };
  .content {
    img {
      height:15vw ; 
      width:30vw ; 
      border-radius:5px
    } ; 
    color:white ; 
    border-radius:10px ; 
    background:whitesmoke; 
    width:45vw ;  ; 
    font-size:1.45vw ; 
    font-family: "Poppins" , sans-serif;
    word-break: break-all;
    padding:0.5vw ; 
   

  };

  };
}

.rstb {
	height:100% ; 
	width: 100%;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	overflow-y:auto ; 
   > * {
  scrollbar-width: thin !important;
	overflow-x: hidden !important;

   }
}
a {
  cursor:default ; 
}

.scrollButton {
  border:1px solid white ; 
  background:${constants.appAccentColor} !important ; 
  height:1.5vw !important; 
  width:1.5vw !important; 
  border-radius:50% !important; 
  &:hover {
    opacity:0.9 !important ; 
  }
  display:flex  !important; 
  justify-content: center !important ; 
  align-items: center !important;

};


* {
     scrollbar-width: auto;
     scrollbar-color: ${constants.appAccentColor} lightgray;
     scrollbar-behaviour:smooth;
   }
   #reset {
     animation:2s spin linear infinite ; 
   };
.gifPlayer {
position: absolute;
right: 43%;
top: 32%;
font-size: 2.5vw;
color: white;
border: 3.5px solid white;
padding: 1vw;
border-radius: 50%;
border-style: dashed;
cursor:pointer ; 
};

@keyframes pop {
  0% {
    opacity:1 ; 
  }
  50% {
    opacity:0.1;
  }

  100% {
    opacity:1;
  }
}
.pop {
  animation-iteration-count:4;
  animation-name:pop;
  animation-duration: .7s;
  animation-timing-duration: ease-in-out;
  
}
`;
