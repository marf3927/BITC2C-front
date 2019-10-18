import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import { withRouter } from 'next/router'



const Exchange = ()=>{
    const baseURL = useSelector(state => state.auth.baseURL, [])

    useEffect(()=>{

    },[])

    return <div>{Router.query}</div>

}

export default Exchange;