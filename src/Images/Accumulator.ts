import Car from "./Car.png";
import Fox from "./Fox.png";
import GreenApple from "./GreenApple.png";
import Heart from "./Heart.png";
import Smile from "./Smile.png";
//@ts-ignore
import ForeignPop from "../Sounds/ForeignPop.mp3";
//@ts-ignore
import PopSound from "../Sounds/Pop Sound 🎉.mp3";
//@ts-ignore
import Kick from "../Sounds/Kick.mp3";

const obj = {
  car: {
    src: Car,
    alt: "🚗",
  },
  fox: {
    src: Fox,
    alt: "🦊",
  },
  apple: {
    src: GreenApple,
    alt: "🍏",
  },
  heart: {
    src: Heart,
    alt: "💘",
  },
  smile: {
    src: Smile,
    alt: "😃",
  },
};

export default obj;
export const Pop = new Audio(PopSound);
export const ForeignMessagePop = new Audio(ForeignPop);
export const KickSound = new Audio(Kick);
