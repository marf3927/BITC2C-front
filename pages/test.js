import React, { useContext } from 'react'
import List from "../components/tradeMain/list"
import Writing from "../components/tradeMain/writing"
import Mypage from "../components/tradeMain/myWallet"
import AppLayout from '../components/AppLayout'
import Chart from "../components/tradeMain/chart"
import { Grid, Segment,Button } from 'semantic-ui-react'
import {HttpServiceContext} from "../store/HttpService"




const Home = () => {

    const HttpSrvice=useContext(HttpServiceContext);

    HttpSrvice.socket.get_socket().on('complete',()=>{
        console.log("왓는가???")
        Router.push('/trade/success')
    })


const onclick = ()=>{
    
    console.log("onlcick --")

    HttpSrvice.socket.get_socket().emit("success",{userid:2,tableid:65})
}
    return (

        <AppLayout>

         
         <Button onClick={onclick}>test buton</Button>


        </AppLayout>
    )
}

export default Home
