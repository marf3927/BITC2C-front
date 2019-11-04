import React, {useContext, useState, useEffect} from 'react'
import Header from './header'
import Head from 'next/head'
import {AuthStoreContext} from "../store/AuthStroe"
import io from "socket.io-client"
import {HttpServiceContext} from "../store/HttpService"


const AppLayout = ({children}) => {
<<<<<<< HEAD
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = 'http://localhost:5555'
<<<<<<< HEAD
    //const [socket, setSocket] = useState(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))

    const [socketalarm, setSocketalarm] = useState([])

    // function socketCheck() {
    //     if (socket.connected) {
    //         socket.disconnect()
    //         setSocket(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))
    //         console.log("socket connected!!!")
    //     } else {
    //         setSocket(io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'}))
    //         console.log("socket connected!!!")
    //     }
    // }

    // socket.on('alarm', ({msg}) => {
    //     console.log(socketalarm)
    //     const message = msg
    //     setSocketalarm([...socketalarm, message])
    // })

    useEffect(() => {
    }, [socketalarm]);

=======
=======
    const HttpService = useContext(HttpServiceContext)
    const baseURL = HttpService.authStore.baseURL
>>>>>>> ba0e832c7c3f614575dab3faa5ebcec7e34d73e3
    const [socket, setSocket] = useState(io(baseURL))

    const [socketalarm, setSocketalarm] = useState([])
    console.log(socket.id)

    if (!socket.id) {
        socket.on('alarm', ({msg}) => {
            console.log(socketalarm)
            const message = msg
            setSocketalarm([...socketalarm, message])
        })
    }
>>>>>>> 4055b02ba277c6357a05333b7b931089c61107d8

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