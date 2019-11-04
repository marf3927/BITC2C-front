import React, {useContext, useState, useEffect} from 'react'
import Header from './header'
import Head from 'next/head'
import {AuthStoreContext} from "../store/AuthStroe"
import io from "socket.io-client"
import {HttpServiceContext} from "../store/HttpService"


const AppLayout = ({children}) => {

    const AuthStore = useContext(AuthStoreContext)
  

    const HttpService = useContext(HttpServiceContext)
    const baseURL = HttpService.authStore.baseURL


    

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

            </div>
        </>
    )
}
export default AppLayout