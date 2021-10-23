import { FC } from "react";
type DocTitle = {
  clientTitle: string;
  element?: FC;
};

const GettingStarted: FC = () => {
  return <>Getting Started</>;
};

export const content: DocTitle[] = [
  { clientTitle: "Getting Started", element: GettingStarted },
  { clientTitle: "Getting Started", element: GettingStarted },
  { clientTitle: "Getting Started", element: GettingStarted },
  { clientTitle: "Getting Started", element: GettingStarted },
];
