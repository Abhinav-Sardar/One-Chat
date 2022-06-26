import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Component } from "../constants/types";
const Page: Component = ({ children }) => {
  return <div id='page'>{children}</div>;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
