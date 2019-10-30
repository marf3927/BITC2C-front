import io from "socket.io-client";
import { createContext, useContext } from "react"


class socketio {
    baseURL = 'http://localhost:5555'
    socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
    salarm =''

    constructor(){
        this.salarm = ''
        if(this.socket.connected){
            this.socket.disconnect();
            this.socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
            console.log("socket connected!!!")
        }else{
            this.socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
            console.log("socket connected!!!")
        }

        this.socket.on('alarm', (msg) => {
            console.log('alarm callback!!!: ', msg);
            this.salarm = "으아아아"
        });
    }

    getalarm(){
        console.log(this.salarm);
    }
}

export const socketioContext = createContext(new socketio())
