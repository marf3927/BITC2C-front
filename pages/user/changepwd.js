import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import Cookies from 'js-cookie';
import { AuthStoreContext } from "../../store/AuthStroe"

const Changepwd = () => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = AuthStore.baseURL

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [alert, setAlert] = useState('')

    function onChangeClick(email, password, newpassword) {
        return axios.post((baseURL + '/pwd/change'),
            {
                email,
                password,
                newpassword
            })
            .then((response) => {
                console.log('change ', response.data)
                AuthStore.deleteToken()
                Router.push('/user/login')
            }).catch((e) => {
                setAlert("아이디 또는 비밀번호를 다시 확인하세요.\n 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
            })
    }

    return (
        <>

            <AppLayout>
                <div>
                    비밀번호 변경
                    <div>
                        <Input onChange={e => setEmail(e.target.value)} type="text" name="email"
                            placeholder="Email" />
                    </div>

                    <div>
                        <Input onChange={e => setPassword(e.target.value)} type="password" name="password"
                            placeholder="Password" />
                    </div>
                    <div>
                        <Input onChange={e => setNewpassword(e.target.value)} type="password" name="new_password"
                            placeholder="New password" />
                    </div>
                    <div>
                        <a>{alert}</a>
                    </div>
                    <div>
                        <Button onClick={() => onChangeClick(email, password, newpassword)}>
                            submit
                            </Button>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}


export default Changepwd;
