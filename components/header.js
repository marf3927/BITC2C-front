import React, {useContext, useState, useEffect} from 'react'
import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {HttpServiceContext} from "../store/HttpService"

const Header = ({alarm}) => {
    const HttpService = useContext(HttpServiceContext)
    const [alarms, setAlarms] = useState(0)

    const getAlarm = () => {
        if(HttpService.authStore.isLoggedIn){
            HttpService.getAlarm()
                .then((alarms) =>{
                    setAlarms(alarms.length())
                })
        }
    }

    useEffect(()=>{
        getAlarm()
    })

    const logout = () => {
        HttpService.authStore.deleteToken()
    }

    return (
        <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>BITC2C</a></Link></Menu.Item>
            <Menu.Item key="Exchage"><Link href="/trade/list"><a>Trade</a></Link></Menu.Item>
            <Menu.Item key="QnA"><Link href="/QnA/detail"><a>Q&A</a></Link></Menu.Item>
            {
                !HttpService.authStore.isLoggedIn ?
                    <Menu.Item key="login"><Link href="/user/login"><a>Login</a></Link></Menu.Item>
                    : <Menu.Item key="logout" onClick={() => logout()}><a>Logout</a></Menu.Item>

            }
            {
                HttpService.authStore.isLoggedIn ?
                    <Menu.Item key="My Page"><Link href="/user/mypage"><a>My Page</a></Link></Menu.Item>
                    : <></>
            }
            {
                HttpService.authStore.isLoggedIn ?
                    <Menu.Item key="alarm"><Link href="/alarm"><a>Alarm {alarms}</a></Link></Menu.Item>
                    : <></>
            }
        </Menu>
    )

}

export default Header