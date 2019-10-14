import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'

const TBdetail= ({})=>{
    const router = useRouter();
    const [items,setItems] =useState([])

    const baseURL = 'http://localhost:5555'

    useEffect(() => {
        console.log(router.query);
        getItems()
    }, [ ])

    // console.log(props.location.query);
    function getItems(id){
        axios.get(baseURL+'/detail?id='+id).then((response)=>{
            const data = response.data
            setItems(data)

        })
    }
   // console.log(props.key);
    return (
        <>

           
     <AppLayout>
            
            <a>{items.type}</a>
            <a>{router.query.detail}</a>

        </AppLayout>

     </>
    )
}

export default TBdetail;