import "./Player.css";
import {Card} from "../Card/Card";

interface Props {
    name: string
}

export const Player = (props: Props) => {
    const {name} = props;
    const cardHeight = 100;

    return (
        <>
            <div className="player">
                <div className="cards">
                    <Card card="Ks" height={cardHeight}/>
                    <Card card="2s" height={cardHeight}/>
                </div>
                <div className="playerName balance avatar">
                    {name}
                </div>
            </div>
        </>
    )
}
