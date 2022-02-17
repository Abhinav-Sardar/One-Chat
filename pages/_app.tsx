import "../globals.css";
import type { AppProps } from "next/app";
import { PageWrapper } from "../constants/Components";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PageWrapper key={router.route}>
      <Component {...pageProps} />
    </PageWrapper>
  );
}

export default MyApp;
