import "./Player.css";
import {Card} from "../Card/Card";

interface Props {
    name: string,
    cards: string[]
}

export const Player = (props: Props) => {
    const {name, cards} = props;

    return (
        <>
            <div className="player">
                <div className="cards">
                    <Card card={cards[0]} />
                    <Card card={cards[1]} />
                </div>
                <div className="playerName balance avatar">
                    {name}
                </div>
            </div>
        </>
    )
}
