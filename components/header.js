<<<<<<< HEAD
import React, {useContext,useState, useEffect} from 'react'
=======
import React, {useContext,useState,useEffect} from 'react'
>>>>>>> origin/master
import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {AuthStoreContext} from "../store/AuthStroe"
import Router from "next/router"


const Header = () => {
    const AuthStore = useContext(AuthStoreContext)
<<<<<<< HEAD

    const [isLoggedIn, setIslogedIn] = useState(AuthStore.isLoggedIn)
    const [socketalarm, setSocketalarm] = useState(AuthStore.getSoalarm)

    // console.log(socketalarm);
    // function alarm () {
    //     // setSocketalarm(AuthStore.getsoalarm)
    //     if (AuthStore.getsoalarm) {
    //         console.log('알람옴')
    //         alert('알람')
    //     }
    // }
   
    useEffect(() => {
        setSocketalarm(AuthStore.getSoalarm)
        console.log('22', socketalarm)
    }, [socketalarm]);
    

=======
   
 const [socketalarm, setSocketalarm] = useState(AuthStore.isLoggedIn)
>>>>>>> origin/master
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
                        :<Menu.Item key="logout" onClick = {() => logout()}><Link href="/"><a>Logout</a></Link></Menu.Item>
                }
                {
                    AuthStore.isLoggedIn ?
                        <Menu.Item key="My Page"><Link href="/user/mypage"><a>My Page</a></Link></Menu.Item>
                        :<></>
                }
                {
                    <p>You clicked {AuthStore.soalarm} times</p>
                }
                
                
            </Menu>
        )

}

export default Header