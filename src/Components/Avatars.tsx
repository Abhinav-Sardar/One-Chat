import parse from "html-react-parser";
import { Dispatch, FC, memo, SetStateAction } from "react";
import { getRandomKey } from "../Constants";
type voidFunc = () => void;
const Avatars: FC<{
  avatars: string[];
  setCurrentAvatar: Dispatch<SetStateAction<string>>;
  currentAvatar: string;
}> = memo(({ avatars, setCurrentAvatar, currentAvatar }) => {
  return (
    <>
      {avatars.map((avatar) => {
        if (currentAvatar === avatar) {
          return (
            <div className='current' key={getRandomKey()}>
              {parse(avatar)}
            </div>
          );
        } else {
          return (
            //@ts-ignore
            <div onClick={() => setCurrentAvatar(avatar)} key={getRandomKey()}>
              {parse(avatar)}
            </div>
          );
        }
      })}
    </>
  );
});

export default Avatars;
