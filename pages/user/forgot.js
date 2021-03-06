import React, {useState, useEffect, useContext} from 'react'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import Cookies from 'js-cookie'
import {HttpServiceContext} from "../../store/HttpService"

const Forgot = () => {
    const HttpService = useContext(HttpServiceContext)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [alert, setAlert] = useState('')


    function onForgotClick() {
        HttpService.forgotPwd(email, name)
            .catch((e) => {
                setAlert("아이디 또는 비밀번호를 다시 확인하세요.\n 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
            })
    }


    return (
        <>

            <AppLayout>
                <div>
                    비밀번호 까먹음
                    <div>
                        <Input onChange={e => setEmail(e.target.value)} type="text" name="email"
                               placeholder="Email"/>
                    </div>

                    <div>
                        <Input onChange={e => setName(e.target.value)} type="text" name="name"
                               placeholder="Name"/>
                    </div>
                    <div>
                        <a>{alert}</a>
                    </div>
                    <div>
                        <Button onClick={() => onForgotClick(email, name)}>
                            submit
                        </Button>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}


export default Forgot
