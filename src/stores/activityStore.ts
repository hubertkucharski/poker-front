import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Cards, changeCardNaming } from "../Components/utils/changeCardNaming";
import { CommonCards } from "../types/types";
//
// interface CheckResult {
//   name: string;
// }
export interface CurrentState {
  commonCards: Cards[];
  pot: number;
  playerWon: number;
  checkResult: string;
  activePlayer: number;
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
  @observable activePlayer: number = DEFAULT_PLAYER_INDEX;
  @observable checkResult: string = "";

  @action setCommonCards(newCards: Cards[]) {
    this.commonCards = changeCardNaming([newCards])[0] as CommonCards;
  }
  @action setPlayerCards(newPlayersCards: Cards[]) {
    this.playersCards = newPlayersCards
      ? (changeCardNaming([newPlayersCards]) as CommonCards)
      : ["", ""];
  }
  @action setPlayerIndex(newPlayerIndex: number) {
    this.playerIndex = newPlayerIndex;
  }
  @action setCurrentState(newCurrentState: CurrentState) {
    const { commonCards, activePlayer, playerWon, pot, checkResult } =
      newCurrentState;
    this.commonCards = changeCardNaming([commonCards])[0] as CommonCards;
    this.pot = pot;
    this.checkResult = checkResult;
    this.playerWon = playerWon;
    this.activePlayer = activePlayer;
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
