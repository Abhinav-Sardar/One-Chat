import { execSync } from "child_process";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaHome, FaTimes, FaWind } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { constants, getRandomKey } from "../Constants";
import { Button } from "../Styled-components/Customize.style";
import { Page, FaqTitle } from "../Styled-components/Faqs.styled";
import { PrimaryTitle } from "../Styled-components/PublicRooms.styled";
import { FadedAnimationWrapper } from "./Chat.SubComponents";
const Faqs: FC = () => {
  const [faqData, setFaqData] = useState([
    {
      title: "Does One-Chat store my chats somewhere ?",
      content:
        "No, chats are not stored anywhere. They get deleted automatically when all the people in a particular room leave.That is what we mean by One-Time chats.",
      isOpen: false,
    },
    {
      title: "How to join rooms ?",
      content:
        "There are two main ways of joining rooms. 1. By clicking on the Join Room button on the homepage and filling necessary information. 2. By pasting a share url of the room which can be obtained by anyone who is in the room. An example url: https://one-chat-v2.netlify.app/room/name-of-the-room",
      isOpen: false,
    },
    {
      title: "Is One-Chat safe ?",
      content:
        "Yes, One-Chat is safe. Safety and privacy was given immense importance during the developmment of the app. Messages are encrypted for safety and you can also create private rooms that won't be publicly displayed to other users.",
      isOpen: false,
    },
    {
      isOpen: false,
      title: "How to change my accent color",
      content:
        "Click on the 'Customize' button on the homepage, select the preferred color and click on save.",
    },
    {
      isOpen: false,
      title: "How to kick people in a room ?",
      content:
        "1. Click on the users button and click on the kick icon. 2. Type a reason for kicking the user and click on kick.",
    },
    {
      isOpen: false,
      title: "How to be a host ?",
      content:
        "Hosts are usually the ones who create the room. However, when a host leaves a room, the first person who joined the room after the room is made the new host.",
    },
  ]);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.background = "#fff";
    document.getElementById("root").style.background = "#fff";
    document.title = "FAQs";
  }, []);
  return (
    <FadedAnimationWrapper>
      <Page>
        <PrimaryTitle>
          <span>FAQs</span>
          <BsQuestionCircleFill />
        </PrimaryTitle>
        <PrimaryTitle>
          <span
            style={{
              fontSize: "2vw",
            }}
          >
            Here are some frequently asked questions
          </span>
        </PrimaryTitle>
        <Button
          style={{
            height: "6vh !important",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <span>Back To Home</span>
          <FaHome />
        </Button>
        <div className='faqs'>
          {faqData.map(({ content, title, isOpen }) => (
            <Faq
              title={title}
              content={content}
              setFaqData={setFaqData}
              isOpen={isOpen}
              key={getRandomKey()}
            />
          ))}
        </div>
      </Page>
    </FadedAnimationWrapper>
  );
};

export default Faqs;

const Faq: FC<{
  title: string;
  content: string;
  setFaqData: any;
  isOpen: boolean;
}> = ({ title, content, setFaqData, isOpen }) => {
  const handleFaqChange = () => {
    setFaqData((prev: any[]) => {
      const exisitngFaqs = [...prev];
      const currentOpenFaq = exisitngFaqs.find((faq: any) => faq.isOpen);
      const currentFaq = exisitngFaqs.find((faq: any) => faq.title === title);
      if (currentOpenFaq) {
        if (currentOpenFaq === currentFaq) {
          currentFaq.isOpen = false;
        } else {
          currentOpenFaq.isOpen = false;
          currentFaq.isOpen = true;
          setTimeout(() => {
            document.getElementById(title).scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 600);
        }
      } else {
        currentFaq.isOpen = true;
        setTimeout(() => {
          document.getElementById(title).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 600);
      }
      return exisitngFaqs;
    });
  };
  const contentVariants = {
    initial: {
      opacity: 0,
      height: 0,
      border: 0,
    },
    animate: {
      opacity: 1,
      height: "30vh",
      border: "1px solid black",
      transition: {
        duration: 0.5,
        type: "tween",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      border: 0,
      transition: {
        duration: 0.5,
        type: "tween",
        delay: 1,
      },
    },
  };
  return (
    <div id={title}>
      <FaqTitle onClick={handleFaqChange}>
        <span>{title}</span>
        <motion.i
          className='fas fa-times'
          animate={{
            rotate: isOpen ? "45deg" : "0deg",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
          }}
        />
      </FaqTitle>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='faq-content'
          >
            <span> {content}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
