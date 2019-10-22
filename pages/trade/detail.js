
import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AppLayout from '../../components/AppLayout'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import Cookies from 'js-cookie';
import {AuthStoreContext} from "../../store/AuthStroe"
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'




const Detail = ({ id }) => {
    const AuthStore = useContext(AuthStoreContext)

    const baseURL = AuthStore.baseURL

    const router = useRouter();

    const [items, setItems] = useState([])
    const [userId,setUserId] = useState();

    //console.log('asdasd',id);
    useEffect(() => {


        getItems(),
        getUser()
        

    }, [])

    // console.log(props.location.query);
    function getItems() {
        
        const id  = router.query.id
        console.log('console getitems',id)
        axios.get(baseURL + '/trade/detail?id=' + id).then((response) => {

            const data = response.data
            setItems(data)

        })

    }

    //토큰을 이용해서 USER 정보 가져오는 함수
    function getUser(){

        const token = Cookies.get("authToken");
        axios.get(baseURL + '/users/getuser',{
            params: {
                token:token
            }

        }).then((data)=>{
            setUserId(data.data.id);
            console.log('item = ',data.data.id);
        })
    }
    
    
    //글쓴이가 아닌 사람이 글을 눌렀을때 버튼이 활성화 할지 확인하는 함수
    function usermatch(){
        console.log('usermatch//')
        console.log(items);
        if(userId === items.sellerId||items.buyerId){
            return false;
        }

        return true;
    }


    // console.log(props.key);
    function gotoTrade() {
        const { id } = router.query

        const token = Cookies.get("logintoken");
        console.log(token);
        // const token = Cookies.get('logintoken');
        //console.log('token = ',token);
        axios.post(baseURL + '/trade/exchange', {
            token, id
        }).then((data) => {
            console.log('goto tarde', data.data);
            Router.push({
                pathname: '/trade/exchange',
                query: { name: data.data }
            }
            ,'/exchange'
            )
        })

        }
    return (
            <>


                <AppLayout>
                    <div className="ui two column centered grid">
                        {JSON.stringify(items)}
                        userId ={userId}
                        <div className="four column centered row">
                            <div className="column">
                                {usermatch()  ? <h1>
                                    거래현황
                                </h1>: <button className="ui primary button" onClick={() => gotoTrade()}>
                                    BUY
                                </button>}
                                
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
        const res = await fetch('http://localhost:3000/trade/list')
        return { id: res }
    }

    export default Detail;