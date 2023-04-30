import { action, observable, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Cards, changeCardNaming } from "../Components/utils/changeCardNaming";
import { CommonCards } from "../types/types";
//
// interface CheckResult {
//   name: string;
// }
export interface PlayerIndexBalance {
  playerIndex: number;
  balance: number;
}
export interface PlayersFinalResults {
  playerIndex: number;
  balance: number;
  money: number;
  currentBet: number;
  hand: Cards[];
}
export interface CurrentState {
  commonCards: Cards[];
  pot: number;
  currentMaxBet: number;
  playerWon: number;
  checkResult: string;
  activePlayer: number;
  players: [PlayersFinalResults];
  indexAndBalance: [PlayerIndexBalance];
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
  @observable currentMaxBet: number = DEFAULT_POT;
  @observable playerWon: number = DEFAULT_PLAYER_INDEX;
  @observable activePlayer: number = DEFAULT_PLAYER_INDEX;
  @observable checkResult: string = "";
  @observable indexAndBalance: [PlayerIndexBalance] = [
    { playerIndex: DEFAULT_PLAYER_INDEX, balance: DEFAULT_PLAYER_INDEX },
  ];
  //balance ===  moneye???
  @observable players: {
    playerIndex: number;
    balance: number;
    money: number;
    currentBet: number;
    hand: Cards[];
  }[] = [
    {
      playerIndex: DEFAULT_PLAYER_INDEX,
      balance: DEFAULT_PLAYER_INDEX,
      money: DEFAULT_POT,
      currentBet: DEFAULT_POT,
      hand: [],
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
      currentMaxBet,
      checkResult,
      players,
      indexAndBalance,
    } = newCurrentState;
    this.commonCards = changeCardNaming([commonCards])[0] as CommonCards;
    this.pot = pot;
    this.currentMaxBet = currentMaxBet;
    this.checkResult = checkResult;
    this.playerWon = playerWon;
    this.activePlayer = activePlayer;
    this.players = players;
    this.indexAndBalance = indexAndBalance;
  }
}
export const ActivityStoreContext = createContext(new ActivityStore());
