import React, {useState, useEffect, useContext, useRef} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon,Menu, Dropdown,Tab} from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import {AuthStoreContext} from "../../store/AuthStroe"
import {HttpServiceContext} from "../../store/HttpService"

import {id} from 'postcss-selector-parser'

const List = () => {
    const AuthStore = useContext(AuthStoreContext)
    const HttpService = useContext(HttpServiceContext)
    const baseURL = AuthStore.baseURL

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState("All")

    const [Sortname, setSortname] = useState("");
    const [Iconbool,setIconbool] =useState(true);
    const idReference = useRef();

    const buyoption = [
        { key: 1, text: 'ETH', value: 'ETH' },
        { key: 2, text: 'Atoken', value: 'Atoken' },
        { key: 3, text: 'Btoken', value: 'Btoken' },
        { key: 4, text: 'Ctoken', value: 'Ctoken' },

    ]

    const selloption = [
        { key: 1, text: 'ETH', value: 'ETH' },
        { key: 2, text: 'Atoken', value: 'Atoken' },
        { key: 3, text: 'Btoken', value: 'Btoken' },
        { key: 4, text: 'Ctoken', value: 'Ctoken' },
    ]

    const onSellSelectChange = (e, result) => {
        const { text, value } = result;

        setSellselcted(value);
    }

    const onBuySelectChange = (e, result) => {
        const { text, value } = result;

        setBuyselcted(value);
    }

    useEffect(() => {
        getItems()

    }, [, page, selected, Iconbool, Sortname])

    function sortItems(level, method) {

        console.log("level=", level)
        HttpService.sortItems(level, method).then((response) => {
            const data = response.data
            setItems(data)
            console.log(data)
            console.log(items)
        })
    }


    }, [, page, Sellselected,Buyselected,Iconbool,Sortname,selectedtoken])
    function sortItems(level,method){


            axios.get(baseURL + '/trade/'+method+'/'+page,{
                params: {
                    method:Sortname,
                    order:level,
                    type:selectedtoken
                }
            })
                .then((response) => {
                    const data = response.data
                    setItems(data)


                })

    }


    function getItems() {

        if(Sellselected==="판매"||Buyselected==="구매"){

            return;
        }


        if(Sortname!==""){

            axios.get(baseURL + '/trade/index/' + page,{
                params: {
                    sellcoin:Sellselected,
                    buycoin:Buyselected,
                    method:Sortname,
                    order:Iconbool
                }
            })
                .then((response) => {
                    const data = response.data

                    setItems(data)
                })

        }else{

            axios.get(baseURL + '/trade/index/' + page,{
                params: {
                    sellcoin:Sellselected,
                    buycoin:Buyselected,

                }
            })
                .then((response) => {
                    const data = response.data

                    setItems(data)
                })
      
        }
    }

    function gotoDetail(itemiD, status, method) {
        const itemID = itemiD
        const statusCode = status
        // const method = method
        //진행상황이 0 이면 detail 페이지로 1이면 excahnge 페이지로
        if (statusCode === 0) {
            Router.push({
                    pathname: '/trade/detail',
                    query: {id: itemID}
                }, '/detail'
            )
        } else if (statusCode === 1) {
            Router.push({
                    pathname: '/trade/exchange',
                    query: {name: method}
                }
                , '/exchange'
            )
        } else {
        }
        
    }
    function tabClicktoken(e){
        setSelectedtoken(e)

        return true;
    }
    function tabClick(e) {


        setSelected(e)
        setPage(1)
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

        Router.push('/trade/writing');
        Router.push('/trade/writing')
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

            <AppLayout>
                <style jsx>{`
                    .type_right {
                        float: right;
                        color: rgb(92, 5, 80);
                    }
                `}</style>
                <div>

                <Menu compact>
                <Dropdown text={Sellselected} options={selloption} onChange={onSellSelectChange} simple item />
                <Dropdown text={Buyselected} options={buyoption} onChange={onBuySelectChange} simple item />
                 </Menu>

                    <div className="ui segment active tab">
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>

                                <Table.HeaderCell >SELL</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("selltokenamount")}>sellamount{decideSort("sellamount")}</Table.HeaderCell>
                                <Table.HeaderCell >BUY</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("buytokenamount")}>buyamount{decideSort("buymount")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("status")}>status{decideSort("status")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("updated")}>updated{decideSort("updated")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("Expirydate")}>Expiry date{decideSort("Expirydate")}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map((item) => {
                                return  <Table.Row key={item.id} onClick={()=>gotoDetail(item.id,item.status)}>
                                     <Table.Cell>{item.selltoken}</Table.Cell>
                                    <Table.Cell>{item.selltokenamount}</Table.Cell>
                                    <Table.Cell>{item.buytoken}</Table.Cell>
                                    <Table.Cell>{item.buytokenamount}</Table.Cell>
                                    <Table.Cell>{statusdecide(item.status)}</Table.Cell>
                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                    <Table.Cell>{item.Expirydate}</Table.Cell>
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
            </AppLayout>
        </>
    )
}


export default List
