import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';




const TBtrade = ()=>{
    const baseURL = useSelector(state => state.auth.baseURL, [])

    useEffect(()=>{

    },[])

    return <div>TBrade</div>

}

export default TBtrade;