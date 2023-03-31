export interface CardArrayInterface {
    suit: string,
    value: number
}

const changeValueToCardString = (value: number): string => {
    switch (value) {
        case 10:
            return 'T';
        case 11:
            return 'J';
        case 12:
            return 'Q';
        case 13:
            return 'K';
        case 14:
            return 'A';
        default:
            return String(value);
    }
}
//change card naming from object
export const changeCardNaming = (cardArray: CardArrayInterface[][]): string[][] | string[] => {
    const allSimplyCardName: string[][] = [];

    for (let i = 0; i < cardArray.length; i++) {
        const innerArray = cardArray[i];
        let simplyCardName: string[] = [];

        for (let j = 0; j < innerArray.length; j++) {
            const currentCard = innerArray[j];

            switch (currentCard.suit) {
                case 'CLUB':
                    simplyCardName.push(changeValueToCardString(currentCard.value) + 'c');
                    break;
                case 'HEART':
                    simplyCardName.push(changeValueToCardString(currentCard.value) + 'h');
                    break;
                case 'DIAMOND':
                    simplyCardName.push(changeValueToCardString(currentCard.value) + 'd');
                    break;
                case 'SPADE':
                    simplyCardName.push(changeValueToCardString(currentCard.value) + 's');
                    break;
                default:
                    console.log('Not allowed card: ', currentCard);
            }
        }
        allSimplyCardName.push(simplyCardName);
    }
    return allSimplyCardName;
}
