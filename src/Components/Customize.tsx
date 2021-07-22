import { FC, Fragment, memo } from "react";
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
import { useEffect } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Buttons from "./Customized.Buttons";

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

  return (
    <CustomizePage
      // @ts-ignore
      bgcolor={color}
    >
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
      <HexColorPicker
        color={color}
        onChange={(newColor) => setColor(newColor)}
      />
      <h2>Color:{color}</h2>
      <Buttons saved={saved} handleSave={handleSave} />
    </CustomizePage>
  );
};

export default memo(Customize);
