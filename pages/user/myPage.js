import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import Cookies from 'js-cookie'


const myPage = () => {

    const token = Cookies.get('logintoken')


    return (
        <AppLayout>
            {token}
        </AppLayout>
    )

}

export default myPage
