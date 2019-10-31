import React, {useContext,useState, useEffect} from 'react'
import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {AuthStoreContext} from "../store/AuthStroe"
import Router from "next/router"
import { observable, computed, action, decorate } from 'mobx'



const Header = ({alarm}) => {
    const AuthStore = useContext(AuthStoreContext)

    const [isLoggedIn, setIslogedIn] = useState(AuthStore.isLoggedIn)
    

    

    //  console.log('socket alarm=',socketalarm);
    // function alarm () {
    //     // setSocketalarm(AuthStore.getsoalarm)
    //     if (AuthStore.getsoalarm) {
    //         console.log('알람옴')
    //         alert('알람')
    //     }
    // }
    function updatealarm(alarm){
        seta(alarm)
    }

    const logout = () => {
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