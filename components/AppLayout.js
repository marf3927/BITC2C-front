import React, { useContext, useState, useEffect } from 'react'
import Header from './header'
import Head from 'next/head'
import { AuthStoreContext } from "../store/AuthStroe"
import { socketioContext } from "../store/socketio"


const AppLayout = ({children}) =>{
    const AuthStore = useContext(AuthStoreContext)
    const socketio = useContext(socketioContext)

    const [socketalarm, setSocketalarm] = useState('')
    // setSocketalarm(socketio.getalarm());

    useEffect(() => {
        console.log("????")
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
            <Header/>
            {children}
                {
                    <p>알람 {socketalarm}</p>
                }
        </div>
        </>
    );
};
export default AppLayout;