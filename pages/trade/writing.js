import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Tab, Dropdown, Menu, Label } from 'semantic-ui-react'
import axios from 'axios'
import Router from 'next/router'
import Cookies from 'js-cookie';
import {AuthStoreContext} from '../../store/AuthStroe'

const Writing = () => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = AuthStore.baseURL
    const [selected, setSelected] = useState("")


    const [sellcoinselectd, setsellcoinselectd] = useState('')
    const [buycoinselectd, setbuycoinselectd] = useState('')
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')




    const options = [
        { key: 1, text: 'BUY', value: 1 },
        { key: 2, text: 'SELL', value: 2 },
    ]

    const buycoinoption = [
        { key: 1, text: 'ETH', value: 'ETH' },
        { key: 2, text: 'Atoken', value: 'Atoken' },
        { key: 3, text: 'Btoken', value: 'Btoken' },
        { key: 4, text: 'Ctoken', value: 'Ctoken' },
    ]

    const sellcoinoption = [
        { key: 1, text: 'ETH', value: 'ETH' },
        { key: 2, text: 'Atoken', value: 'Atoken' },
        { key: 3, text: 'Btoken', value: 'Btoken' },
        { key: 4, text: 'Ctoken', value: 'Ctoken' },
    ]


    const onSelectChange = (e, result) => {
        const { text, value } = result;
        console.log(value);
        setSelected(value);
    }

    const onSellCoinChange = (e, result) => {
        const { text, value } = result;
        console.log(value);
        setsellcoinselectd(value);
    }

    const onBuyCoinChange = (e, result) => {
        const { text, value } = result;
        console.log(value);
        setbuycoinselectd(value);
    }


    //글쓰기 등록
    function onRegisterClick(method) {

        const token = Cookies.get("authToken");
        console.log(token);

        axios.get(baseURL + '/users/getuser', {
            params: {
                token: token
            }
        }).then((data) => {
            var id = data.data.id;
            console.log('id', id);

            if (id) {
                if (method == "1") {
                    console.log("판매테이블 생성");
                    return axios.post((baseURL + '/trade/create/'),
                        {
                            type: coin,
                            amount: amount,
                            price: price,
                            method: "buy",
                            status: "0",
                            buyerId: id
                        })
                        .then((response) => {
                            Router.push('/trade/list');
                        })
                }
                else if (method == "2") {
                    console.log("구매테이블 생성");
                    return axios.post((baseURL + '/trade/create/'),
                        {
                            type: coin,
                            amount: amount,
                            price: price,
                            method: "sell",
                            status: "0",
                            sellerId: id
                        })
                        .then((response) => {
                            Router.push('/trade/list');
                        })
                }
            }
            else{
                Router.push('/user/login/');
            }
        })
    }

    return (
        <AppLayout>
            <Menu compact>
                <Dropdown text='종류 선택' options={options} onChange={onSelectChange} simple item />
            </Menu>
            <div>
                {
                    (function () {
                        if (selected == '1') return (
                            <div>
                                <h1>구매</h1>
                                <div>
                                    method: buy
                                </div>
                                <div>
                                    status: 0
                                </div>
                                <div >
                                    buycoin: <Menu compact>
                                        <Dropdown text={sellcoinoption.text} options={sellcoinoption} onChange={onBuyCoinChange} simple item />
                                    </Menu>
                                </div>
                                <div >
                                    sellcoin: <Menu compact>
                                        <Dropdown text={buycoinoption.text} options={buycoinoption} onChange={onSellCoinChange} simple item />
                                    </Menu>
                                </div>
                                <div>
                                    price: <Input type="number" onChange={e => setPrice(e.target.value)} name="price" placeholder="가격" />
                                </div>
                                <div>
                                    amount: <Input type="number" onChange={e => setAmount(e.target.value)} name="amount" placeholder="거래량" />
                                </div>
                                <div >
                                    <Button id='writeTrade' onClick={() => onRegisterClick(1)}>
                                        거래 등록
                                    </Button>
                                </div>

                            </div>
                        );
                        else if (selected == '2') return (
                            <div>
                                <h1>판매</h1>
                                <div>
                                    method: sell
                                </div>
                                <div>
                                    status: 0
                                </div>
                                <div >
                                    sellcoin: <Menu compact>
                                        <Dropdown text={sellcoinoption.text} options={sellcoinoption} onChange={onSellCoinChange} simple item />
                                    </Menu>
                                </div>
                                <div >
                                    buycoin: <Menu compact>
                                        <Dropdown text={buycoinoption.text} options={buycoinoption} onChange={onBuyCoinChange} simple item />
                                    </Menu>
                                </div>
                                <div>
                                    price: <Input type="number" onChange={e => setPrice(e.target.value)} name="price" placeholder="가격" />
                                </div>
                                <div>
                                    amount: <Input type="number" onChange={e => setAmount(e.target.value)} name="amount" placeholder="거래량" />
                                </div>
                                <div >
                                    <Button id='writeTrade' onClick={() => onRegisterClick(2)}>
                                        거래 등록
                                    </Button>
                                </div>

                            </div>
                        );
                        else return (<div>x</div>);
                    })()
                }

            </div>

        </AppLayout>

    )
}


export default Writing;