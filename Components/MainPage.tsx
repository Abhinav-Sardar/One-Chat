import { FC, Fragment, useEffect, memo } from "react";
import { StyledStickyHeader } from "../Styled-components/Mainpage.styled";
import { IoChatboxSharp } from "react-icons/io5";
import { constants, setUrl } from "../Constants";
import { MainContent } from "../Styled-components/Mainpage.styled";
import { BsFillChatSquareFill } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { FaBrush, FaComments } from "react-icons/fa";
import Link from "next/link";
import {
  ActionButton,
  ActionsButtonWrapper,
} from "../Styled-components/Mainpage.styled";

const MainPage: FC = () => {
  return (
    <Fragment>
      <ThisHeader />
      <ThisMain />
      <ThisButtons />
    </Fragment>
  );
};

function ThisHeader(): JSX.Element {
  return (
    <StyledStickyHeader>
      <div className="logo">
        {/* @ts-ignore  */}
        <FaComments fill={constants.appAccentColor} fontSize={"3vw"} />
        <span>One-Chat</span>
      </div>

      <span className="tagline">Best place for One Time Chats</span>
    </StyledStickyHeader>
  );
}

function ThisMain(): JSX.Element {
  return (
    <MainContent>
      <div className="logo">
        <FaComments />
      </div>
      <div className="info">
        <h1 className="company__name">One-Chat</h1>
        <h2>Best place for One Time Chats with anyone in the world</h2>
      </div>
    </MainContent>
  );
}

function ThisButtons(): JSX.Element {
  return (
    <ActionsButtonWrapper>
      <Link href="/create">
        <ActionButton>
          {/* @ts-ignore */}
          Create a room <TiPlus className="plus" />
        </ActionButton>
      </Link>
      <Link href="/join">
        <ActionButton>
          Join a room <FaComments />
        </ActionButton>
      </Link>
      <Link href="/customize">
        <ActionButton>
          Customize <FaBrush />
        </ActionButton>
      </Link>
    </ActionsButtonWrapper>
  );
}
export default memo(MainPage);
