import "./Player.css";
import { Card } from "../Card/Card";
import { CommonCards } from "../../types/types";

interface Props {
  name: string;
  cards: CommonCards;
}

export const Player = (props: Props) => {
  const { name, cards } = props;

  return (
    <>
      <div className="player">
        <div className="cards">
          <Card card={cards[0][0]} />
          <Card card={cards[0][1]} />
        </div>
        <div className="playerName balance avatar">{name}</div>
      </div>
    </>
  );
};
