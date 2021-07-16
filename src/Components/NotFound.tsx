import { FaRegGrimace } from "react-icons/fa";
import { Fragment, FC } from "react";
import { Page } from "../Styled-components/NotFound";

const NotFoundPage: FC = () => {
  return (
    <Page>
      <FaRegGrimace />
      <h1>
        Thats a <big>404!</big>
      </h1>
      <h2>We couldnt find the page you were looking for!</h2>
      <h2>
        If you want to join a room , the room with that name doesnt exist. You
        can make a room by clicking here.
      </h2>
    </Page>
  );
};

export default NotFoundPage;
