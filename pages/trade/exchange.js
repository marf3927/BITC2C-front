import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';

import Router,{ useRouter } from 'next/router'

//구매와 판매 판별하는 함수
const Purchasedecide = (method)=>{
    if(method ==="sell"){

        return <div>구매</div>
    }else{

    }
}


const Exchange = ()=>{
    const router = useRouter();
    
    useEffect(()=>{

    },[])
    console.log(router.query.name)
    return <div><h1>Hello</h1></div>

}

export default Exchange;