import React from 'react';

import axios from 'axios';

function getBoarditem(page){
    let i =page;
    axios.get('http://localhost:5555/trade/index/'+i).then((response)=>{
        console.log(response)
        return  response.data
    });

    
}


const TradeBox=()=>{
    
    return


}

module.exports ={getBoarditem}