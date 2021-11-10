import { FC, memo, useState } from "react";
import { FadedAnimationWrapper } from "./Chat.SubComponents";

import { constants, getRandomKey, room } from "../Constants";

import {
  PrimaryTitle,
  PubPage,
  Room,
} from "../Styled-components/PublicRooms.styled";
import { FaEye, FaHome, FaSearch, FaTimes } from "react-icons/fa";
import { Button } from "../Styled-components/Customize.style";
import { IoChatboxSharp } from "react-icons/io5";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
const PublicRooms: FC = () => {
  const navigate = useNavigate();
  const [text, setText] = useState<string>("");
  const { data } = useQuery(
    "public-rooms",
    () => constants.fetcher(`${constants.serverName}rooms`, false),
    { ...constants.queryConfig, refetchInterval: 1000 }
  );
  document.body.style.background = "white";

  //@ts-ignore
  document.querySelector("#root")!.style.background = "white";

  return (
    <FadedAnimationWrapper>
      <PubPage>
        <PrimaryTitle>
          <span>Public Rooms</span>
          <FaEye />
        </PrimaryTitle>

        <Button onClick={() => navigate("/")}>
          <span>Back To Home</span>
          <FaHome />
        </Button>
        <div className='search'>
          <FaSearch />

          <input
            type='text'
            placeholder='Search For Rooms'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        {data?.length === 0 ? (
          <PrimaryTitle
            style={{
              marginTop: "10vw",
            }}
          >
            <span
              style={{
                color: "red",
              }}
            >
              No Public Rooms Found !
            </span>
            <FaTimes
              style={{
                color: "red",
              }}
            />
          </PrimaryTitle>
        ) : (
          <Rooms text={text} rooms={data} />
        )}
      </PubPage>
    </FadedAnimationWrapper>
  );
};

const Rooms: FC<{ rooms: room[]; text: string }> = memo(({ rooms, text }) => {
  const filteredRooms = rooms?.filter((r) =>
    r.name.toLowerCase().trim().includes(text.trim().toLowerCase())
  );
  const navigate = useNavigate();
  return (
    <>
      {filteredRooms?.length === 0 ? (
        <PrimaryTitle
          style={{
            marginTop: "10vw",
          }}
        >
          <span
            style={{
              color: "red",
            }}
          >
            No Public Rooms Found !
          </span>
          <FaTimes
            style={{
              color: "red",
            }}
          />
        </PrimaryTitle>
      ) : (
        filteredRooms?.map((r) => (
          <Room key={getRandomKey()}>
            <div
              className='roomName'
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                border: 0,
              }}
            >
              Room Name : {r.name}
            </div>
            <div className='mems'>No. of people : {r.membersLength}</div>
            <div
              className='join'
              style={{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                border: 0,
              }}
            >
              <Button onClick={() => navigate(`/room/${r.name}`)}>
                <span>Join {r.name}</span>
                <IoChatboxSharp />
              </Button>
            </div>
          </Room>
        ))
      )}
    </>
  );
});
export default PublicRooms;
