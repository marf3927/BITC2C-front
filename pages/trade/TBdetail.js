import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import axios from 'axios'

const TBdetail= ({})=>{
    const router = useRouter();
    const [items,setItems] =useState([])
    const [id,setId] = useState(router.query.id);
    const baseURL = 'http://localhost:5555'

    useEffect(() => {
        
        getItems()
    }, [ ,items,id])
    console.log('id',router.query.id);
    // console.log(props.location.query);
    function getItems(){
        setId(router.query.id)
        console.log('item11',router.query.id)
        console.log("asd1")
        
        axios.get(baseURL+'/detail?id='+id).then((response)=>{
            const data = response.data
            setItems(data)

        })
        console.log("asd2")
    }
   // console.log(props.key);
    return (
        <>

           
     <AppLayout>
            
            <a>{items.type}</a>
      

        </AppLayout>

     </>
    )
}

export default TBdetail;