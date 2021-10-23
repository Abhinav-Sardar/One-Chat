import React, { useState } from "react";

import { DocsPage, Title, TitleButton } from "./Docs.styled";
import { content } from "./DocUtils";

const Docs = () => {
  const currentContentTitle = useState<string>("Getting Started");
  return (
    <>
      <DocsPage>
        <div className='titles'>
          <Title about='2vw' style={{ textAlign: "center" }}>
            Contents
          </Title>
          <div className='btns-wrapper'>
            {content.map((t) => (
              <TitleButton>{t.clientTitle}</TitleButton>
            ))}
          </div>
        </div>
        <div className='currentTitleContent'>Table of Contents</div>
      </DocsPage>
    </>
  );
};

export default Docs;
