import { memo } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { FaCheck, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, ButtonsWrapper } from "../Styled-components/Customize.style";

const Buttons = (props: { saved: boolean; handleSave: any }): JSX.Element => {
  return (
    <ButtonsWrapper>
      {props.saved === false ? (
        <Button onClick={props.handleSave}>
          <span>Save</span> <AiOutlineSave />
        </Button>
      ) : (
        <Button>
          <span>Saved</span> <FaCheck className="check" />
        </Button>
      )}
      <Link to="/">
        <Button>
          <span>Back To Home</span> <FaHome />
        </Button>
      </Link>
    </ButtonsWrapper>
  );
};

export default memo(Buttons);
