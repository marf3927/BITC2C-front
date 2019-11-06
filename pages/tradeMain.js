import React from 'react'
import List from "../components/tradeMain/list"
import Writing from "../components/tradeMain/writing"
import Mypage from "../components/tradeMain/myWallet"
import AppLayout from '../components/AppLayout'
import Chart from "../components/tradeMain/chart"
import {Container, Divider, Grid, Header, Menu, Message, Segment, Table} from 'semantic-ui-react'


const Home = () => {
    return (
        <AppLayout>
            <style jsx>{`
        .div-master{
            display : flex;
            justify-content :space-around;
        }
        .div-left{
            flex: 1 1 25%;
            border-right-width : 1px;
            border-right-style : solid;
        }
        .div-middle{
            display : inline-flex;
            flex-direction : column;
            flex: 2 2 44%;
            border-right-width : 1px;
            border-right-style : solid;
        }
        .div-right{
            flex: 1 1 25%;
            border-right-width : 1px;
            border-right-style : solid;
        }
        .div-middle-top{
            border-bottom-width : 1px;
            border-bottom-style : solid;
        }
                `}</style>
    <div className="div-master">
        <div className="div-left">
            <List/>
        </div>
        <div className="div-middle">
            <div className="div-middle-top"><Chart/></div>
            <div className="div-middle-bottom"><Writing/></div>
        </div>
        <div className="div-right"><Mypage/></div>
    </div>
        </AppLayout>
    )
}

export default Home
