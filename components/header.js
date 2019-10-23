import React, {useContext} from 'react'
import {Menu} from 'semantic-ui-react'
import Link from 'next/link'
import {AuthStoreContext} from "../store/AuthStroe"
import Router from "next/router"


const Header = () => {
    const AuthStore = useContext(AuthStoreContext)

    const logout = () => {
        AuthStore.deleteToken()
    }

    if (!AuthStore.isLoggedIn) {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>BITC2C</a></Link></Menu.Item>
                <Menu.Item key="Exchage"><Link href="/trade/list"><a>Trade</a></Link></Menu.Item>
                <Menu.Item key="QnA"><Link href="/QnA/detail"><a>Q&A</a></Link></Menu.Item>
                <Menu.Item key="login"><Link href="/user/login"><a>Login</a></Link></Menu.Item>
                <Menu.Item key="My Page"><Link href="/user/mypage"><a>My Page</a></Link></Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>BITC2C</a></Link></Menu.Item>
                <Menu.Item key="Exchage"><Link href="/trade/list"><a>Trade</a></Link></Menu.Item>
                <Menu.Item key="QnA"><Link href="/QnA/detail"><a>Q&A</a></Link></Menu.Item>
                <Menu.Item key="logout" onClick = {() => logout()}><Link href="/"><a>Logout</a></Link></Menu.Item>
                <Menu.Item key="My Page"><Link href="/user/mypage"><a>My Page</a></Link></Menu.Item>
            </Menu>
        )

    }

}

export default Header