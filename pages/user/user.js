import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';

const User = () =>{
    return (
        <>
        <Head>
            <title>BITC2C</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js"></script>
        </Head>
        <AppLayout>
            <div>User</div>
        </AppLayout>
        </>
    );
};

export default User;