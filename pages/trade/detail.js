import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Cookies from 'js-cookie';
import {AuthStoreContext} from "../../store/AuthStroe"



const Detail = ({ id }) => {
    const AuthStore = useContext(AuthStoreContext)

    const baseURL = AuthStore.baseURL

    const router = useRouter();

    const [items, setItems] = useState([])
    

    //console.log('asdasd',id);
    useEffect(() => {

        getItems()
    }, [])

    // console.log(props.location.query);
    function getItems() {
        const { id } = router.query
        
        axios.get(baseURL + '/trade/detail?id=' + id).then((response) => {
            
            const data = response.data
            setItems(data)

        })
      
    }
    // console.log(props.key);
    function gotoTrade(){
        const token = Cookies.get("authToken");
        console.log(token);
       // const token = Cookies.get('authToken');
        //console.log('token = ',token);
        axios.get(baseURL +'/users/someAPI',{
            params:{
                token:token
            }
        }).then((data)=>{
            console.log(data.data.email);
            Router.push('/trade/Exchange')
        }).catch((e)=>{
            console.log(e);
        })
        
    }
    return (
        <>


            <AppLayout>
                <div className="ui two column centered grid">
                    {JSON.stringify(items)}
  
                        <div className="four column centered row">
                            <div className="column">
                                <button className="ui primary button" onClick={()=>gotoTrade()}>
                                    BUY
                 </button>
                            </div>
                            <div className="column">
                                
                            </div>
                        </div>
                    </div>
           

               
                
            </AppLayout>

        </>
    )
}

Detail.getInitialProps = async ({ req }) => {
    const res = await fetch('http://localhost:3000/trade/tradeBoard')
    return { id: res }
}

export default Detail;