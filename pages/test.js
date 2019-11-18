import React from 'react'
import List from "../components/tradeMain/list"
import Writing from "../components/tradeMain/writing"
import Mypage from "../components/tradeMain/myWallet"
import AppLayout from '../components/AppLayout'
import Chart from "../components/tradeMain/chart"
import { Grid, Segment } from 'semantic-ui-react'


const Home = () => {
    return (
        <AppLayout>

            <Grid columns={3} divided>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Segment><List/></Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>  <Chart/></Segment>
                        <Segment><Writing/></Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment> <Mypage/></Segment>

                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </AppLayout>
    )
}

export default Home
