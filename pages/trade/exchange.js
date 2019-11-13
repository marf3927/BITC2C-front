import React, {useState, useEffect, useContext} from 'react'
import Router,{ useRouter } from 'next/router';
import { Grid, Segment,Message,Icon,Button,Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
//구매와 판매 판별하는 함수

import {HttpServiceContext} from "../../store/HttpService"
const Exchange = ()=>{
    const [password,setPassword] = useState('');
    const HttpSrvice=useContext(HttpServiceContext);

    const router = useRouter();


    function addrconfirm (){
        HttpSrvice.gotoaddrconfirm(password).then((result)=>{
            console.log('addrconfirm =' ,result)
        })
    }
    useEffect(()=>{

    },[])
    return(<>


        <Grid columns='equal' divided inverted padded>
            <Grid.Row color='black' textAlign='center'>
                <Grid.Column>
                    <Segment color='black' inverted>
                        <Message icon>
                            <Icon name='circle notched' loading />
                            <Message.Content>
                                <Message.Header><Icon name='detective'/>경고 <Icon name='detective'/> 전송을 시작하면 취소가 불가능합니다.</Message.Header>
                                <Message.Header>지갑 암호를 넣어주세요.</Message.Header>

                                Please enter your wallet address.

                            </Message.Content>

                        </Message>
                        <Input onChange={e => setPassword(e.target.value)} type="password" name="pass"
                               placeholder="Password"/>
                        <Button inverted color='green' onClick={addrconfirm}>
                            전송
                        </Button>

                    </Segment>
                </Grid.Column>


            </Grid.Row>
        </Grid>
        </>)

}

export default Exchange;