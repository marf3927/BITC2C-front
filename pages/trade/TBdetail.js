import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'


const TBdetail= ({})=>{
    const router = useRouter();
   
    const [items,setItems] =useState([])
   
    const baseURL = 'http://localhost:5555'
    //console.log('asdasd',id);
    useEffect(() => {
        
        getItems()
    }, [])

    // console.log(props.location.query);
    function getItems(){
        const {id} = router.query
        console.log('asdfsasdf',id);
        axios.get(baseURL+'/tradeboards/detail?id='+id).then((response)=>{
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
            
          {items.type}


        </AppLayout>

     </>
    )
}

export default TBdetail;