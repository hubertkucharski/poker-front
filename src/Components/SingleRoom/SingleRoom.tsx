import "./SingleRoom.css";
import { Player } from "../Player/Player";
import { Card } from "../Card/Card";
import React, { useContext, useEffect } from "react";
import "react-awesome-button/dist/styles.css";
import FunctionalButtons from "../FunctionalButtons/FunctionalButtons";
import { observer } from "mobx-react-lite";
import {
  ActivityStoreContext,
  CurrentState,
  DEFAULT_PLAYER_CARDS,
  DEFAULT_PLAYER_INDEX,
  PlayersFinalResults,
} from "../../stores/activityStore";
import { socketService } from "../../services/socket.service";
import { Cards, changeCardNaming } from "../utils/changeCardNaming";
import { CommonCards } from "../../types/types";
import { AwesomeButton } from "react-awesome-button";

export interface PlayerCards {
  playerIndex: number;
  playerHand: Cards[];
}
// const CARDS = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
//     '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
//     '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
//     '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',];

export const SingleRoom = observer(() => {
  const gameFlow = useContext(ActivityStoreContext);
  const {
    pot,
    playerWon,
    commonCards,
    playerCards,
    playerIndex,
    players,
    checkResult,
    activePlayer,
    setPlayerCards,
    setCommonCards,
    setCurrentState,
  } = gameFlow;

  useEffect(() => {
    const unsubscribe = socketService.onInitGame((response: PlayerCards) => {
      setPlayerCards(response);
    });
    return () => {
      unsubscribe();
    };
  }, [setPlayerCards]);

  useEffect(() => {
    const unsubscribe = socketService.onCurrentGameState(
      (response: CurrentState) => {
        setCurrentState(response);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [setCurrentState, setCommonCards]);

  const getPlayerCards = (player: PlayersFinalResults): CommonCards => {
    if (playerWon !== DEFAULT_PLAYER_INDEX) {
      return player.hand
        ? (changeCardNaming([player.hand]) as CommonCards[])[0]
        : ["back", "back"];
    }
    if (player.playerIndex === playerIndex) {
      return playerCards;
    } else return DEFAULT_PLAYER_CARDS;
  };
  const startNewRound = async (
    e: React.MouseEvent<HTMLButtonElement> & { target: { value: string } }
  ) => {
    e.preventDefault();
    socketService.emitInitNewGame();
  };
  return (
    <>
      <div className="single-room-container">
        <div className="pot">Pot: {pot}</div>
        <div className="common-cards">
          {commonCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
        <div className="result">
          {players.length < 2 && `Wait for at least one more player.`}
          {activePlayer >= 0 && `Waiting for player no. ${activePlayer}.`}
          {playerWon === DEFAULT_PLAYER_INDEX ||
            `Player number ${playerWon} wins${
              checkResult && ", with: "
            }${checkResult}.`}
        </div>
        <article className="players">
          {players.map((player) =>
            player.playerIndex < 0 ? (
              ""
            ) : (
              <div
                key={player.playerIndex}
                className={`container container-p${+player.playerIndex + 1}`}
              >
                <Player player={player} cards={getPlayerCards(player)} />
                {activePlayer < 0 ? (
                  <div className="functional-buttons">
                    <AwesomeButton type="primary" onPress={startNewRound}>
                      Start Game
                    </AwesomeButton>
                  </div>
                ) : (
                  <FunctionalButtons />
                )}
              </div>
            )
          )}
        </article>
      </div>
    </>
  );
});
