import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import {Cookies} from 'react-cookie'
import AppLayout from '../../components/AppLayout'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import {HttpServiceContext} from "../../store/HttpService"



const Login = () => {
    const HttpService = useContext(HttpServiceContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logAlert, setLogAlert] = useState('')

    //regiser 보내기

    function onLoginClick(email, password) {
        HttpService.login(email, password)
            .catch((e) => {
                console.log(e)
                setLogAlert("아이디 또는 비밀번호를 다시 확인하세요.\n 등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
            })
    }

    if (!HttpService.authStore.isLoggedIn) {
        return (
            <>
                <AppLayout>
                    <Segment placeholder>
                        <Grid columns={2} relaxed='very' stackable>
                            <Grid.Column>
                                <Form>
                                    <Form.Input
                                        onChange={e => setEmail(e.target.value)} type="text" name="email"
                                        icon='user'
                                        iconPosition='left'
                                        label='Email'
                                        placeholder='Email'
                                    />
                                    <Form.Input
                                        onChange={e => setPassword(e.target.value)} type="password" name="pass"
                                        icon='lock'
                                        iconPosition='left'
                                        label='Password'
                                        placeholder="Password"
                                    />

                                    <Button content='Login' primary onClick={() => onLoginClick(email, password)} />

                                </Form>

                            </Grid.Column>

                            <Grid.Column verticalAlign='middle'>
                                <Link href="/user/register">
                                <Button
                                    color='teal'
                                    content='Sign up'
                                    icon='signup'
                                    labelPosition='left'
                                />
                            </Link>

                            </Grid.Column>

                        </Grid>

                        <Divider vertical>Or</Divider>
                    </Segment>
                    <Link href="/user/forgot">
                    <Button content='Username / Password?' icon='question circle' size='small' />
                    </Link>
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