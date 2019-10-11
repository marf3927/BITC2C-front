import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';

const TradeBoard = () => {
    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
                />
            </Head>
            <AppLayout>
                <div>TradeBoard</div>
            </AppLayout>
        </>
    );
};

export default TradeBoard;
