import "./SingleRoom.css";
import {Player} from "../Player/Player";
import {Card} from "../Card/Card";
import {useState} from "react";
import AwesomeButtonStyles from "../Buttons/styles/Themes/theme-c137/styles.module.scss";
import {AwesomeButton} from "react-awesome-button";
import {apiUrl} from "../../config/api";
import {changeCardNaming} from "../utils/changeCardNaming";

export const SingleRoom = () => {
    const playerName = "John";
    const cards = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
        '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
        '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
        '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',];

    const [playersCards, setPlayersCards ] = useState<string[][]> ([['','']]);
    const cardHeight = 120;
    let dealedCards: string[][] = [];

    const handleDeal = async (): Promise<string[][]> => {
        const res = await fetch(`${apiUrl}/deck/deal`, {
            // credentials: 'include',
        });
        const data = await res.json();
        setPlayersCards(changeCardNaming(data));
        return dealedCards;
    }
    return (
        <>
            <div className="shared-cards">
                <Card card={''} height={cardHeight}/>
                <Card card={''} height={cardHeight}/>
                <Card card={''} height={cardHeight}/>
                <Card card={''} height={cardHeight}/>
                <Card card={''} height={cardHeight}/>
            </div>
            {playersCards.map((card, index)=>
                <div
                    key={index}
                    className={`container container-p${index+1}`}
                >
                    <Player name={playerName} cards={card}/>
                </div>
            )}

            <div className="functional-buttons">
                <AwesomeButton type="primary" cssModule={AwesomeButtonStyles} onPress={handleDeal}>
                    Deal cards
                </AwesomeButton>
            </div>
            {/*<h1>{playersCards}</h1>*/}
        </>

    )
}
