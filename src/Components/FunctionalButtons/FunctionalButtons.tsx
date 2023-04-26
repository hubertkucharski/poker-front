import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import { observer } from "mobx-react-lite";
import { socketService } from "../../services/socket.service";

const FunctionalButtons = observer(() => {
  const startNewRound = async (
    e: React.MouseEvent<HTMLButtonElement> & { target: { value: string } }
  ) => {
    e.preventDefault();
    socketService.emitInitNewGame();
  };
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

  return (
    <div className="functional-buttons">
      <AwesomeButton type="primary" onPress={startNewRound}>
        Start Game
      </AwesomeButton>
      <AwesomeButton type="secondary" onPress={call}>
        Call
      </AwesomeButton>
      <AwesomeButton type="secondary" onPress={fold}>
        Fold
      </AwesomeButton>
    </div>
  );
});

export default FunctionalButtons;
