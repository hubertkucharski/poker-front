import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Cards, changeCardNaming } from "../Components/utils/changeCardNaming";
import { CommonCards } from "../types/types";

export interface CurrentState {
  commonCards: Cards[];
}

const DEFAULT_COMMON_CARDS = ["", "", "", "", ""];
const DEFAULT_PLAYER_CARDS = ["", ""];
const DEFAULT_PLAYER_INDEX = -1;

export class ActivityStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  @observable commonCards = DEFAULT_COMMON_CARDS;
  @observable playersCards: CommonCards = DEFAULT_PLAYER_CARDS;
  @observable playerIndex: number = DEFAULT_PLAYER_INDEX;
  @observable currentState: CommonCards = DEFAULT_COMMON_CARDS;

  @action setCommonCards(newCards: Cards[]) {
    this.commonCards = changeCardNaming([newCards])[0] as CommonCards;
  }
  @action setPlayerCards(newPlayersCards: Cards[]) {
    this.playersCards = changeCardNaming([newPlayersCards]) as CommonCards;
  }
  @action setPlayerIndex(newPlayerIndex: number) {
    this.playerIndex = newPlayerIndex;
  }
  @action setCurrentState(newCurrentState: CurrentState) {
    this.commonCards = changeCardNaming([
      newCurrentState.commonCards,
    ])[0] as CommonCards;
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
