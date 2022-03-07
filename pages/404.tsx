import { NextPage } from "next";
import Head from "next/head";
import { FaBan } from "react-icons/fa";
import { AccentText } from "../constants/Components";
const NoutFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>404! This page was not found!</title>
      </Head>
      <style jsx>
        {`
          .page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
        `}
      </style>
      <div className='page'>
        <FaBan className='icon' fill={"#bd14ca"} fontSize={"7rem"} />
        <AccentText
          inverted={false}
          style={{
            fontWeight: 500,
            fontSize: "3rem",
          }}
        >
          This page was not found !
        </AccentText>
      </div>
    </>
  );
};
export default NoutFound;
