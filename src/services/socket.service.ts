import { io } from "socket.io-client";
import { apiUrl } from "../config/api";
import { Cards } from "../Components/utils/changeCardNaming";

const socket = io(`${apiUrl}`);

const emitJoinGame = () => {
  socket.emit("joinGameRoom");
};
const emitInitNewGame = () => {
  socket.emit("createGameFlow", { roomId: "room-1" });
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

const onInitGame = (callback: (response: Cards[][]) => void) => {
  socket.on("initRound", (response) => {
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
};
