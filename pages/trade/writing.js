import React, {useState, useEffect, useContext} from 'react'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab, Dropdown, Menu, Label} from 'semantic-ui-react'
import Router from 'next/router'
import {HttpServiceContext} from "../../store/HttpService"

const Writing = () => {
    const HttpService = useContext(HttpServiceContext)
    const [selected, setSelected] = useState("")

    const [sellcoinselectd, setsellcoinselectd] = useState('')
    const [buycoinselectd, setbuycoinselectd] = useState('')
    const [selltokenamount, setselltokenamount] = useState(0)
    const [buytokenamount, setbuytokenamount] = useState(0)
    const [ratio, setratio] = useState("")

    useEffect(() => {
        ratiocal()
    }, [, selltokenamount, buytokenamount])

    function ratiocal() {

        if ((selltokenamount !== 0 || selltokenamount !== null
            || selltokenamount !== undefined) && (buytokenamount !== 0 ||
            buytokenamount !== undefined || buytokenamount !== null)) {
            console.log("asd")
            const ratio = selltokenamount / buytokenamount
            const result = ratio.toString() + "  :   1"
            setratio(result)
        }
    }

    const buycoinoption = [
        {key: 1, text: 'ETH', value: 'ETH'},
        {key: 2, text: 'Atoken', value: 'Atoken'},
        {key: 3, text: 'Btoken', value: 'Btoken'},
        {key: 4, text: 'Ctoken', value: 'Ctoken'},
    ]

    const sellcoinoption = [
        {key: 1, text: 'ETH', value: 'ETH'},
        {key: 2, text: 'Atoken', value: 'Atoken'},
        {key: 3, text: 'Btoken', value: 'Btoken'},
        {key: 4, text: 'Ctoken', value: 'Ctoken'},
    ]


    const onSelectChange = (e, result) => {
        const {text, value} = result
        console.log(value)
        setSelected(value)
    }

    const onSellCoinChange = (e, result) => {
        const {text, value} = result
        console.log(value)
        setsellcoinselectd(value)
    }

    const onBuyCoinChange = (e, result) => {
        const {text, value} = result
        console.log(value)
        setbuycoinselectd(value)
    }


    //글쓰기 등록
    function onRegisterClick(method) {
        HttpService.getUser().then((userId) => {
            var id = userId
            console.log('id', id)
            if (id) {

                console.log("판매테이블 생성")
                return HttpService.createTrade(sellcoinselectd, buycoinselectd, selltokenamount, buytokenamount, id)
                    .then((response) => {
                        Router.push('/trade/list')
                    })


            } else {
                Router.push('/user/login/')
            }
        })
    }

    return (
        

            <div>
                <div>
                    <h1>교환</h1>
                    <div>
                        method: exchange
                    </div>
                    <div>
                        status: 0
                    </div>
                    <div>
                        sellcoin: <Menu compact>
                        <Dropdown text={sellcoinoption.text} options={sellcoinoption} onChange={onSellCoinChange} simple
                                  item/>
                    </Menu>
                    </div>

                    <div>
                        amount: <Input type="number" onChange={e => setselltokenamount(e.target.value)} name="amount1"
                                       placeholder="거래량"/>
                    </div>
                    <div>
                        buycoin: <Menu compact>
                        <Dropdown text={buycoinoption.text} options={buycoinoption} onChange={onBuyCoinChange} simple
                                  item/>
                    </Menu>
                    </div>
                    <div>
                        amount: <Input type="number" onChange={e => setbuytokenamount(e.target.value)} name="amount2"
                                       placeholder="거래량"/>
                    </div>
                    <div>
                        ratio : {ratio}
                    </div>
                    <div>
                        <Button id='writeTrade' onClick={() => onRegisterClick(2)}>
                            거래 등록
                        </Button>
                    </div>
                </div>
            </div>
        

    )
}


export default Writing