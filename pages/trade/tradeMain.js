import React from 'react'
import List from "./list"
import Writing from "./writing"
import Mypage from "./trademypage"
import AppLayout from '../../components/AppLayout'
import Chart from "../../components/tradeMain/chart"
import {Container, Divider, Grid, Header, Menu, Message, Segment, Table} from 'semantic-ui-react'


const Home = () => {
    return (
        <AppLayout>
            <Segment>
          <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
       <List/>
      </Grid.Column>
      <Grid.Column>
        <Segment><Chart/></Segment>
        <Segment><Writing/></Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment><Mypage/></Segment>
   
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>
        </AppLayout>
    )
}

export default Home
