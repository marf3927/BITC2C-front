import React, {useContext,useState, useEffect} from 'react'
import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {AuthStoreContext} from "../store/AuthStroe"
import Router from "next/router"
import { observable, computed, action, decorate } from 'mobx'
import io from "socket.io-client"


const Header = ({alarm}) => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = 'http://localhost:5555'
    const [isLoggedIn, setIslogedIn] = useState(AuthStore.isLoggedIn)
    
    const logout = () => {
        var socket =io.connect(baseURL, {'reconnect': true, 'resourse': 'socket.io'})
        socket.disconnect()
        AuthStore.deleteToken()
    }
   
        return (
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>BITC2C</a></Link></Menu.Item>
                <Menu.Item key="Exchage"><Link href="/trade/list"><a>Trade</a></Link></Menu.Item>
                <Menu.Item key="QnA"><Link href="/QnA/detail"><a>Q&A</a></Link></Menu.Item>
                {
                    !AuthStore.isLoggedIn ?
                     <Menu.Item key="login"><Link href="/user/login"><a>Login</a></Link></Menu.Item>
                        :<Menu.Item key="logout" onClick = {() => logout()}><a>Logout</a></Menu.Item>

                }
                {
                    AuthStore.isLoggedIn ?
                        <Menu.Item key="My Page"><Link href="/user/mypage"><a>My Page</a></Link></Menu.Item>
                        :<></>
                }
                {
                    AuthStore.isLoggedIn ?
                        <Menu.Item key="alarm"><Link href="/alarm"><a>Alarm {alarm}</a></Link></Menu.Item>
                        :<></>
                }
            </Menu>
        )

}

export default Header