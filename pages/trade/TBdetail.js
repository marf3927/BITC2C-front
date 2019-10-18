import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useSelector} from "react-redux";
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Cookies from 'js-cookie';
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'


const TBdetail= ({id})=>{
    console.log("2222: ", id);
    const baseURL = useSelector(state => state.auth.baseURL, [])

    const router = useRouter();
    console.log("3333: ", router.query);
    const [items,setItems] =useState([])

    //console.log('asdasd',id);
    useEffect(() => {
        
        getItems()
    }, [])

    // console.log(props.location.query);
    function getItems(){
        const {id} = router.query
        console.log('!!!!!: ', router.query);
        axios.get(baseURL+'/tradeboards/detail?id='+id).then((response)=>{
           console.log("start")
            const data = response.data
            setItems(data)

        })
      
    }
    // console.log(props.key);
    function gotoTrade(){
        var token = Cookies.get("logintoken");
        console.log("zzzzzzzzz: ",token);
       // const token = Cookies.get('logintoken');
        //console.log('token = ',token);
        axios.get(baseURL +'/users/someAPI',{
            params: {
                token: token
            }
    }).then((data)=>{
            console.log(data);
            Router.push('/trade/TBtrade')
        })

    }
    // console.log(props.key);
    return (
        <>


            <AppLayout>
                <div>
                    <span><Button id="WritingBoard" onClick={() => gotoTrade()}>Writing</Button></span>


                </div>


            </AppLayout>

        </>
    )
}

TBdetail.getInitialProps = async ({ req }) => {
    const res = await fetch('http://localhost:3000/trade/tradeBoard')
    console.log("??????: ", res);
    return { id: res }
}

export default TBdetail;