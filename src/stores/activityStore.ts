import {action, observable, makeAutoObservable} from "mobx";
import { createContext } from "react";
import {io} from "socket.io-client";
import {apiUrl} from "../config/api";
import {CardArrayInterface, changeCardNaming} from "../Components/utils/changeCardNaming";
const socket = io(`${apiUrl}`);

export class ActivityStore{
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }
    @observable commonCards = ['', '', '', '', ''];
    @observable playersNewCards: string[][] = [['','']];

    @action updateCards = async () => {
        socket.emit('turn', {}, (response: CardArrayInterface[]) => {
            const newCommonCards = changeCardNaming([response]);
            this.commonCards = newCommonCards[0] as string[];

        });
    }
    @action startNewRound = async () => {
        socket.emit('createGameFlow', {text: 'front text', name: 'nameText'}, (response: any) => {
            this.playersNewCards = changeCardNaming(response) as string[][];
        });
    }

}
export const ActivityStoreContext = createContext(new ActivityStore())
