import "../globals.css";
import type { AppProps } from "next/app";
import { PageWrapper, Toasts } from "../constants/Components";
import { ReplyStateProvider, ToastProvider, UserContextProvider } from "../constants/Context";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ToastProvider>
      <UserContextProvider>
        <PageWrapper key={router.route}>
          <ReplyStateProvider>
            <Component {...pageProps} />
          </ReplyStateProvider>
          <Toasts />
        </PageWrapper>
      </UserContextProvider>
    </ToastProvider>
  );
}

export default MyApp;
