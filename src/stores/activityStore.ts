import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Cards, changeCardNaming } from "../Components/utils/changeCardNaming";
import { CommonCards } from "../types/types";

export class ActivityStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  @observable commonCards = ["", "", "", "", ""];
  @observable playersCards: CommonCards[] = [["", ""]];

  @action setCommonCards(newCards: Cards[]) {
    this.commonCards = changeCardNaming([newCards])[0] as CommonCards;
  }
  @action setPlayerCards(newPlayersCards: CardArrayInterface[][]) {
    this.playersCards = changeCardNaming(newPlayersCards) as CommonCards[];
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
