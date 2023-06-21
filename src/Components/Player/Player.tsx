import "./Player.css";
import { Card } from "../Card/Card";
import { CommonCards } from "../../types/types";
import { PlayersFinalResults } from "../../stores/activityStore";
import { useSpring, a } from "react-spring";
import { useState } from "react";
import "./Player.css";

interface Props {
  player: PlayersFinalResults;
  cards: CommonCards;
}

export const Player = (props: Props) => {
  const { cards, player } = props;
  const [flipped, set] = useState(false);
  // const [cardToFlip, setCardToFlip] = useState<any>(0);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  // const handleClick = () => {
  //   api.start({
  //     from: {
  //       x: 0,
  //     },
  //     to: {
  //       x: 100,
  //     },
  //   });
  // };
  //on card click change value cards[0] to for example "Ks" flip

  // const showCard = (): any => {
  //   // if (cardToFlip !== "") {
  //   setTimeout(() => {
  //     console.log("flipped");
  //     setCardToFlip("Ks");
  //   }, 1000);
  //   // }
  //   // return flipped ? cardToFlip : "";
  // };
  const showCard = () => setTimeout(() => console.log("uap"), 1000);
  return (
    <>
      <div className="player">
        <div className="cards">
          {/*<a.div*/}
          {/*  className="card"*/}
          {/*  onClick={() => {*/}
          {/*    set((state) => !state);*/}
          {/*    // showCard();*/}
          {/*  }}*/}
          {/*  // className={`${styles.cards} ${styles.front}`}*/}
          {/*  style={{*/}
          {/*    // opacity: opacity.to((o) => 1 - o),*/}
          {/*    transform,*/}
          {/*    // display: "flex",*/}
          {/*  }}*/}
          {/*>*/}
          {/*<Card card={flipped ? cards[0] : "Ks"} />*/}
          {/*{cardToFlip !== undefined ? (*/}
          {/*  <Card card={cards[cardToFlip]} />*/}
          {/*) : (*/}
          {/*  <Card card={cards[0]} />*/}
          {/*)}*/}
          {/*{flipped ? showCard(cards[0]) : showCard("Ks")}*/}
          {/*<Card card={cards[1]} />*/}
          {/*</a.div>*/}
          <a.div
            className="card"
            onClick={() => set((state) => !state)}
            // style={{
            //   position: "absolute",
            //   top: 0,
            //   left: 0,
            //   width: "100%",
            //   height: "100%",
            //   opacity,
            //   transform,
            //   rotateX: "180deg",
            // }}
            style={{
              // opacity: opacity.to((o) => 1 - o),
              transform,
            }}
          >
            <Card card={flipped ? cards[1] : "2d"} />
          </a.div>
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
