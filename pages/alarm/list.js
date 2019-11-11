import React, { useState, useEffect, useContext, useRef } from 'react'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Menu, Dropdown, Tab } from 'semantic-ui-react'
import Router from "next/router"
import { HttpServiceContext } from "../../store/HttpService"

const List = () => {
    const HttpService = useContext(HttpServiceContext)

    const [items, setItems] = useState([])

    useEffect(() => {
        getItems()
    }, [])

    function getItems() {
        HttpService.getAlarmlist()
            .then((response) => {
                const data = response.data
                console.log("zzzzzzzzzzzzzzzzz: " , data);
                setItems(data);
            })
    }

      return (
        <>
            <AppLayout>
                <div>
                    <div className="ui segment active tab">
                        <Table singleLine>
                            <Table.Body>
                                {items.map((item) => {
                                    return <Table.Row key={item.id} >
                                        <Table.Cell>{item.selltoken}</Table.Cell>
                                        <Table.Cell>{item.selltokenamount}</Table.Cell>
                                        <Table.Cell>{item.buytoken}</Table.Cell>
                                        <Table.Cell>{item.buytokenamount}</Table.Cell>
                                        <Table.Cell>{item.updatedAt}</Table.Cell>
                                        <Table.Cell>{item.Expirydate}</Table.Cell>
                                    </Table.Row>

                                })}
                            </Table.Body>
                        </Table>
                    </div>
                    
                </div>

            </AppLayout>
        </>
    )
}
  


export default List
