import React, {useState, useEffect, useContext} from 'react'
import Router,{ useRouter } from 'next/router';
import DividerExampleVerticalForm from "../../components/Divder";


//구매와 판매 판별하는 함수


const Exchange = ()=>{
    const router = useRouter();
    
    useEffect(()=>{

    },[])

    return(<>
      <DividerExampleVerticalForm/>
        </>)

}

export default Exchange;