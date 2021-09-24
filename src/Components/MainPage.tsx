import { FC, Fragment, useEffect, memo } from "react";
import { StyledStickyHeader } from "../Styled-components/Mainpage.styled";
import { IoChatboxSharp } from "react-icons/io5";
import { accentColorChecker, constants } from "../Constants";
import { MainContent } from "../Styled-components/Mainpage.styled";
import { BsFillChatSquareFill } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { FaBrush, FaComments, FaGithubSquare } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { MdReport } from "react-icons/md";
import { GoBook } from "react-icons/go";
import {
  ActionButton,
  ActionsButtonWrapper,
} from "../Styled-components/Mainpage.styled";

const MainPage: FC = () => {
  useEffect(() => {
    document.title = "One-Chat";
    accentColorChecker();
  }, []);
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <ThisHeader />
      <ThisMain />
      <ThisButtons />
    </div>
  );
};

function ThisHeader(): JSX.Element {
  return (
    <StyledStickyHeader>
      <div className='logo'>
        <IoChatboxSharp fill={constants.appAccentColor} fontSize={"3vw"} />
        <span>One-Chat</span>
      </div>
    </StyledStickyHeader>
  );
}

function ThisMain(): JSX.Element {
  return (
    <MainContent>
      <div className='logo'>
        <IoChatboxSharp />
      </div>
      <div className='info'>
        <h1 className='company__name'>One-Chat</h1>
        <h2>Best place for One Time Chats with anyone in the world</h2>
      </div>
    </MainContent>
  );
}

function ThisButtons(): JSX.Element {
  const history = useHistory();
  return (
    <ActionsButtonWrapper>
      <ActionButton onClick={() => history.push("/create")}>
        Create a room <TiPlus className='plus' />
      </ActionButton>
      <ActionButton onClick={() => history.push("/join")}>
        Join a room <IoChatboxSharp />
      </ActionButton>
      <ActionButton onClick={() => history.push("/customize")}>
        Customize <FaBrush />
      </ActionButton>
      <a href='https://github.com/Abhinav-Sardar/One-Chat' target='_blank'>
        <ActionButton
          style={{
            width: "19vw",
          }}
        >
          View Project On Github
          <FaGithubSquare
            style={{
              fontSize: "2.5vw",
            }}
          />
        </ActionButton>
      </a>
      <ActionButton onClick={() => history.push("/report")}>
        Report An Issue <MdReport style={{ fontSize: "2vw" }} />
      </ActionButton>
      <ActionButton
        onClick={() => history.push("/docs")}
        style={{
          width: "20vw",
        }}
      >
        Read Documentation <GoBook style={{ fontSize: "2vw" }} />
      </ActionButton>
    </ActionsButtonWrapper>
  );
}
export default memo(MainPage);
