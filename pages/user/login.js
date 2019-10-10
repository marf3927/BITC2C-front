import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Head from 'next/head';

import AppLayout from '../../components/AppLayout';
import { Button, Input } from 'semantic-ui-react'
import basicStyle from '../../components/BasicStyle'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(email)
        console.log(password)
    }, [email]);

    const onClickLogin = () => {

    }

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
                <div>
                    <h1>Login</h1>
                    <div>
                        <Input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
                    </div>

                    <div>
                        <Input onChange={e => setPassword(e.target.value)} name="pass" placeholder="Password" />
                    </div>

                    <div>
                        <Button onClick={onClickLogin}>
                            Login
                        </Button>
                    </div>

                    <div>
                        <span >
                            Forgot
                        </span>
                        <Link href="#"><a>Username / Password?</a></Link>
                    </div>

                    <div>
                        <Link href="/user/register"><a>Create your Account</a></Link>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}



export default Login;