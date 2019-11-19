import React, {useState,createRef} from 'react'
import List from "./list"
import Writing from "./tradewriting"
import Mypage from "./trademypage"
import AppLayout from '../../components/AppLayout'
import Chart from "../../components/tradeMain/chart"
import {
    Container,
    Divider,
    Grid,
    Header,
    Menu,
    Message,
    Segment,
    Icon,
    Responsive,
    Visibility, Sticky, Rail,Sidebar
} from 'semantic-ui-react'


const Home = () => {
    const [fixed,setfixed] =useState();
    const contextRef = createRef()
    const [visible, setVisible] = useState(false);
    let hideFixedMenu = () => setfixed(false);
    let showFixedMenu = () => setfixed(true);

    const getWidth = () => {
        const isSSR = typeof window === 'undefined'
        console.log('home =',isSSR)
        return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }

    const onclickvisible = () => setVisible(true);
    const onclickdvisible = () => setVisible(false);
    return (
        <AppLayout>




            <Sidebar.Pushable as={Segment}>
                <Rail internal position='right'>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    direction='right'
                    visible={visible}
                    width='wide'
                >

                        <Writing/>

                </Sidebar>
                </Rail>
                <Sidebar.Pusher>
            <Grid celled>

                <Grid.Row>

                    <Grid.Column width={4}>
                        <List/>
                    </Grid.Column>

                    <Grid.Column width={12}>

                        <Segment><Chart/>


                        </Segment>
                        <Rail internal position={'right'} size="mini">
                            <Segment vertical textAlign={"right"}

                            >
                            <Icon name="bitbucket" size="big" onClick={onclickvisible}/>
                            </Segment>
                        </Rail>
                    </Grid.Column>


                </Grid.Row>

            </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            <Grid>
                <Grid.Row>
                    {/*<Grid.Column width={4}>*/}
                    {/*    <Segment><Mypage/></Segment>*/}
                    {/*</Grid.Column>*/}
                    <Grid.Column width={9}>
                        <Mypage/>
                    </Grid.Column>
                    <Grid.Column width={3}>



                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </AppLayout>
    )
}

export default Home
