import "./Player.css";
import { Card } from "../Card/Card";
import { CommonCards } from "../../types/types";
import { PlayersFinalResults } from "../../stores/activityStore";

interface Props {
  player: PlayersFinalResults;
  cards: CommonCards;
}

export const Player = (props: Props) => {
  const { cards, player } = props;

  return (
    <>
      <div className="player">
        <div className="cards">
          <Card card={cards[0]} />
          <Card card={cards[1]} />
        </div>
        <p className="playerName">Player no. {player.playerIndex}</p>
        <p className="currentBalance">Balance: {player.balance}</p>
        {player.currentBet > 0 && (
          <p className="bet">Bet: {player.currentBet}</p>
        )}
      </div>
    </>
  );
};
