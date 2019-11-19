import React, {useContext, useState, useEffect} from 'react'
import Header from './header'
import Head from 'next/head'
import {HttpServiceContext} from "../store/HttpService"


const AppLayout = ({children}) => {
    const HttpService = useContext(HttpServiceContext)
    const [alarm, setAlarm] = useState(null)

    HttpService.socket.get_socket().on("alarm", (data)=>{
        setAlarm(data)
    })

    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
                />
            </Head>
            <div>
                <Header alarm={alarm}>
                {children}
                </Header>

            </div>
        </>
    )
}
export default AppLayout