import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import {
  CardArrayInterface,
  changeCardNaming,
} from "../Components/utils/changeCardNaming";

export class ActivityStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  @observable commonCards = ["", "", "", "", ""];
  @observable playersCards: string[][] = [["", ""]];

  @action setCommonCards(newCards: CardArrayInterface[]) {
    this.commonCards = changeCardNaming([newCards])[0] as string[];
  }
  @action setPlayerCards(newPlayersCards: CardArrayInterface[][]) {
    this.playersCards = changeCardNaming(newPlayersCards) as string[][];
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
