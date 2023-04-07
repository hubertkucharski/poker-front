import {io} from "socket.io-client";
import {apiUrl} from "../config/api";

const socket = io(`${apiUrl}`);

const emitInitNewGame = () =>{
    socket.emit('createGameFlow');
}
const emitEndRound = () =>{
    socket.emit('');
}

const onInitGame = (callback: (response: string[])=>void) =>{
    socket.on('initRound', (response) => {
        callback(response);
    });
    return ()=>socket.off('initRound');
}

export const socketService = {socket, emitEndRound, emitInitNewGame, onInitGame};
