import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';


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