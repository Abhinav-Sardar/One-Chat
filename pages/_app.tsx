import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Component } from "../constants/types";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Page: Component = ({ children }) => {
  const router = useRouter();

  return (
    <motion.div
      id='page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      key={router.pathname}
    >
      {children}
    </motion.div>
  );
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
