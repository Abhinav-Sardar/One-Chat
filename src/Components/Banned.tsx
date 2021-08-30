import { FC } from "react";
import { FaRegSadCry, FaHome } from "react-icons/fa";
import { IoBan } from "react-icons/io5";
import { constants } from "../Constants";
import { Button } from "../Styled-components/Customize.style";
import { GiHighKick } from "react-icons/gi";
import { useHistory } from "react-router";
const Banned: FC = () => {
  document.title = "You have been kicked";
  const history = useHistory();
  return (
    <>
      <div
        className='ban__wrapper'
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <GiHighKick
          style={{
            color: constants.appAccentColor,
            fontSize: "13vw",
            margin: "3vw 0",
          }}
        />
        <h2
          style={{
            fontFamily: '"Poppins" , sans-serif',
            fontSize: "3vw",
          }}
        >
          You have been kicked from the room.
        </h2>
        <Button onClick={() => history.push("/")}>
          <span>Go back to home</span>
          <FaHome />
        </Button>
      </div>
    </>
  );
};

export default Banned;
