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



const Detail = ({ id }) => {
    const baseURL = useSelector(state => state.auth.baseURL, [])

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
            })
        })

        }
    return (
            <>


                <AppLayout>
                    <div className="ui two column centered grid">
                        {JSON.stringify(items)}

                        <div className="four column centered row">
                            <div className="column">
                                <button className="ui primary button" onClick={() => gotoTrade()}>
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
        const res = await fetch('http://localhost:3000/trade/list')
        return { id: res }
    }

    export default Detail;