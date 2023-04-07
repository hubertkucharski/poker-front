import {io} from "socket.io-client";
import {apiUrl} from "../config/api";

const socket = io(`${apiUrl}`);

const emitInitNewGame = () =>{
    socket.emit('createGameFlow');
}
const emitEndRound = () =>{
    socket.emit('');
}

export const socketService = {socket, emitEndRound, emitInitNewGame};
