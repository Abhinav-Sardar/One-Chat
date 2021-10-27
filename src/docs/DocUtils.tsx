import { FC } from "react";
import { BsDot } from "react-icons/bs";
import { Title, Typography, Wrapper } from "./Docs.styled";
import { constants } from "../Constants";
export type DocTitle = {
  clientTitle: string;
  element?: FC;
};

const GettingStarted: FC = () => {
  return (
    <Wrapper>
      <Wrapper>
        <Title>
          <BsDot />
          Why was this app created?
        </Title>
        <Typography>{constants.docsContent.gettingStarted.why}</Typography>
      </Wrapper>
      <Wrapper>
        <Title>
          <BsDot />
          Privacy
        </Title>
        <Typography>{constants.docsContent.gettingStarted.privacy}</Typography>
      </Wrapper>
    </Wrapper>
  );
};
export const CustomizeColor: FC = () => {
  return <>Customize</>;
};
export const content: DocTitle[] = [
  { clientTitle: "Getting Started", element: GettingStarted },
  { clientTitle: "Customizing Color", element: CustomizeColor },
  { clientTitle: "Creating Rooms", element: GettingStarted },
  { clientTitle: "Joining Rooms", element: GettingStarted },
];
