import io from "socket.io-client";
import { createContext, useContext } from "react"
import {observable, computed, action} from 'mobx'
import axios from "axios"


class socketio {
    baseURL = 'http://localhost:5555'
    socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
    @observable
    salarm = []

    constructor(){
        if(this.socket.connected){
            this.socket.disconnect();
            this.socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
            console.log("socket connected!!!")
        }else{
            this.socket = io.connect(this.baseURL, { 'reconnect': true, 'resourse': 'socket.io' })
            console.log("socket connected!!!")
        }
    }

    @action
    setAlarm(){
        axios.get("http://localhost:5555" + '/alarm', {})
        this.socket.on('alarm', (msg) => {
            console.log('alarm callback!!!: ', this.salarm);
            this.salarm.push(msg)
        })
    }

    get getalarm(){
        console.log(this.salarm);
        return this.salarm
    }
}

export const socketioContext = createContext(new socketio())
