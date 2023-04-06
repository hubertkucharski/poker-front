import React, {useContext} from 'react';
import {AwesomeButton} from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import {CardArrayInterface} from "../utils/changeCardNaming";
import {apiUrl} from "../../config/api";
import {io} from "socket.io-client";
import {observer} from "mobx-react-lite";
import {ActivityStoreContext} from "../../stores/activityStore";

const socket = io(`${apiUrl}`);

const FunctionalButtons = observer(() => {
    const gameFlow = useContext(ActivityStoreContext);

    const startNewRound = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        await gameFlow.startNewRound();
    }
    const endRound = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('flop', {text: 'front text', name: 'nameText'}, () => {
        });
    }
    const updateCards = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        await gameFlow.updateCards();
    }
    const nextRound = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('river', {}, (response: CardArrayInterface[]) => {
            console.log(response);
        });
    }

    return (
        <div className="functional-buttons">
            <AwesomeButton type="secondary" onPress={startNewRound}>
                Start Game
            </AwesomeButton>
            <AwesomeButton type="secondary" onPress={endRound}>
                End Round
            </AwesomeButton>
            <AwesomeButton type="secondary" onPress={updateCards}>
                Update Cards
            </AwesomeButton>
            <AwesomeButton type="secondary" onPress={nextRound}>
                Next Round
            </AwesomeButton>
        </div>
    );
});

export default FunctionalButtons;
