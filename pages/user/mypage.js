import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import Cookies from 'js-cookie'
import {AuthStoreContext} from "../../store/AuthStroe"
import {HttpServiceContext} from "../../store/HttpService"

const Mypage = () => {
    const AuthStore = useContext(AuthStoreContext)
    const HttpService = useContext(HttpServiceContext)
    const baseURL = AuthStore.baseURL

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [wallets, setWallets] = useState([])
    const [boards, setBoards] = useState([])

    const token = Cookies.get("authToken")
    useEffect(() => {
        getId()
    }, [])

    function getId() {
        HttpService.getUser()
            .then((response) => {
                console.log(response)
                // data = JSON.parse(JSON.stringify(data))
                setUser(response)
            })
    }

    function getMyItems() {
        // user정보 가져오기
        axios.get(baseURL + '/mypage/user', {
            params: {
                id: user.id
            }
        }).then((data) => {
            console.log('ID ', data.data.id)
            // wallet 정보 가져오기
            axios.get(baseURL + '/mypage/wallet', {
                params: {
                    id: data.data.id
                }
            }).then((wdata) => {
                console.log("walletdata: ", wdata)

                // 거래게시판 이용내역 가져오기
                axios.get(baseURL + '/mypage/tboard', {
                    params: {
                        id: data.data.id
                    }
                }).then((board) => {
                    console.log("boards: ", board.data)

                    setBoards(board.data)

                    setWallets(wdata.data)

                    setUserData(data)
                })
            })
        })

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

    useEffect(() => {
        if (user) {
            getItems()
        }
    }, [user])


    useEffect(() => {
        console.log("userData: ", userData)
    }, [userData])


    return (

        <>

            <AppLayout>
                {console.log("확인")}
                <div>
                    <h1>MyPage</h1>
                    {
                        (function () {
                            if (userData) {
                                console.log("userData22222: ", userData)
                                return (

                                    <div>
                                        <div>
                                            Name: {userData.data.name}
                                        </div>
                                        <div>
                                            Email: {userData.data.email}
                                        </div>
                                        <div>
                                            Phone: {userData.data.phone}
                                        </div>
                                        <div>
                                            Point: {userData.data.point}
                                        </div>
                                        <div>
                                            계정생성일: {userData.data.createdAt}
                                        </div>
                                        <div>
                                            <br></br>
                                            <h2>지갑</h2>
                                            <Table singleLine>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Type</Table.HeaderCell>
                                                        <Table.HeaderCell>Address</Table.HeaderCell>
                                                        <Table.HeaderCell>Amount</Table.HeaderCell>

                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {wallets.map((data) => {
                                                        console.log("??? ", wallets)
                                                        return <Table.Row key={data.id}>
                                                            <Table.Cell>{data.type}</Table.Cell>
                                                            <Table.Cell>{data.address}</Table.Cell>
                                                            <Table.Cell>{data.amount}</Table.Cell>
                                                        </Table.Row>

                                                    })}
                                                </Table.Body>
                                            </Table>
                                        </div>
                                        <div>
                                            <br></br>
                                            <h2>거래내역</h2>
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
                                                    {boards.map((item) => {

                                                        return <Table.Row key={item.id}
                                                                          onClick={() => gotoDetail(item.id, item.status, item.method)}>
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
                                        </div>
                                    </div>
                                )
                            }
                        })()
                    }

                    <div>
                        <br></br>
                        <Link href="/user/changepwd"><a>비밀번호 변경</a></Link>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}


export default Mypage
