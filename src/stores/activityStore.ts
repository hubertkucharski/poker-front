import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Cards, changeCardNaming } from "../Components/utils/changeCardNaming";
import { CommonCards } from "../types/types";

interface CheckResult {
  name: string;
}
export interface CurrentState {
  commonCards: Cards[];
  pot: number;
  playerWon: number;
  checkResult: CheckResult;
}

const DEFAULT_COMMON_CARDS = ["", "", "", "", ""];
const DEFAULT_PLAYER_CARDS = ["", ""];
export const DEFAULT_PLAYER_INDEX = -1;
const DEFAULT_POT = 0;

export class ActivityStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  @observable commonCards = DEFAULT_COMMON_CARDS;
  @observable playersCards: CommonCards = DEFAULT_PLAYER_CARDS;
  @observable playerIndex: number = DEFAULT_PLAYER_INDEX;
  @observable currentState: CommonCards = DEFAULT_COMMON_CARDS;
  @observable pot: number = DEFAULT_POT;
  @observable playerWon: number = DEFAULT_PLAYER_INDEX;
  @observable checkResult: CheckResult = {
    name: "",
  };

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
    this.pot = newCurrentState.pot;
    this.checkResult = newCurrentState.checkResult;
    this.playerWon = newCurrentState.playerWon;
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
