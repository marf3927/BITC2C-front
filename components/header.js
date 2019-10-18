import React from 'react';
import { Menu } from 'semantic-ui-react'
import Link from 'next/link';


const Header = () =>{
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>BITC2C</a></Link></Menu.Item>
            <Menu.Item key="Exchage"><Link href="/trade/tradeBoard"><a>Trade</a></Link></Menu.Item>
            <Menu.Item key="QnA"><a>Q&A</a></Menu.Item>
            <Menu.Item key="login"><Link href="/user/login"><a>Login</a></Link></Menu.Item>
            <Menu.Item key="My Page"><Link href="/user/myPage"><a>My Page</a></Link></Menu.Item>
        </Menu>
    );
};

export default Header;