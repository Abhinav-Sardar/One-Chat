import App from "./App";
import { GlobalStyles } from "./Styled-components/GlobalStyles";
import ReactDom from "react-dom";
import { ToggleFullScreen } from "./Components/Chat.SubComponents";
const root = document.getElementById("root");
ReactDom.render(
  <>
    <GlobalStyles />
    <App />
    <ToggleFullScreen />
  </>,
  root
);
