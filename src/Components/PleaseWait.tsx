import { FC } from "react";
import { constants } from "../Constants";
import { FaSpinner } from "react-icons/fa";
import { FadedAnimationWrapper } from "./Chat.SubComponents";
const PleaseWait: FC = () => {
  return (
    //@ts-ignore
    <FadedAnimationWrapper>
      {/* @ts-ignore */}
      <div className='page' style={constants.pleaseWaitPageStyles}>
        <h1
          style={{
            color: constants.appAccentColor,
            fontFamily: '"Poppins" , sans-serif',
            fontSize: "4vw",
            margin: "3vw 0 ",
          }}
        >
          One Moment ...
        </h1>
        <br />
        <br />
        <FaSpinner
          style={{
            color: constants.appAccentColor,
            fontSize: "7vw",
            animation: "2s spin linear infinite",
          }}
        />
      </div>
    </FadedAnimationWrapper>
  );
};

export default PleaseWait;
