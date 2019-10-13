import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon} from 'semantic-ui-react'
import axios from 'axios'

const tradebox = require('../../module/tradeBox')

const TradeBoard = () => {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)

    const baseURL = 'http://localhost:5555'

    useEffect(() => {
        getItems()
    }, [ ,page])

    function getItems() {
        axios.get(baseURL + '/tradeboards/index/'+page)
            .then((response) => {
                const data = response.data
                setItems(data)
            })
    }

    function NextPageClick() {
        setPage(page+1)
    }

    function PreviousPageClick() {
        if (page>1){
            setPage(page-1)
        }
    }

    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
                />
            </Head>
            <AppLayout>
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
                            return <Table.Row key={item.id}>
                                    <Table.Cell>{item.method}</Table.Cell>
                                    <Table.Cell>{item.status}</Table.Cell>
                                    <Table.Cell>{item.type}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>{item.amount}</Table.Cell>
                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                </Table.Row>
                        })}

                    </Table.Body>
                </Table>

                <div>
                    <span><Button onClick={() => PreviousPageClick()}><Icon name="caret left"/></Button></span>
                    <span><a>{page}</a></span>
                    <span><Button onClick={() => NextPageClick()}><Icon name="caret right"/></Button></span>
                    <span className="ui icon input">
                        <Input type="text" id="page" name="page" placeholder="Page..."/>
                        <i aria-hidden="true" className="search circular link icon" onClick={e => {
                            if(document.getElementById('page').value>=1){
                                setPage(document.getElementById('page').value)
                            }
                        }}></i>
                    </span>

                </div>
            </AppLayout>
        </>
    )
}

export default TradeBoard
