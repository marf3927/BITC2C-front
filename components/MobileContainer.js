import {Menu, Icon, Container, Button,Responsive,Sidebar ,Segment } from 'semantic-ui-react'
import React,{useState} from "react";
import HomepageHeading from './HomepageHeading';

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const MobileContainer = ({ children })=>{

    const [sidebarOpened,setsidebarOpened] = useState();

    let handleSidebarHide =() => setsidebarOpened(false);
    let handleToggle = () =>  setsidebarOpened(true);

    return(
        <Responsive
            as={Sidebar.Pushable}
            getWidth={getWidth}
            maxWidth={Responsive.onlyMobile.maxWidth}
        >
            <Sidebar
                as={Menu}
                animation='push'
                inverted
                onHide={handleSidebarHide}
                vertical
                visible={sidebarOpened}
            >
                <Menu.Item as='a' active>
                    Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item as='a'>Log in</Menu.Item>
                <Menu.Item as='a'>Sign Up</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened}>
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: 350, padding: '1em 0em' }}
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item onClick={handleToggle}>
                                <Icon name='sidebar' />
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Button as='a' inverted>
                                    Log in
                                </Button>
                                <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                    Sign Up
                                </Button>
                            </Menu.Item>
                        </Menu>
                        
                    </Container>
                   
                </Segment>
                {children}
            </Sidebar.Pusher>
        </Responsive>
    )


}

export default MobileContainer;