import { FC, Fragment, memo, useEffect } from "react";
import {
  Button,
  ButtonsWrapper,
  CustomizePage,
  Title,
} from "../Styled-components/Customize.style";
import { FaHome } from "react-icons/fa";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { constants } from "../Constants";

import { AiOutlineSave } from "react-icons/ai";
import { FaCheck, FaLightbulb } from "react-icons/fa";
import { useSpring } from "react-spring";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

const Customize: FC = () => {
  const [color, setColor] = useState<string>(constants.appAccentColor);

  const [saved, setSaved] = useState<boolean>(false);

  function handleSave() {
    setSaved(!saved);
    localStorage.setItem("one-chat-accent-color", color);
    setTimeout(() => {
      setSaved(false);
    }, 1000);
  }
  const bgColorChanger = useSpring({
    background: color,
  });
  useEffect(() => {
    document.title = "Customize";
  }, []);
  return (
    <CustomizePage style={bgColorChanger}>
      <Title>Customize</Title>
      <hr
        style={{
          width: "30vw",
          color: "white",
          height: "0.5vw",
          border: "0",
          backgroundColor: "white",
        }}
      />
      <div className='note'>
        <FaLightbulb /> A lighter color is recommended.
      </div>
      <HexColorPicker
        color={color}
        onChange={(newColor) => setColor(newColor)}
      />
      <h2>Color:{color}</h2>
      <ButtonsWrapper>
        {saved === false ? (
          <Button
            onClick={handleSave}
            style={{
              cursor: "default",
            }}
          >
            <span>Save</span> <AiOutlineSave />
          </Button>
        ) : (
          <Button
            style={{
              cursor: "not-allowed",
            }}
          >
            <span>Saved</span> <FaCheck className='check' />
          </Button>
        )}

        <Button onClick={() => window.location.assign("/")}>
          <span>Back To Home</span> <FaHome />
        </Button>
      </ButtonsWrapper>
    </CustomizePage>
  );
};

export default memo(Customize);
