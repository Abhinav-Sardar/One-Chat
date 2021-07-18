import { FaRegGrimace } from "react-icons/fa";
import { Fragment, FC } from "react";
import { Page } from "../Styled-components/NotFound.styled";
import { Link } from "react-router-dom";
interface Props {
  isRoomError: boolean;
}
//@ts-ignore
const NotFoundPage: FC<Props> = (props) => {
  if (!props.isRoomError) {
    return (
      <Page>
        <FaRegGrimace />
        <h1>
          Thats a <big>404!</big>
        </h1>
        <h2>We couldnt find the page you were looking for!</h2>
        <h2>
          If you want to join a room , the room with that name doesnt exist. You
          can make a room by clicking{" "}
          <Link to="/create" style={{ color: "blue" }}>
            here
          </Link>
          .
        </h2>
      </Page>
    );
  }
};

export default NotFoundPage;
