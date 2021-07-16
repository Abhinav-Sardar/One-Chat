import App from "./App";
import { GlobalStyles } from "./Styled-components/GlobalStyles";
import ReactDom from "react-dom";
const root = document.getElementById("root");
ReactDom.render(
  <>
    <GlobalStyles />
    <App />
  </>,
  root
);
