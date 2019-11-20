import React, {useState, useEffect, useContext, useRef} from 'react'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Menu, Dropdown, Tab, Segment, Message} from 'semantic-ui-react'
import Router from "next/router"
import {HttpServiceContext} from "../../store/HttpService"

const List = () => {
    const HttpService = useContext(HttpServiceContext)

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [Sellselected, setSellselected] = useState("구매")
    const [Buyselected, setBuyselected] = useState("판매")
    const [Sortname, setSortname] = useState("")
    const [Iconbool, setIconbool] = useState(true)
    const idReference = useRef()

    const buyoption = [
        {key: 1, text: 'ETH', value: 'ETH'},
        {key: 2, text: 'Atoken', value: 'Atoken'},
        {key: 3, text: 'Btoken', value: 'Btoken'},
        {key: 4, text: 'Ctoken', value: 'Ctoken'},

    ]

    const selloption = [
        {key: 1, text: 'ETH', value: 'ETH'},
        {key: 2, text: 'Atoken', value: 'Atoken'},
        {key: 3, text: 'Btoken', value: 'Btoken'},
        {key: 4, text: 'Ctoken', value: 'Ctoken'},
    ]

    const onSellSelectChange = (e, result) => {
        const {text, value} = result
        setSellselected(value)
    }

    const onBuySelectChange = (e, result) => {
        const {text, value} = result
        setBuyselected(value)
    }

    useEffect(() => {
        getItems()
    }, [, page, Sellselected, Buyselected, Iconbool, Sortname])

    function getItems() {
        if (Sellselected === "판매" || Buyselected === "구매") {
            return
        }
        if (Sortname !== "") {
            HttpService.getTradeList(page, Sellselected, Buyselected, Sortname, Iconbool)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        } else {
            HttpService.getTradeList(page, Sellselected, Buyselected)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        }
    }

    function gotoDetail(itemiD, status, method) {

        console.log('click')
        const itemID = itemiD
        const statusCode = status
        // const method = method
        //진행상황이 0 이면 detail 페이지로 1이면 excahnge 페이지로
        if (statusCode === 0) {
            console.log('ssss')
            Router.push('/trade/detail?tableid='+itemID)
        } else if (statusCode === 1) {
            console.log('nnnnn')
            Router.push('/trade/exchange'
            )
        } else {
        }

    }

    function tabClicktoken(e) {
        setSelectedtoken(e)
        return true
    }


    function NextPageClick() {
        setPage(page + 1)
    }

    function PreviousPageClick() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function WritingBoard() {
        Router.push('/trade/tradewriting')
    }

//상태값에 따라서 화면렌더링 변환
    function statusdecide(status) {
        if (status === 0) {
            return "Standby"
        } else if (status === 1) {
            return "Progress"
        } else {
            return "Complete"
        }
    }

//정렬기능중 오름차순,내림차순에 따라 true false 값 반환

    function iconlist() {
        if (!Iconbool) {
            return <i className="caret down icon"></i>
        } else {
            return <i className="caret up icon"></i>
        }
    }

    const element = useRef()

    function decideSort(methodname) {
        if (Sortname === methodname) {
            return iconlist()
        }
    }

    function Sortlist(clicked) {
        setSortname(clicked)
        setIconbool(!Iconbool)
    }

    return (
        <>
          
                <Segment
                 
                 textAlign='center'
                 style={{ minHeight: 650, padding: '1em 0em' }}
                 vertical>
                <Message color='yellow'>거래등록현황</Message>
               
                <style jsx>{`
                    .type_right {
                        float: right;
                        color: rgb(92, 5, 80);
                    }
                `}</style>
                <div>
                    <Segment textAlign="left">
                    <Menu compact>
                        <Dropdown text={Sellselected} options={selloption} onChange={onSellSelectChange} simple item/>
                        <Dropdown text={Buyselected} options={buyoption} onChange={onBuySelectChange} simple item/>
                    </Menu>
                    </Segment>

                    <div className="ui segment active tab">
                        <Table singleLine >
                            <Table.Header>
                                <Table.Row>

                                    <Table.HeaderCell>SELL</Table.HeaderCell>
                                    <Table.HeaderCell
                                        onClick={() => Sortlist("selltokenamount")}>판매개수{decideSort("selltokenamount")}</Table.HeaderCell>
                                    <Table.HeaderCell>BUY</Table.HeaderCell>
                                    <Table.HeaderCell
                                        onClick={() => Sortlist("buytokenamount")}>구매개수{decideSort("buytokenamount")}</Table.HeaderCell>
                                    {/*<Table.HeaderCell*/}
                                    {/*    onClick={() => Sortlist("status")}>상태{decideSort("status")}</Table.HeaderCell>*/}
                                    {/*<Table.HeaderCell*/}
                                    {/*    onClick={() => Sortlist("updated")}>updated{decideSort("updated")}</Table.HeaderCell>*/}
                                    {/* <Table.HeaderCell onClick={() => Sortlist("Expirydate")}>Expiry
                                        date{decideSort("Expirydate")}</Table.HeaderCell> */}
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {items.map((item) => {
                                    return <Table.Row key={item.id} onClick={() => gotoDetail(item.id, item.status)}>
                                        <Table.Cell>{item.selltoken}</Table.Cell>
                                        <Table.Cell>{item.selltokenamount}</Table.Cell>
                                        <Table.Cell>{item.buytoken}</Table.Cell>
                                        <Table.Cell>{item.buytokenamount}</Table.Cell>
                                        <Table.Cell>{statusdecide(item.status)}</Table.Cell>
                                        <Table.Cell>{item.updatedAt}</Table.Cell>
                                        {/* <Table.Cell>{item.Expirydate}</Table.Cell> */}
                                    </Table.Row>

                                })}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                <div>
                    <span><Button onClick={() => PreviousPageClick()}><Icon name="caret left"/></Button></span>
                    <span><a>{page}</a></span>
                    <span><Button onClick={() => NextPageClick()}><Icon name="caret right"/></Button></span>
                    <span className="ui icon input">
                        <Input type="text" id="page" name="page" placeholder="Page..."/>
                        <i aria-hidden="true" className="search circular link icon" onClick={e => {
                            if (document.getElementById('page').value >= 1) {
                                setPage(document.getElementById('page').value)
                            }
                        }}></i>
                    </span>
                    <span className="type_right"><Button id="WritingBoard"
                                                         onClick={() => WritingBoard()}>Writing</Button></span>
                </div>
                </Segment>
            
        </>
    )
}


export default List
