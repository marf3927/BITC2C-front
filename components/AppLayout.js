<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react'
=======
import React, {useEffect} from 'react';
>>>>>>> origin/master
import Header from './header'
import Head from 'next/head'
import { AuthStoreContext } from "../store/AuthStroe"


const AppLayout = ({children}) =>{
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
    );
};
export default AppLayout;