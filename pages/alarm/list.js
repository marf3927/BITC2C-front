import React, { useState, useEffect, useContext, useRef } from 'react'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Menu, Dropdown, Tab, Segment, Grid, Label } from 'semantic-ui-react'
import Router from "next/router"
import { HttpServiceContext } from "../../store/HttpService"

const List = () => {
    const HttpService = useContext(HttpServiceContext)

    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])
    
    //상태값에 따라서 화면렌더링 변환
    function statusdecide(status) {
        if (status === 2) {
            return "Complete"
        } else if (status === 1) {
            return "Progress"
        }
    }

    function getItems() {
        HttpService.getAlarmlist()
            .then((response) => {
                const data = response.data
                console.log("zzzzzzzzzzzzzzzzz: ", data);
                setItems(data);
            })
    }

    function gotoTrade(tableid, UserId) {
        Router.push('/trade/exchange')
    }

    return (
        <>
            <AppLayout>
                <Segment
                    style={{ minHeight: 650, padding: '5em 0em' }}
                    vertical
                >

                    <Grid columns='equal'>
                        <Grid.Column>

                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Label as='a' color='red' tag>
                                알람
                            </Label>
                            <Table singleLine>
                                <Table.HeaderCell> SELL</Table.HeaderCell>
                                <Table.HeaderCell>sellamount</Table.HeaderCell>
                                <Table.HeaderCell> BUY</Table.HeaderCell>
                                <Table.HeaderCell>buyamount</Table.HeaderCell>
                                <Table.HeaderCell> date</Table.HeaderCell>
                                <Table.HeaderCell> status</Table.HeaderCell>
                                <Table.Body>
                                    {items.map((item) => {
                                        return <Table.Row key={item.id} onClick={() => gotoTrade(item.tableid, item.UserId)}>
                                            <Table.Cell>{item.selltoken}</Table.Cell>
                                            <Table.Cell>{item.selltokenamount}</Table.Cell>
                                            <Table.Cell>{item.buytoken}</Table.Cell>
                                            <Table.Cell>{item.buytokenamount}</Table.Cell>
                                            <Table.Cell>{item.createdAt}</Table.Cell>
                                            <Table.Cell>{statusdecide(item.status)}</Table.Cell>
                                        </Table.Row>

                                    })}
                                </Table.Body>
                            </Table>


                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                    </Grid>

                </Segment>
            </AppLayout>
        </>
    )
}



export default List
