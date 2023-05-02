import React, { useContext } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { observer } from "mobx-react-lite";
import { socketService } from "../../services/socket.service";

import { ActivityStoreContext } from "../../stores/activityStore";
const FunctionalButtons = observer(() => {
  const gameFlow = useContext(ActivityStoreContext);
  const { currentMaxBet, players, playerIndex, activePlayer } = gameFlow;

  const call = async (
    e: React.MouseEvent<HTMLButtonElement> & { target: { value: string } }
  ) => {
    e.preventDefault();
    socketService.emitCall();
  };
  const fold = async (
    e: React.MouseEvent<HTMLButtonElement> & { target: { value: string } }
  ) => {
    e.preventDefault();
    socketService.emitFold();
  };
  const raise = async (
    e: React.MouseEvent<HTMLButtonElement> & { target: { value: number } }
  ) => {
    e.preventDefault();
    socketService.emitRaise(currentMaxBet + 50);
  };
  const activePlayers = players.find(
    (player) => player.playerIndex === playerIndex
  );
  const currentBet = activePlayers ? activePlayers.currentBet : 0;
  return (
    <div className="functional-buttons">
      {/*{activePlayer < 0 ? (*/}
      {/*  <AwesomeButton type="primary" onPress={startNewRound}>*/}
      {/*    Start Game*/}
      {/*  </AwesomeButton>*/}
      {/*) : (*/}
      {playerIndex === activePlayer && (
        <div className="action-buttons">
          <AwesomeButton type="secondary" onPress={fold}>
            Fold
          </AwesomeButton>
          <AwesomeButton type="secondary" onPress={call}>
            {currentMaxBet - currentBet > 0
              ? `Call ${currentMaxBet - currentBet} `
              : "Check"}
          </AwesomeButton>
          <AwesomeButton type="secondary" onPress={raise}>
            {`Raise to ${currentMaxBet + 50}`}
          </AwesomeButton>
        </div>
      )}
    </div>
  );
});

export default FunctionalButtons;
