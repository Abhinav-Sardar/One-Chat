import { constants } from "../Constants";
import { useEffect, useState, FC } from "react";
import { BsDot } from "react-icons/bs";
import { IoChatboxSharp } from "react-icons/io5";
import { DocsPage, Title, TitleButton } from "./Docs.styled";
import { content, DocTitle } from "./DocUtils";

import { FadedAnimationWrapper } from "../Components/Chat.SubComponents";
import { useHistory } from "react-router";

const Docs = () => {
  const history = useHistory();
  const [currentTitle, setCurrentTitle] = useState<string>("Getting Started");
  const [currentContent, setCurrentContent] = useState<FC>(content[0].element);
  useEffect(() => {
    const currentElement = document.getElementById(currentTitle);
    if (!currentElement) return;
    else {
      if (currentElement.classList.contains("current")) return;
      else currentElement.classList.add("current");
    }
  });
  useEffect(() => {
    const theContent = content.find(
      (e) => e.clientTitle === currentTitle
    ).element;
    setCurrentContent(theContent);
  }, [currentTitle]);
  const handleResourceChange = (t: DocTitle) => {
    if (currentTitle === t.clientTitle) return;
    else {
      const el = document.querySelector(".current");
      el.classList.remove("current");
      setCurrentTitle(t.clientTitle);
    }
  };
  document.title = "One-Chat Documentation";
  return (
    <FadedAnimationWrapper>
      <DocsPage>
        <div className='titles' onClick={() => history.push("/")}>
          <div className='header'>
            <IoChatboxSharp fill={constants.appAccentColor} fontSize={"3vw"} />
            <span>One-Chat</span>
          </div>
          <div className='btns-wrapper'>
            {content.map((t) => (
              <TitleButton
                id={t.clientTitle}
                onClick={() => handleResourceChange(t)}
              >
                <BsDot />
                <span>{t.clientTitle}</span>
              </TitleButton>
            ))}
          </div>
        </div>
        <div className='currentTitleContent'>{currentContent}</div>
      </DocsPage>
    </FadedAnimationWrapper>
  );
};

export default Docs;
