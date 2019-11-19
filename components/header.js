import React, {useContext, useState, useEffect} from 'react'
import {Menu, Icon, Container, Button,Responsive,Visibility ,Segment,Label, Image } from 'semantic-ui-react'
import Link from 'next/link'
import {HttpServiceContext} from "../store/HttpService"

import Footer from './footer';
import Router,{ useRouter } from 'next/router';


const Header = ({children}) => {
    const HttpService = useContext(HttpServiceContext)
    const [alarms, setAlarms] = useState(0)
    const [fixed,setfixed] =useState();
    const [activeItem,setactiveItem] =useState();

    const handleItemClick = (e,{name})=> {
        console.log(name);
        

        setactiveItem(name)
        if(name==='home'){
            Router.push('/')
        }
        else if(name==='trade'){
            Router.push('/trade/tradeMain')
        }else if(name==='mypage'){
         
            Router.push('/user/mypage')
        }
    }

    let hideFixedMenu = () => setfixed(false);
    let showFixedMenu = () => setfixed(true);

    const getWidth = () => {
        const isSSR = typeof window === 'undefined'

        return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }
    

    const getAlarm = () => {
        if(HttpService.authStore.isLoggedIn){
            HttpService.getAlarm()
                .then((alarms) =>{
                    console.log(alarms)
                    if(alarms){
                        setAlarms(Object.keys(alarms.data).length)
                    }
                })
        }
    }

    HttpService.socket.get_socket().on("alarm", (data)=>{
        setAlarms(alarms+1)
    })


    useEffect(()=>{
        getAlarm()
    })
    const colors = [
        'red'
        
      ]


    const logout = () => {
        HttpService.authStore.deleteToken()
    }

    return (

        <>
            <div>
                
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
                once={false}
                onBottomPassed={showFixedMenu}
                onBottomPassedReverse={hideFixedMenu}
            >
                
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 150, padding: '1em 0em' }}
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
                            
                            
                            <Menu.Item name="home" active={activeItem==='home'} content='Home' onClick={handleItemClick}/>
                            
                            <Menu.Item  name="trade" active={activeItem==='trade'} content='TRADE' onClick={handleItemClick}/>
                            
                            <Menu.Item  name="QNA" active={activeItem==='QNA'} content='QNA' onClick={handleItemClick}>QNA</Menu.Item>
                            
                            <Menu.Item position='right'>
                            {HttpService.authStore.isLoggedIn ?<> 
                                

                                
  
                                <Icon name='bell outline'/><Link href="/alarm/list"><a> <Label circular color='red' key='red'>{alarms}</Label></a></Link>

                            <Menu.Item name="mypage" active={activeItem==='mypage'} content='MYPAGE' onClick={handleItemClick}/>
                                    <div>
                                    </div>
                             <Menu.Item name="LOGOUT" active={activeItem==='LOGOUT'} content='LOGOUT' onClick={logout}/></>
                                :                               
                                <> <Button as='a' inverted={!fixed}>
                                    <Link href="/user/login"><a>Log in</a></Link>
                                </Button>
                                    <div>
                                    </div>
                                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                                <Link href="/user/register"><a>Sign Up</a></Link> 
                                </Button></>}
                               
                            </Menu.Item>
                            
                        </Container>
                    </Menu>
                    
                    
                </Segment>
            </Visibility>
            {children}
           
        </Responsive>
                {/* <MobileContainer>{children}</MobileContainer> */}
                <Footer/>
            </div>


            </>
    )

}

export default Header