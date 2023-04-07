import "./SingleRoom.css";
import {Player} from "../Player/Player";
import {Card} from "../Card/Card";
import {useContext, useEffect, useState} from "react";
import 'react-awesome-button/dist/styles.css';
import FunctionalButtons from "../FunctionalButtons/FunctionalButtons";
import {observer} from "mobx-react-lite";
import {ActivityStoreContext} from "../../stores/activityStore";
import {apiUrl} from "../../config/api";
import {io} from "socket.io-client";

const socket = io(`${apiUrl}`);

// const CARDS = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
//     '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
//     '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
//     '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',];

export const SingleRoom = observer(() => {
    const gameFlow = useContext(ActivityStoreContext);
    const {commonCards, playersCards, setPlayerCards} = gameFlow;

    useEffect(() => {
        socket.on('initRound', (response) => {
            setPlayerCards(response);
        });
        return () => {
            socket.off('initRound');
        };
    }, [setPlayerCards]);


    return (
        <>
            <div className="single-room-container">
                <div className="common-cards">
                    {commonCards.map((card, index) =>
                        <Card key={index} card={card}/>
                    )}
                </div>
                {playersCards.map((card, index) =>
                    <div
                        key={index}
                        className={`container container-p${index + 1}`}
                    >
                        <Player name={`Player no. ${index}`} cards={card}/>
                    </div>
                )}
                <FunctionalButtons/>
            </div>
        </>
    )
});
