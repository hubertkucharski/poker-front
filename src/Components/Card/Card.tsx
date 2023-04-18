import tc2c from "../../assets/deckCards/2C.svg";
import tc3c from "../../assets/deckCards/3C.svg";
import tc4c from "../../assets/deckCards/4C.svg";
import tc5c from "../../assets/deckCards/5C.svg";
import tc6c from "../../assets/deckCards/6C.svg";
import tc7c from "../../assets/deckCards/7C.svg";
import tc8c from "../../assets/deckCards/8C.svg";
import tc9c from "../../assets/deckCards/9C.svg";
import tcTc from "../../assets/deckCards/TC.svg";
import tcJc from "../../assets/deckCards/JC.svg";
import tcQc from "../../assets/deckCards/QC.svg";
import tcKc from "../../assets/deckCards/KC.svg";
import tcAc from "../../assets/deckCards/AC.svg";

import tc2d from "../../assets/deckCards/2D.svg";
import tc3d from "../../assets/deckCards/3D.svg";
import tc4d from "../../assets/deckCards/4D.svg";
import tc5d from "../../assets/deckCards/5D.svg";
import tc6d from "../../assets/deckCards/6D.svg";
import tc7d from "../../assets/deckCards/7D.svg";
import tc8d from "../../assets/deckCards/8D.svg";
import tc9d from "../../assets/deckCards/9D.svg";
import tcTd from "../../assets/deckCards/TD.svg";
import tcJd from "../../assets/deckCards/JD.svg";
import tcQd from "../../assets/deckCards/QD.svg";
import tcKd from "../../assets/deckCards/KD.svg";
import tcAd from "../../assets/deckCards/AD.svg";

import tc2h from "../../assets/deckCards/2H.svg";
import tc3h from "../../assets/deckCards/3H.svg";
import tc4h from "../../assets/deckCards/4H.svg";
import tc5h from "../../assets/deckCards/5H.svg";
import tc6h from "../../assets/deckCards/6H.svg";
import tc7h from "../../assets/deckCards/7H.svg";
import tc8h from "../../assets/deckCards/8H.svg";
import tc9h from "../../assets/deckCards/9H.svg";
import tcTh from "../../assets/deckCards/TH.svg";
import tcJh from "../../assets/deckCards/JH.svg";
import tcQh from "../../assets/deckCards/QH.svg";
import tcKh from "../../assets/deckCards/KH.svg";
import tcAh from "../../assets/deckCards/AH.svg";

import tc2s from "../../assets/deckCards/2S.svg";
import tc3s from "../../assets/deckCards/3S.svg";
import tc4s from "../../assets/deckCards/4S.svg";
import tc5s from "../../assets/deckCards/5S.svg";
import tc6s from "../../assets/deckCards/6S.svg";
import tc7s from "../../assets/deckCards/7S.svg";
import tc8s from "../../assets/deckCards/8S.svg";
import tc9s from "../../assets/deckCards/9S.svg";
import tcTs from "../../assets/deckCards/TS.svg";
import tcJs from "../../assets/deckCards/JS.svg";
import tcQs from "../../assets/deckCards/QS.svg";
import tcKs from "../../assets/deckCards/KS.svg";
import tcAs from "../../assets/deckCards/AS.svg";

import back from "../../assets/deckCards/back.svg";
import blank from "../../assets/deckCards/blank.svg";
import "./Card.css";

interface CardValues {
  [key: string]: string;
}
interface Props {
  card: string;
}

const CARDS: CardValues = {
    '2c': tc2c,
    '3c': tc3c,
    '4c': tc4c,
    '5c': tc5c,
    '6c': tc6c,
    '7c': tc7c,
    '8c': tc8c,
    '9c': tc9c,
    'Tc': tcTc,
    'Jc': tcJc,
    'Qc': tcQc,
    'Kc': tcKc,
    'Ac': tcAc,

    '2d': tc2d,
    '3d': tc3d,
    '4d': tc4d,
    '5d': tc5d,
    '6d': tc6d,
    '7d': tc7d,
    '8d': tc8d,
    '9d': tc9d,
    'Td': tcTd,
    'Jd': tcJd,
    'Qd': tcQd,
    'Kd': tcKd,
    'Ad': tcAd,

    '2h': tc2h,
    '3h': tc3h,
    '4h': tc4h,
    '5h': tc5h,
    '6h': tc6h,
    '7h': tc7h,
    '8h': tc8h,
    '9h': tc9h,
    'Th': tcTh,
    'Jh': tcJh,
    'Qh': tcQh,
    'Kh': tcKh,
    'Ah': tcAh,

    '2s': tc2s,
    '3s': tc3s,
    '4s': tc4s,
    '5s': tc5s,
    '6s': tc6s,
    '7s': tc7s,
    '8s': tc8s,
    '9s': tc9s,
    'Ts': tcTs,
    'Js': tcJs,
    'Qs': tcQs,
    'Ks': tcKs,
    'As': tcAs,

    'back': back,
    '': blank,
}

export const Card = (props: Props) => {
  const { card } = props;

  return (
    <img src={CARDS[card]} className={`playing-card ${card}`} alt={card} />
  );
};
