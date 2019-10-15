import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'


const TBdetail = ({ id }) => {
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
        console.log('asdfsasdf', id);
        axios.get(baseURL + '/tradeboards/detail?id=' + id).then((response) => {
            console.log("start")
            const data = response.data
            setItems(data)

        })
        console.log("asd2")
    }
    // console.log(props.key);
    return (
        <>


            <AppLayout>
                <div class="ui two column centered grid">
                    {JSON.stringify(items)}
  
                        <div class="four column centered row">
                            <div class="column">
                                <button class="ui primary button">
                                    BUY
                 </button>
                            </div>
                            <div class="column">
                                
                            </div>
                        </div>
                    </div>
           

               
                
            </AppLayout>

        </>
    )
}

TBdetail.getInitialProps = async ({ req }) => {
    const res = await fetch('http://localhost:3000/trade/tradeBoard')
    return { id: res }
}

export default TBdetail;