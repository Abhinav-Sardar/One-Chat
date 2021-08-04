import { FaRegGrimace } from "react-icons/fa";
import { Fragment, FC } from "react";
import { Page } from "../Styled-components/NotFound.styled";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
interface Props {
  isRoomError: boolean;
}
//@ts-ignore
const NotFoundPage: FC<Props> = (props) => {
  //@ts-ignore
  const { roomId } = useParams();
  return (
    <>{props.isRoomError ? <RoomError id={roomId} /> : <NonRoomError />}</>
  );
};

export default NotFoundPage;

const NonRoomError: FC = () => {
  return (
    <Page>
      <FaRegGrimace />
      <h1>
        Thats a <big>404!</big>
      </h1>
      <h2>We couldnt find the page you were looking for!</h2>
    </Page>
  );
};

const RoomError: FC<{ id: string }> = (props) => {
  return (
    <Page>
      <FaRegGrimace />
      <h1>
        Thats a <big>404!</big>
      </h1>
      <h2>
        A room with the name {props.id} doesnt exist.If you want to create a
        room , click{" "}
        <Link to="/create" style={{ color: "blue" }}>
          here
        </Link>
      </h2>
    </Page>
  );
};
