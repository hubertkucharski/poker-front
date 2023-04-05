import "./SingleRoom.css";
import {Player} from "../Player/Player";
import {Card} from "../Card/Card";
import {useEffect, useState} from "react";
import 'react-awesome-button/dist/styles.css';
import {AwesomeButton} from "react-awesome-button";
import {apiUrl} from "../../config/api";
import {CardArrayInterface, changeCardNaming} from "../utils/changeCardNaming";
import {io} from "socket.io-client";

const socket = io(`${apiUrl}`);

const PLAYER_NAME = "John";
export function useFetchCommonCardsFromServer() {
    useEffect(() => {
        socket.emit('turn', {}, (response: CardArrayInterface[]) => {
            console.log(response)
        });

        return () => {
            socket.off('turn');
        }
    },[]);
 }

//    const CARDS = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
//        '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
//        '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
//       '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',];

export const SingleRoom = () => {

    const [playersCards, setPlayersCards] = useState<string[][]>([['', '']]);
    const [commonCards, setCommonCards] = useState<string[]>(['', '', '', '', '']);

    useFetchCommonCardsFromServer();

    const handleCommonCards = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('createGameFlow', {text: 'front text', name: 'nameText'}, () => {
        });
    }
    const handleFlop = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('flop', {text: 'front text', name: 'nameText'}, () => {
        });
    }
    const handleTurn = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('turn', {}, (response: CardArrayInterface[]) => {
            const newCommonCards = changeCardNaming([response]);
            setCommonCards(newCommonCards[0] as string[]);
        });
    }
    const handleRiver = async (e: React.MouseEvent<HTMLButtonElement> & { target: { value: string; }; }) => {
        e.preventDefault();
        socket.emit('river', {}, (response: CardArrayInterface[]) => {
            console.log(response)
        });
    }
    const dealCardsToPlayers = async () => {
        const playerCards = await fetchPlayerCards();
        setPlayersCards(changeCardNaming(data) as string[][]);
     }

    return (
        <>
        <div className="single-room-container">
            <div className="common-cards">
                {commonCards.map((card, index) =>
                    <Card key={index} card={card} height={cardHeight}/>
                )}
            </div>
            {playersCards.map((card, index) =>
                <div
                    key={index}
                    className={`container container-p${index + 1}`}
                >
                    <Player name={playerName} cards={card}/>
                </div>
            )}

            <div className="functional-buttons">
                <AwesomeButton type="primary" cssModule={AwesomeButtonStyles} onPress={handleDeal}>
                    Deal Cards
                </AwesomeButton>
                <AwesomeButton type="secondary" cssModule={AwesomeButtonStyles} onPress={handleCommonCards}>
                    Start Game
                </AwesomeButton>
                <AwesomeButton type="secondary" cssModule={AwesomeButtonStyles} onPress={handleFlop}>
                    End Round
                </AwesomeButton>
                <AwesomeButton type="secondary" cssModule={AwesomeButtonStyles} onPress={handleTurn}>
                    Update Cards
                </AwesomeButton>
                <AwesomeButton type="secondary" cssModule={AwesomeButtonStyles} onPress={handleRiver}>
                    Next Round
                </AwesomeButton>
            </div>
            </div>
        </>

    )
}
