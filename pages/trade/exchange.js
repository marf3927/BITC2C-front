import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import {AuthStoreContext} from "../../store/AuthStroe"




const Exchange = ()=>{
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = AuthStore.baseURL

    useEffect(()=>{

    },[])

    return <div>TBrade</div>

}

export default Exchange;