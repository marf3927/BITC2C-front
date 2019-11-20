import React, {useState, useEffect, useContext} from 'react'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab, Dropdown, Menu, Label, Segment, Grid, Message, Form} from 'semantic-ui-react'
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
        {key: 1, text: 'ETH', value: 'ETH' ,label: { color: 'red', empty: true, circular: true }},
        {key: 2, text: 'Atoken', value: 'Atoken',label: { color: 'blue', empty: true, circular: true }},
        {key: 3, text: 'Btoken', value: 'Btoken',label: { color: 'black', empty: true, circular: true }},
        {key: 4, text: 'Ctoken', value: 'Ctoken',label: { color: 'green', empty: true, circular: true }},
    ]

    const sellcoinoption = [
        {key: 1, text: 'ETH', value: 'ETH',label: { color: 'red', empty: true, circular: true }},
        {key: 2, text: 'Atoken', value: 'Atoken',label: { color: 'blue', empty: true, circular: true }},
        {key: 3, text: 'Btoken', value: 'Btoken',label: { color: 'black', empty: true, circular: true }},
        {key: 4, text: 'Ctoken', value: 'Ctoken',label: { color: 'green', empty: true, circular: true }},
    ]


    const onSelectChange = (e, result) => {
        const {text, value} = result
        console.log(value)
        setSelected(value)
    }

    const onSellCoinChange = (e, result) => {
        const {text, value} = result
        console.log(text)

        setsellcoinselectd(text)
    }

    const onBuyCoinChange = (e, result) => {
        const {text, value} = result
        console.log(value)
        setbuycoinselectd(text)
    }


    //글쓰기 등록
    function onRegisterClick(method) {
        HttpService.getUser().then((userId) => {
            var id = userId
            console.log('id', id)
            if (id) {
                console.log("판매테이블 생성")
                alert("거래 등록 완료!")
                return HttpService.createTrade(sellcoinselectd, buycoinselectd, selltokenamount, buytokenamount, id)
                    .then((response) => {
                        Router.push('/trade/tradeMain')
                    })
            } else {
                Router.push('/user/login/')
            }
        })
    }

    return (
        <>
       
            <Segment
                 style={{ minHeight: 350, padding: '2em 0em',margin: '2em 2em' }}
                 vertical
                >

<Grid columns='equal'>
    <Grid.Column>
      
    </Grid.Column>
    <Grid.Column width={16}>
    
    <Message width={3} color='purple'>거래등록</Message>

                        <Segment inverted textAlign={"left"}>
                        <Grid.Column style={{padding : '1em 0em'}}>
                            <Label color='blue' key="blue">
                                SELLCOIN
                            </Label>
                            <Dropdown
                                text={sellcoinselectd}
                                icon='bitcoin'

                                labeled
                                button
                                className='icon'
                                options={sellcoinoption}

                            >

                                <Dropdown.Menu>
                                <Dropdown.Header icon='tags' content='종류' />
                                <Dropdown.Menu scrolling>
                                    {buycoinoption.map((option) => (
                                        <Dropdown.Item key={option.value} onClick={onSellCoinChange}{...option} />
                                    ))}
                                </Dropdown.Menu>
                                </Dropdown.Menu>

                            </Dropdown>
                        {/*<Dropdown text={sellcoinoption.text} options={sellcoinoption} onChange={onSellCoinChange} simple*/}
                        {/*          item/>*/}

                    </Grid.Column>

                    <Grid.Column style={{padding : '1em 0em'}}>
                        <Label color='blue' key="blue">
                            AMOUNT
                        </Label> <Input type="number" onChange={e => setselltokenamount(e.target.value)} name="amount1"
                                       placeholder="거래량"/>
                   </Grid.Column>
                   <Grid.Column style={{padding : '1em 0em'}}>
                       <Label color='blue' key="blue">
                           BUYCOIN

                       </Label>
                       <Dropdown
                           text={buycoinselectd}
                           icon='bitcoin'

                           labeled
                           button
                           className='icon'
                           options={buycoinoption}

                       >

                           <Dropdown.Menu>
                               <Dropdown.Header icon='tags' content='종류' />
                               <Dropdown.Menu scrolling>
                                   {buycoinoption.map((option) => (
                                       <Dropdown.Item key={option.value} onClick={onBuyCoinChange}{...option} />
                                   ))}
                               </Dropdown.Menu>
                           </Dropdown.Menu>

                       </Dropdown>
                    </Grid.Column>
                    <Grid.Column style={{padding : '1em 0em'}}>
                        <Label color='blue' key="blue">
                            AMOUNT
                        </Label> <Input type="number" onChange={e => setbuytokenamount(e.target.value)} name="amount2"
                                       placeholder="거래량"/>
                    </Grid.Column>
                    <Grid.Column>
                        <Label color='blue' key="blue">
                            RATIO
                        </Label> <Label >{ratio}</Label>
                        </Grid.Column>
                        <Grid.Column>
                       
                        </Grid.Column>
                        </Segment>
                        <Segment vertical textAlign="right">
                        <Button positive id='writeTrade' onClick={() => onRegisterClick(2)}>
                            거래 등록
                        </Button>
                        </Segment>
                        
    </Grid.Column>
    <Grid.Column>
      
    </Grid.Column>
  </Grid>
               
                </Segment>   
          

        </>

    )
}


export default Writing