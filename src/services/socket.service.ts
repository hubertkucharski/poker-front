import { io } from "socket.io-client";
import { apiUrl } from "../config/api";
import { Cards } from "../Components/utils/changeCardNaming";

const socket = io(`${apiUrl}`);

const emitInitNewGame = () => {
  socket.emit("createGameFlow");
};

const emitEndRound = () => {
  socket.emit("endRound");
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
};
