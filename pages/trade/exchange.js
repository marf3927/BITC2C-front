import React, {useState, useEffect, useContext} from 'react'
import Router,{ useRouter } from 'next/router';
import {Grid, Segment, Message, Icon, Button, Input, Dimmer, Loader} from 'semantic-ui-react'

import Timer from '../../components/test'
//구매와 판매 판별하는 함수

import {HttpServiceContext} from "../../store/HttpService"
import AppLayout from '../../components/AppLayout';

const exchange = ()=>{
    const [password,setPassword] = useState('');
    const HttpSrvice=useContext(HttpServiceContext);
    const [datetime,setdatetime] =useState()
    const [boolconfirm,setboolconfirm]=useState(false);
    const [tableid,settableid] =useState()
    const [lodderbool,setlodderbool]=useState(false);
    const [userid,setuserid]=useState();
    const router = useRouter();

    useEffect(()=>{
        getDate();

    },[boolconfirm,lodderbool])

  
    function getDate(){
        //data[1] == sellerconfirm ,data[2] == buyerconfirm ,data[3] ==user ID,data[4] ==tableId
        HttpSrvice.gotoGetDate().then((result)=>{
            console.log('tableId ==',result.data[4])
            console.log('user ID ===',result.data[3]);
            console.log('sellerconfirm ==',result.data[1])
            console.log('buyerconfirm ==',result.data[2])
            setuserid(result.data[3]);

            console.log('user ID type ===',typeof( result.data[3]));
            console.log('sellerconfirm type ===',typeof (result.data[1]))
            console.log('buyerconfirm type ===',typeof(result.data[2]))

            settableid(result.data[4]);
            setdatetime(result.data[0]);

            if(result.data[3]===(result.data[1]||result.data[2])){
                console.log("gggggggggggg")
                setboolconfirm(true);
            }else{
                console.log("bbbbbbbbbbbbbbbbbbbb")
                setboolconfirm(false);
            }

        });
    }
    HttpSrvice.socket.get_socket().on('complete',()=>{
        console.log("왓는가???")
        Router.push('/trade/success')
    })

    

    function addrconfirm (){
        setlodderbool(true);
        HttpSrvice.gotoaddrconfirm(password,tableid).then((result)=>{
            console.log('addrconfirm =' ,result.data)

            const a =result.data
            //setTimeout();
            if(a.boolconfirm&&a.balanceconfirm&&a.transfer){
                HttpSrvice.gotoalarmupdate(tableid);
                HttpSrvice.socket.get_socket().emit("success",{userid:userid,tableid:tableid})
                Router.push('/trade/success')
                console.log("트랜스퍼 성공")
            }else if(!(a.boolconfirm||(a.balanceconfirm&&a.transfer))){
                HttpSrvice.gotoalarmdelete(tableid);
                Router.push('/trade/cancel')
                console.log("잔액부족 ")
            }else{
                setboolconfirm(a.boolconfirm);
                setlodderbool(false);
            }


        })
    }

    return(
    <>
    <AppLayout>
        <Segment
        
         textAlign='center'
         style={{ minHeight: 550, padding: '1em 0em' }}
         vertical
        

        >
        <Dimmer active={lodderbool}>
            <Loader size='huge'>지갑 암호를 확인중입니다.</Loader>
        </Dimmer>

            <Dimmer active={boolconfirm}>
                <Loader size='huge'>확인완료 잠시만 기다려주세요.</Loader>
            </Dimmer>
        <Grid columns='equal' divided inverted padded>
            <Grid.Row color='black' textAlign='center'  style={{ minHeight: 550, padding: '1em 0em' }}>
                <Grid.Column>
                    <Segment color='black' inverted>
                        <Message icon>
                            <Icon name='sync' loading />
                            <Message.Content>

                                {(datetime===undefined) ? "": <Timer seconds={datetime}/>}

                                <Message.Header><Icon name='detective'/>경고 <Icon name='detective'/> 전송을 시작하면 취소가 불가능합니다.</Message.Header>
                                <Message.Header>지갑 암호를 넣어주세요.</Message.Header>

                                Please enter your wallet address.

                            </Message.Content>

                        </Message>

                        {!boolconfirm?<> <Input onChange={e => setPassword(e.target.value)} type="password" name="pass" placeholder="Password"/>
                                <Button inverted color='green' onClick={addrconfirm}>전송</Button></>:""}



                    </Segment>
                </Grid.Column>


            </Grid.Row>
        </Grid>
        </Segment>
        </AppLayout>
        </>)

}

export default exchange