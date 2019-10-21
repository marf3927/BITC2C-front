import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { withRouter } from 'next/router'

//구매와 판매 판별하는 함수
const Purchasedecide = ()=>{

}


const Exchange = ()=>{
    const baseURL = useSelector(state => state.auth.baseURL, [])

    useEffect(()=>{

    },[])
    
    return <div>Trade</div>

}

export default Exchange;