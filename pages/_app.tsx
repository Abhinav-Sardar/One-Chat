import "../globals.css";
import type { AppProps } from "next/app";
import { PageWrapper, Toasts } from "../constants/Components";
import { ToastProvider, UserContextProvider } from "../constants/Context";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ToastProvider>
      <UserContextProvider>
        <PageWrapper key={router.route}>
          <Component {...pageProps} />
          <Toasts />
        </PageWrapper>
      </UserContextProvider>
    </ToastProvider>
  );
}

export default MyApp;
