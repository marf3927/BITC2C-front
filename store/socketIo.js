import {observable, reaction, computed, autorun, values} from 'mobx'
import io from "socket.io-client"
import {useContext} from "react"

class SocketIo {
    constructor() {
        this.socket = io('http://localhost:5555')
        this.socket.connect


    }
}

export default SocketIoContext = useContext(SocketIo)