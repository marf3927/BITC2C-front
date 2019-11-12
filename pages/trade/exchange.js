import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';

import Router,{ useRouter } from 'next/router'
import {Message} from 'semantic-ui-react';

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

    return(<>
        <Message
            header='지갑 비밀번호를 넣어주세요'
            content='Please enter your wallet address.'
        />

        </>)

}

export default Exchange;