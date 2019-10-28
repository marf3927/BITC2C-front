import React, {useContext, useState} from 'react'
import Link from 'next/link'
import {Cookies} from 'react-cookie'
import AppLayout from '../../components/AppLayout'
import {Button, Input} from 'semantic-ui-react'
import Router from "next/router"
import {AuthStoreContext} from "../../store/AuthStroe"
import {HttpServiceContext} from "../../store/HttpService"

const Login = () => {
    const AuthStore = useContext(AuthStoreContext)
    const HttpService = useContext(HttpServiceContext)

    const cookies = new Cookies()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')

    //regiser 보내기
    function onLoginClick(email, password) {
        HttpService.login()
            .then((response) => {
                console.log('front_login_', response.data)
                const token = response.data.token
                cookies.set('authToken', token)
                Router.push('/')
            }).catch((e) => {
                setAlert("아이디 또는 비밀번호를 다시 확인하세요.\n 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
            })
    }

    if (!AuthStore.isLoggedIn) {
        return (
            <>
                <AppLayout>
                    <div>
                        <h1>Login</h1>
                        <div>
                            <Input onChange={e => setEmail(e.target.value)} type="text" name="email"
                                   placeholder="Email"/>
                        </div>

                        <div>
                            <Input onChange={e => setPassword(e.target.value)} type="password" name="pass"
                                   placeholder="Password"/>
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
                        <span>
                            Forgot
                        </span>
                            <Link href="/user/forgot"><a>Username / Password?</a></Link>
                        </div>

                        <div>
                            <Link href="/user/register"><a>Create your Account</a></Link>
                        </div>
                    </div>
                </AppLayout>
            </>
        )
    } else {
        return (
            <>
                <AppLayout>
                    <div>
                        <h3>이미 로그인 했습니다.</h3>
                    </div>
                </AppLayout>
            </>)
    }
}


export default Login