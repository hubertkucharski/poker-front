import { io } from "socket.io-client";
import { apiUrl } from "../config/api";
import { Cards } from "../Components/utils/changeCardNaming";
import { CurrentState } from "../stores/activityStore";

const socket = io(`${apiUrl}`);

const DEFAULT_ROOM_ID = "123";

const emitJoinGame = () => {
  socket.emit("joinGameRoom");
};
const emitInitNewGame = () => {
  socket.emit("createGameFlow", { roomId: DEFAULT_ROOM_ID });
};

const emitEndRound = () => {
  socket.emit("endRound");
};

const onJoinGame = (callback: (playerIndex: number) => void) => {
  socket.on("joinGame", (playerIndex) => {
    callback(playerIndex);
  });
  return () => socket.off("joinGame");
};

const onEndRound = (callback: (response: Cards[]) => void) => {
  socket.on("endRound", (response) => {
    callback(response);
  });
  return () => socket.off("endRound");
};

const onInitGame = (callback: (response: Cards[]) => void) => {
  socket.on("initRound", (response) => {
    console.log(response);
    callback(response);
  });
  return () => socket.off("initRound");
};

const onCurrentGameState = (callback: (response: CurrentState) => void) => {
  socket.on("currentState", (response) => {
    console.log(response);
    callback(response);
  });
  return () => socket.off("initRound");
};

export const socketService = {
  socket,
  emitEndRound,
  onEndRound,
  emitInitNewGame,
  onInitGame,
  emitJoinGame,
  onJoinGame,
  onCurrentGameState,
};
