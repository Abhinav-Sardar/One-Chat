import { useRef, FC as FunctionalComponent } from "react";
import { Page } from "../Styled-components/NotFound";
import io from "socket.io-client";
const CreateRoom: FunctionalComponent = () => {
  return (
    <Page>
      <h1>Create Room</h1>
    </Page>
  );
};
export default CreateRoom;
