import { io } from "socket.io-client";
import { apiUrl } from "../config/api";
import { PlayerCards } from "../Components/SingleRoom/SingleRoom";
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
const emitCall = () => {
  socket.emit("call");
};
const emitFold = () => {
  socket.emit("fold");
};
const emitRaise = () => {
  socket.emit("raise", 50);
};

const onJoinGame = (
  callback: ([{ playerIndex, balance }]: [
    { playerIndex: number; balance: number }
  ]) => void
) => {
  socket.on("joinGame", (playerIndexAtTableAndBalance) => {
    callback(playerIndexAtTableAndBalance);
  });
  return () => socket.off("joinGame");
};

const onCall = (callback: (newGameState: CurrentState) => void) => {
  socket.on("call", (newGameState) => {
    callback(newGameState);
  });
  return () => socket.off("call");
};
const onFold = (callback: (newGameState: CurrentState) => void) => {
  socket.on("fold", (newGameState) => {
    callback(newGameState);
  });
  return () => socket.off("fold");
};

const onInitGame = (
  callback: (response: PlayerCards) => void
) => {
  socket.on("initRound", (response) => {
    callback(response);
  });
  return () => socket.off("initRound");
};

const onCurrentGameState = (callback: (response: CurrentState) => void) => {
  socket.on("currentState", (response) => {
    callback(response);
  });
  return () => socket.off("currentState");
};

export const socketService = {
  socket,
  emitEndRound,
  emitCall,
  emitFold,
  emitRaise,
  onCall,
  onFold,
  emitInitNewGame,
  onInitGame,
  emitJoinGame,
  onJoinGame,
  onCurrentGameState,
};
