import {action, observable, makeAutoObservable} from "mobx";
import { createContext } from "react";
import {io} from "socket.io-client";
import {CardArrayInterface, changeCardNaming} from "../Components/utils/changeCardNaming";
import {apiUrl} from "../config/api";
const socket = io(`${apiUrl}`);

export class ActivityStore{
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }
    @observable commonCards = ['', '', '', '', ''];
    @observable playersCards: string[][] = [['','']];

    @action setCommonCards(newCards: string[]){
        this.commonCards = newCards;
    }
    @action setPlayerCards(newPlayersCards: any[]){
        this.playersCards = changeCardNaming(newPlayersCards) as string[][];
    }

    @action updateCards = async () => {
        socket.emit('turn', {}, (response: CardArrayInterface[]) => {
            const newCommonCards = changeCardNaming([response]);
            this.commonCards = newCommonCards[0] as string[];

        });
    }
    @action startNewRound = async () => {
        socket.emit('createGameFlow', {text: 'front text', name: 'nameText'}, (response: any) => {
        });
    }

}
export const ActivityStoreContext = createContext(new ActivityStore())
