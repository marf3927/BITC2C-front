import React, { useContext, useState, useEffect } from 'react'
import Header from './header'
import Head from 'next/head'
import {AuthStoreContext} from "../store/AuthStroe"
import io from "socket.io-client"


const AppLayout = ({children}) => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = 'http://localhost:5555'
    const [socket, setSocket] = useState(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))

    const [socketalarm, setSocketalarm] = useState([])

    function socketCheck() {
        if (socket.connected) {
            socket.disconnect()
            setSocket(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))
            console.log("socket connected!!!")
        } else {
            setSocket(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))
            console.log("socket connected!!!")
        }
    }

    socket.on('alarm', ({msg}) => {
        console.log(socketalarm)
        const message = msg
        setSocketalarm([...socketalarm, message])
    })

    useEffect(() => {
    }, [socketalarm]);


    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
                />
            </Head>
            <div>
                <Header alarm={socketalarm}/>
                {children}

            </div>
        </>
    )
}
export default AppLayout