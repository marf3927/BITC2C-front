import React, { useState } from 'react';
import Link from 'next/link';
import {useSelector } from "react-redux";
import Head from 'next/head';

import AppLayout from '../../components/AppLayout';
import { Button, Input } from 'semantic-ui-react'
import axios from "axios"
import Router from "next/router"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    const baseURL = useSelector(state => state.auth.baseURL, [])

    //regiser 보내기
    function onLoginClick(email, password){
        return axios.post((baseURL+'/users/login/'),
            {
                email,
                password
            })
            .then((response) => {
                    console.log(response.data)

                    Router.push('/');
            }).catch((e) => {
                setAlert("아이디 또는 비밀번호를 다시 확인하세요.\n 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
            })
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
                        <Input onChange={e => setPassword(e.target.value)} type="password" name="pass" placeholder="Password" />
                    </div>
                    <div>
                        <a>{alert}</a>
                    </div>

                    <div>
                        <Button onClick={() => onLoginClick(email, password)}>
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