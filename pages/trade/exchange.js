import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';

import Router,{ useRouter } from 'next/router'

//구매와 판매 판별하는 함수
const Purchasedecide = ()=>{

}


const Exchange = ()=>{
    const baseURL = useSelector(state => state.auth.baseURL, [])
    const router = useRouter();
    useEffect(()=>{

    },[])
    console.log(router.query.name)
    return <div><h1>Hello</h1></div>

}

export default Exchange;