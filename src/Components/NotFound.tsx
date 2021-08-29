import { FaRegGrimace } from "react-icons/fa";
import { FC } from "react";
import { Page } from "../Styled-components/NotFound.styled";

//@ts-ignore
const NotFoundPage: FC = () => {
  //@ts-ignore

  return (
    <Page>
      <FaRegGrimace />
      <h1>
        Thats a <big>404!</big>
      </h1>
      <h2>We couldn't find the page you were looking for!</h2>
    </Page>
  );
};

export default NotFoundPage;
