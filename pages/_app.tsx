import "../globals.css";
import type { AppProps } from "next/app";
import { PageWrapper } from "../constants/Components";
import { UserContextProvider } from "../constants/Context";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <UserContextProvider>
      <PageWrapper key={router.route}>
        <Component {...pageProps} />
      </PageWrapper>
    </UserContextProvider>
  );
}

export default MyApp;
