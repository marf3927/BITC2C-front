import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import axios from 'axios';
const tradebox = require('../../module/tradeBox');






const TradeBoard =()=> {
    const [items, setItems] = useState([]);
    let i =1;

    axios.get('http://localhost:5555/tradeboards/index/'+i).then(response => {
        setItems(response.data);
        console.log(items)
    })
 
    console.log("items: " + items.toString())
    return (
        

        <AppLayout>
            
            <div className="trade-list-in">
                <div className="user-list average">
                    <div className="avatar-container middle zero">

                    </div>
                </div>

                <div calssName="info-wrapper">
                    <div className="name width20 spe-width">

                        <a>
                            <span>
                                <span className="font-weight">item</span>
                                {items.map(item => (
                                <span key={item.id}>{item.createdAt}</span>
                                ))}
                                <div className="icon-tips-hover ivu-tooltip"></div>
                            </span>
                        </a>
                    </div>
                    <span className="stars width20 average spe-width18">0.3729amount</span>
                    <span className="amout width20 average">1000000krw</span>
                    <span className="price average">10000000krw</span>
                    <div className="operation average">
                        <div className="trade-btn-control">
                            <button class="ui button">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default TradeBoard;