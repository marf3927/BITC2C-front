import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';


const Login = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        console.log(email)
        console.log(password)
    },[email]);

    const onClickLogin = () =>{

    }


    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js"></script>
            </Head>
            <AppLayout>
                <div>
                    <h1>Login</h1>
                    <div>
                        <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email"/>
                    </div>

                    <div>
                        <input type="password" onChange={e => setPassword(e.target.value)} name="pass" placeholder="Password"/>
                    </div>

                    <div >
                        <button onClick={onClickLogin}>
                            Login
                        </button>
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
    )}



export default Login;