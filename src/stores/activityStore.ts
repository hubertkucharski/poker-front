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
  players: { money: number; currentBet: number };
  indexAndBalance: [{ playerIndex: number; balance: number }];
}

const DEFAULT_COMMON_CARDS = ["", "", "", "", ""];
export const DEFAULT_PLAYER_CARDS = ["back", "back"];
export const DEFAULT_PLAYER_INDEX = -1;
const DEFAULT_POT = 0;

export class ActivityStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  @observable commonCards = DEFAULT_COMMON_CARDS;
  @observable playerCards: CommonCards = DEFAULT_PLAYER_CARDS;
  @observable playerIndex: number = DEFAULT_PLAYER_INDEX;
  @observable playerBalance: number = DEFAULT_POT;
  @observable currentState: CommonCards = DEFAULT_COMMON_CARDS;
  @observable pot: number = DEFAULT_POT;
  @observable playerWon: number = DEFAULT_PLAYER_INDEX;
  @observable activePlayer: number = DEFAULT_PLAYER_INDEX;
  @observable checkResult: string = "";
  @observable indexAndBalance: [{ playerIndex: number; balance: number }] = [
    { playerIndex: DEFAULT_PLAYER_INDEX, balance: DEFAULT_PLAYER_INDEX },
  ];
  @observable players: { money: number; currentBet: number }[] = [
    {
      money: DEFAULT_POT,
      currentBet: DEFAULT_POT,
    },
  ];

  @action setCommonCards(newCards: Cards[]) {
    this.commonCards = changeCardNaming([newCards])[0] as CommonCards;
  }
  @action setPlayerCards(newPlayer: {
    playerIndex: number;
    playerHand: Cards[];
  }) {
    this.playerCards = newPlayer.playerHand
      ? (changeCardNaming([newPlayer.playerHand]) as CommonCards[])[0]
      : ["", ""];
    this.playerIndex = newPlayer.playerIndex;
  }

  @action setCurrentState(newCurrentState: CurrentState) {
    const {
      commonCards,
      activePlayer,
      playerWon,
      pot,
      checkResult,
      players,
      indexAndBalance,
    } = newCurrentState;
    this.commonCards = changeCardNaming([commonCards])[0] as CommonCards;
    this.pot = pot;
    this.checkResult = checkResult;
    this.playerWon = playerWon;
    this.activePlayer = activePlayer;
    this.players = [players];
    this.indexAndBalance = indexAndBalance;
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
