import { FC, Fragment } from "react";
import { StyledStickyHeader } from "../Styled-components/Mainpage.styled";
import { IoChatboxSharp } from "react-icons/io5";
import { constants } from "../Constants";
import { MainContent } from "../Styled-components/Mainpage.styled";
import { Page } from "../Styled-components/GlobalStyles";
import { BsFillChatSquareFill } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { FaBrush } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  ActionButton,
  ActionsButtonWrapper,
} from "../Styled-components/Mainpage.styled";

const MainPage: FC = () => {
  return (
    <Page>
      <div
        className="page"
        style={{
          background: "linear-gradient(60deg, #be3fbe, #fff)",
        }}
      >
        <StyledStickyHeader>
          <div className="logo">
            <IoChatboxSharp fill={constants.appAccentColor} fontSize={"3vw"} />
            <span>One-Chat</span>
          </div>

          <span className="tagline">Best place for One Time Chats</span>
        </StyledStickyHeader>
        <MainContent>
          <div className="logo">
            <IoChatboxSharp />
          </div>
          <div className="info">
            <h1 className="company__name">One-Chat</h1>
            <h2>Best place for One Time Chats with anyone in the world</h2>
          </div>
        </MainContent>
        <ActionsButtonWrapper>
          <Link to="/create">
            <ActionButton>
              Create a room <TiPlus className="plus" />
            </ActionButton>
          </Link>
          <ActionButton>
            Join a room <BsFillChatSquareFill />
          </ActionButton>
          <ActionButton>
            Customize <FaBrush />
          </ActionButton>
        </ActionsButtonWrapper>
      </div>
    </Page>
  );
};
export default MainPage;
