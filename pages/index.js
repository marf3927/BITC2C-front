import React, {useContext} from 'react'
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import {AuthStoreContext} from "../store/AuthStroe"



const Home = () => {
    return (
        <>
            <AppLayout>
                <div>Hello World!</div>
            </AppLayout>
        </>
    );
};

export default Home;