import { observable, computed, action, decorate } from 'mobx'
import { createContext } from "react"
import axios from 'axios'
import io from "socket.io-client";


class Socket {


    socket = io.connect("http://localhost:5555", { transports: ['websocket'] })


    on() {
        socket.on('hi', () => {
            console.log("connection socket server!!!");

        })
        socket.on('alarm', (msg) => {
            console.log('alarm callback!!!: ', msg);
        });
    }

    emit() {
        socket.emit('alarm', { msg: 'alarm!' });
    }


}
decorate(Socket, {
    socket: observable,
    on: action,
    emit: action,
})

export const SocketContext = createContext(new Socket())
