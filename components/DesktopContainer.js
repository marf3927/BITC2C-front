import {Menu, Icon, Container, Button,Responsive,Visibility ,Segment } from 'semantic-ui-react'
import Link from "next/link";
import React, {useState} from "react";

import Router,{ useRouter } from 'next/router';

const DesktopContainer = ({children}) =>{

    const [fixed,setfixed] =useState();
    const [activeItem,setactiveItem] =useState();

    const handleItemClick = (e,{name})=> {
        console.log(name);
        

        setactiveItem(name)
        if(name==='home'){
            Router.push('/')
        }
        else if(name==='trade'){
            Router.push('/trade/list')
        }else if(name===mypage){
            Router.push('/user/mypage')
        }
    }

    let hideFixedMenu = () => setfixed(false);
    let showFixedMenu = () => setfixed(true);

    const getWidth = () => {
        const isSSR = typeof window === 'undefined'

        return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }


    return(

        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 100, padding: '1em 0em' }}
                    vertical
                >
                    <Menu
                        fixed={fixed ? 'top' : null}
                        inverted={!fixed}
                        pointing={!fixed}
                        secondary={!fixed}
                        size='large'
                    >
                        <Container>
                            {console.log('container',activeItem)}
                            <Menu.Item name="home" active={activeItem==='home'} content='Home' onClick={handleItemClick}/ >
                            
                            <Menu.Item  name="trade" active={activeItem==='trade'} content='TRADE' onClick={handleItemClick}/>
                            
                            <Menu.Item  name="QNA" active={activeItem==='QNA'} content='QNA' onClick={handleItemClick}>QNA</Menu.Item>
                            <Menu.Item name="MYPAGE" active={activeItem==='MYPAGE'} content='MYPAGE' onClick={handleItemClick}>MYPAGE</Menu.Item>
                            <Menu.Item position='right'>
                                <Button as='a' inverted={!fixed}>
                                    Log in
                                </Button>
                                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                    Sign Up
                                </Button>
                            </Menu.Item>
                            
                        </Container>
                    </Menu>
                    
                    
                </Segment>
            </Visibility>
            {children}
           
        </Responsive>
    
    )


}


export default DesktopContainer ;