import "./SingleRoom.css";
import {Player} from "../Player/Player";
import {Card} from "../Card/Card";

export const SingleRoom = () => {
    const playerName = "John"
    const cards = ['2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
        '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
        '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
        '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',]

    const cardHeight = 120;
    return (
        <>  <div className="shared-cards">
                <Card card={'2d'} height={cardHeight} />
                <Card card={'2h'} height={cardHeight} />
                <Card card={'7d'} height={cardHeight} />
                <Card card={''} height={cardHeight} />
                <Card card={''} height={cardHeight} />
            </div>
            <div className="container container-p1"><Player name={playerName}/></div>
            <div className="container container-p2"><Player name={playerName}/></div>
            <div className="container container-p3"><Player name={playerName}/></div>
            <div className="container container-p4"><Player name={playerName}/></div>
            <div className="container container-p5"><Player name={playerName}/></div>
            <div className="container container-p6"><Player name={playerName}/></div>
        </>
    )
}
