import React, {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

import {Button, Table, Input, Icon,List, Grid, Segment,Label,Image,Message} from 'semantic-ui-react'
import {HttpServiceContext} from "../../store/HttpService"

const Detail = ({id}) => {
    const HttpService = useContext(HttpServiceContext)

    const [items, setItems] = useState([])
    const [userId, setUserId] = useState()
    const [tableId,settableId] = useState();
    //console.log('asdasd',id);
    useEffect(() => {
        getUser()
        getItems()
    }, [])

    useEffect(()=>{

    },[,items,userId])


    function confirmAction (message,callback,rejection) {
        if (confirm(message)) {
            callback()
        } else {
            rejection()
        }
    }

    // console.log(props.location.query);
    function getItems() {
        const id = Router.query.tableid
        HttpService.getTradeItem(id)
            .then((data) => {
                setItems(data)
        })
    }

    //토큰을 이용해서 USER 정보 가져오는 함수
    function getUser() {
        HttpService.getUser()
            .then((id) => {
                setUserId(id)
                console.log('userid = ', id)
            }).catch((e)=>{
            console.log(e);
        })
    }


    //글쓴이가 아닌 사람이 글을 눌렀을때 버튼이 활성화 할지 확인하는 함수
    function usermatch() {
        console.log('usermatch//')
        let error = new Error()

        console.log('userId ==',userId , 'usertype',typeof(userId))

        console.log('item seller id=',items.sellerId ,' items.sellerId',typeof(items.sellerId))
        if (userId === Number(items.sellerId) || typeof(userId)==='object' ) {
            console.log('user usermatch in')
            return true
        }
        return false
    }

    const rejection = () => console.log("fail")

    // console.log(props.key);
    function gotoTrade() {
        const id = Router.query.tableid
        const paramuserid = userId
        console.log('gotoTrade',id);
        HttpService.goToTrade(id,paramuserid)
        tradealarm()
    }

    function tradealarm() {
        var opponentID = ''
        if (!items.sellerId) {
            opponentID = items.buyerId
        }
        else {
            opponentID = items.sellerId
        }

        var tradeData = {
            opponentID: opponentID,
            userId: userId,
            tableId: Router.query.tableid
        };

        console.log("opponentID: ", opponentID, " MYID: ", userId, " tableId: ", Router.query.tableid)
        HttpService.socket.get_socket().emit('trading', (tradeData))
    }

    return (

        <>
            <AppLayout>
        
                <Segment
               textAlign='center'
         style={{ minHeight: 550, padding: '1em 0em' }}
         vertical
                >
<Message>
    <Message.Header>거래 상세 상황</Message.Header>
    <p>
      We updated our privacy policy here to better service our customers. We
      recommend reviewing the changes.
    </p>
  </Message>
<Grid columns='equal'>
    <Grid.Column>
      
    </Grid.Column>
    <Grid.Column width={10}>
    
    <Grid columns={1}>
    <Grid.Column>
    <Segment inverted>
    <List divided inverted relaxed>
      <List.Item>
        <List.Content>
          <List.Header>SELLTOKEN</List.Header>
          <Label key="midium" size="midium">
          {items.selltoken}
      </Label>
          
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>SELLAMOUNT</List.Header>
          <Label key="midium" size="midium">
          {items.selltokenamount}
      </Label>
          
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>BUYTOKEN</List.Header>
          <Label key="midium" size="midium">
          {items.buytoken}
      </Label>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>BUYAMOUNT</List.Header>
          <Label key="midium" size="midium">
          {items.buytokenamount}
      </Label>
        </List.Content>
      </List.Item>
    </List>
    
  </Segment>    
  <Segment textAlign='right'>
                    {usermatch() ? <h1>
                            거래현황
                        </h1> : <button className="ui primary button"
                                        onClick={()=>confirmAction("거래를 진행하시겠습니까?",gotoTrade, rejection)}>
                            BUY
                        </button>}
                        </Segment>
    </Grid.Column>
  </Grid>
                        
    </Grid.Column>
    <Grid.Column>
      
    </Grid.Column>
  </Grid>
               
                </Segment>     
                

                              
            </AppLayout>

        </>
    )
}

// Detail.getInitialProps = async ({req}) => {
//     const res = await fetch('http://192.168.1.173:3000/trade/list')
//     return {id: res}
// }

export default Detail