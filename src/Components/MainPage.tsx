import { FC, Fragment, useEffect, memo } from "react";
import { StyledStickyHeader } from "../Styled-components/Mainpage.styled";
import { IoChatboxSharp } from "react-icons/io5";
import { accentColorChecker, constants } from "../Constants";
import { MainContent } from "../Styled-components/Mainpage.styled";

import { TiPlus } from "react-icons/ti";
import { FaBrush, FaComments, FaEye, FaGithubSquare } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsQuestionCircleFill } from "react-icons/bs";
import {
  ActionButton,
  ActionsButtonWrapper,
} from "../Styled-components/Mainpage.styled";
import { FadedAnimationWrapper } from "./Chat.SubComponents";
import { useNavigate } from "react-router-dom";
const MainPage: FC = () => {
  useEffect(() => {
    document.title = "One-Chat";
    accentColorChecker();
    document.body.style.background = `linear-gradient(60deg , ${constants.appAccentColor} , #fff)`;

    document.querySelector(
      "#root"
      //@ts-ignore
    )!.style.background = `linear-gradient(60deg , ${constants.appAccentColor} , #fff)`;
  }, []);
  return (
    <FadedAnimationWrapper>
      <ThisHeader />
      <ThisMain />
      <ThisButtons />
    </FadedAnimationWrapper>
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
  const navigate = useNavigate();
  return (
    <ActionsButtonWrapper>
      <ActionButton onClick={() => navigate("/create")}>
        Create a room <TiPlus className='plus' />
      </ActionButton>
      <ActionButton onClick={() => navigate("/join")}>
        Join a room <IoChatboxSharp />
      </ActionButton>
      <ActionButton onClick={() => navigate("/customize")}>
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
      <ActionButton
        style={{
          padding: "0 1vw",
          width: "16vw",
        }}
        onClick={() => navigate("/rooms/public")}
      >
        View Public Rooms
        <FaEye style={{ fontSize: "2vw" }} />
      </ActionButton>
      <ActionButton onClick={() => navigate("/report")}>
        Report An Issue <MdReport style={{ fontSize: "2vw" }} />
      </ActionButton>
      <ActionButton onClick={() => navigate("/faqs")}>
        FAQs <BsQuestionCircleFill />
      </ActionButton>
      <a href='https://one-chat-v1.netlify.app' target='_blank'>
        <ActionButton>
          Old One-Chat <FaComments />
        </ActionButton>
      </a>
    </ActionsButtonWrapper>
  );
}
export default memo(MainPage);
