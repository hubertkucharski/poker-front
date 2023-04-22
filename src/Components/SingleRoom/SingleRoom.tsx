import "./SingleRoom.css";
import { Player } from "../Player/Player";
import { Card } from "../Card/Card";
import { useContext, useEffect } from "react";
import "react-awesome-button/dist/styles.css";
import FunctionalButtons from "../FunctionalButtons/FunctionalButtons";
import { observer } from "mobx-react-lite";
import { ActivityStoreContext, CurrentState, DEFAULT_PLAYER_INDEX } from "../../stores/activityStore";
import { socketService } from "../../services/socket.service";
import { Cards } from "../utils/changeCardNaming";

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
    playersCards,
    playerIndex,
    checkResult,
    setPlayerCards,
    setCommonCards,
    setPlayerIndex,
    setCurrentState,
  } = gameFlow;

  useEffect(() => {
    const unsubscribe = socketService.onJoinGame((playerIndex: number) => {
      console.log(playerIndex);
      setPlayerIndex(playerIndex);
    });
    return () => {
      unsubscribe();
    };
  }, [setPlayerIndex]);

  useEffect(() => {
    const unsubscribe = socketService.onInitGame((response: Cards[]) => {
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

  useEffect(() => {
    const unsubscribe = socketService.onCall((response: CurrentState) => {
      // setCurrentState(response);
    });
    return () => {
      unsubscribe();
    };
  }, [setCommonCards]);

  return (
    <>
      <div className="single-room-container">
        <div className="pot">Pot: {pot}</div>
        <div className="common-cards">
          {commonCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
        {playerWon === DEFAULT_PLAYER_INDEX || (
          <div className="result">{`Player number ${playerWon} won, with ${checkResult.name}.`}</div>
        )}
        <div className={`container container-p${+playerIndex + 1}`}>
          {<Player name={`Player no. ${playerIndex}`} cards={playersCards} />}
        </div>
        <FunctionalButtons />
      </div>
    </>
  );
});
