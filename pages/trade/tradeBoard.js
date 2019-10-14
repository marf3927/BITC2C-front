import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import axios from 'axios'


const TradeBoard = () => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState("All")

    const baseURL = 'http://localhost:5555'

    useEffect(() => {
        getItems()
    }, [, page, selected])

    function getDetail(){
        return 
    }

    function getItems() {
        if (selected === "All") {
            axios.get(baseURL + '/tradeboards/index/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        } else if (selected === "Buy") {
            axios.get(baseURL + '/tradeboards/sell/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        } else if (selected === "Sell") {
            axios.get(baseURL + '/tradeboards/buy/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        }


    

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

    return (
        <>
            
            <AppLayout>
                <div>
                    <div className="ui pointing secondary menu">
                        <a id="All" className={`item ${selected ==="All" ? "active" : ""}`} onClick={() => tabClick("All")}>All</a>
                        <a id="Buy" className={`item ${selected ==="Buy" ? "active" : ""}`} onClick={() => tabClick("Buy")}>Buy</a>
                        <a id="Sell" className={`item ${selected ==="Sell" ? "active" : ""}`} onClick={() => tabClick("Sell")}>Sell</a>

                    </div>
                    <div className="ui segment active tab">
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>method</Table.HeaderCell>
                                <Table.HeaderCell>status</Table.HeaderCell>
                                <Table.HeaderCell>type</Table.HeaderCell>
                                <Table.HeaderCell>price</Table.HeaderCell>
                                <Table.HeaderCell>amount</Table.HeaderCell>
                                <Table.HeaderCell>updated</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map((item) => {

                                return   <Link href={{ pathname :"/trade/TBdetail", query : {id: item.id}}}  key={item.id} ><Table.Row >
                                    <Table.Cell>{item.method}</Table.Cell>
                                    <Table.Cell>{item.status}</Table.Cell>
                                    <Table.Cell>{item.type}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>{item.amount}</Table.Cell>
                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                </Table.Row>
                                </Link>
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
                </div>
            </AppLayout>
       </>
    )
}


export default TradeBoard;
