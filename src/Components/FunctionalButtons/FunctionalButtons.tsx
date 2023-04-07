import React from 'react';
import {AwesomeButton} from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import {observer} from "mobx-react-lite";
import {socketService} from "../../services/socket.service";

const FunctionalButtons = observer(() => {

    const startNewRound = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socketService.emitInitNewGame();
    }
    const endRound = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socketService.emitEndRound();
    }

    return (
        <div className="functional-buttons">
            <AwesomeButton type="secondary" onPress={startNewRound}>
                Start Game
            </AwesomeButton>
            <AwesomeButton type="secondary" onPress={endRound}>
                End Round
            </AwesomeButton>
        </div>
    );
});

export default FunctionalButtons;
