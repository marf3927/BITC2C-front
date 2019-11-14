import React, {useState, useEffect, useContext} from 'react'
import Router,{ useRouter } from 'next/router';
import {Grid, Segment, Message, Icon, Button, Input, Dimmer, Loader} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Timer from '../../components/test'
//구매와 판매 판별하는 함수

import {HttpServiceContext} from "../../store/HttpService"
const Exchange = ()=>{
    const [password,setPassword] = useState('');
    const HttpSrvice=useContext(HttpServiceContext);
    const [datetime,setdatetime] =useState()
    const [boolconfirm,setboolconfirm]=useState(false);
    const [tableid,settableid] =useState()
    const [lodderbool,setlodderbool]=useState(false);
    const router = useRouter();

    useEffect(()=>{
        getDate();
    },[])

    function getDate(){
        //data[1] == sellerconfirm ,data[2] == buyerconfirm ,data[3] ==user ID,data[4] ==tableId
        HttpSrvice.gotoGetDate().then((result)=>{
            console.log('tableId ==',result.data[4])
            settableid(result.data[4]);
            setdatetime(result.data[0]);

            if(result.data[3]===(result.data[1]||result.data[2])){
                setboolconfirm(true);
            }else{
                setboolconfirm(false);
            }

        });
    }

    function addrconfirm (){
        setlodderbool(true);
        HttpSrvice.gotoaddrconfirm(password,tableid).then((result)=>{
            console.log('addrconfirm =' ,result)
            setlodderbool(false);
        })
    }

    return(<>
        <Segment>
        <Dimmer active={lodderbool}>
            <Loader size='huge'>지갑 생성중</Loader>
        </Dimmer>

        <Grid columns='equal' divided inverted padded>
            <Grid.Row color='black' textAlign='center'>
                <Grid.Column>
                    <Segment color='black' inverted>
                        <Message icon>
                            <Icon name='circle notched' loading />
                            <Message.Content>

                                {datetime===undefined ? "": <Timer seconds={datetime}/>}

                                <Message.Header><Icon name='detective'/>경고 <Icon name='detective'/> 전송을 시작하면 취소가 불가능합니다.</Message.Header>
                                <Message.Header>지갑 암호를 넣어주세요.</Message.Header>

                                Please enter your wallet address.

                            </Message.Content>

                        </Message>
                        {boolconfirm ? ""
                            : <><Input onChange={e => setPassword(e.target.value)} type="password" name="pass" placeholder="Password"/>
                                <Button inverted color='green' onClick={addrconfirm}>전송</Button></>
                              }


                    </Segment>
                </Grid.Column>


            </Grid.Row>
        </Grid>
        </Segment>
        </>)

}

export default Exchange;