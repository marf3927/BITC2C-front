import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import {AuthStoreContext} from "../../store/AuthStroe"

const List = () => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = AuthStore.baseURL

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState("All")


    useEffect(() => {
        getItems()
    }, [, page, selected])

    function getItems() {
        if (selected === "All") {
            axios.get(baseURL + '/trade/index/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        } else if (selected === "Buy") {
            axios.get(baseURL + '/trade/sell/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        } else if (selected === "Sell") {
            axios.get(baseURL + '/trade/buy/' + page)
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
        }
    }
    function gotoDetail(itemiD, status, method){
        const itemID=itemiD;
        const statusCode=status
       // const method = method
        //진행상황이 0 이면 detail 페이지로 1이면 excahnge 페이지로
        if(statusCode === 0){
            Router.push({
            pathname : '/trade/detail',
            query : {id : itemID}
        },'/detail'
        )
        }else if(statusCode ===1){
            Router.push({
                pathname: '/trade/exchange',
                query: { name: method }
            }
            ,'/exchange'
            )
        }else{

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
    
    function WritingBoard() {
        console.log("writing");
        Router.push('/trade/writing');
    }
    
    //상태값에 따라서 화면렌더링 변환
    function statusdecide(status){
        if(status ===0){
            return "Standby"
        }else if(status ===1){
            return "Progress"
        }else{
            return "Complete"
        }
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
                                return  <Table.Row key={item.id} onClick={()=>gotoDetail(item.id,item.status,item.method)}>
                                    <Table.Cell>{item.method}</Table.Cell>
                                    <Table.Cell>{statusdecide(item.status)}</Table.Cell>
                                    <Table.Cell>{item.type}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>{item.amount}</Table.Cell>
                                    <Table.Cell>{item.updatedAt}</Table.Cell>
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
                    <span className="type_right"><Button id="WritingBoard" onClick={() => WritingBoard()}>Writing</Button></span>
                </div>
            </AppLayout>
       </>
    )
}


export default List;
