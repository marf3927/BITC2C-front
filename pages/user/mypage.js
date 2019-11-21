import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
<<<<<<< HEAD
import { Button, Table, Input, Icon, Tab, Message, Segment} from 'semantic-ui-react'
=======
import {Button, Table, Input, Icon, Tab, Segment, Message} from 'semantic-ui-react'
>>>>>>> ab1ae90c14b48febd066d370dbd6e3c51cd3fd6b
import Router from "next/router"
import {Cookies} from 'react-cookie'
import {HttpServiceContext} from "../../store/HttpService"

const Mypage = () => {
    const HttpService = useContext(HttpServiceContext)

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [wallets, setWallets] = useState([])
    const [boards, setBoards] = useState([])
    const [walletsamount, setwalletsamount] = useState([[,]])
    const [balance, setBalance] = useState([])

    const cookies = new Cookies()

    const token = cookies.get("authToken")
    useEffect(() => {
        getId()
    }, [])

    function getId() {
        HttpService.getUser().then((userId) => {
            var id = userId
            if (id) {
                setUser(id)
            } else {
                Router.push('/user/login/')
            }
        })
    }

    useEffect(() => {
        if (user) {
            getItems()
        }
    }, [user])

    function getItems() {
        // user정보 가져오기
        HttpService.myPageGetUser(user).then((data) => {
            // wallet 정보 가져오기
            HttpService.myPageGetWallet(data.data.id).then((wdata) => {
                // 거래게시판 이용내역 가져오기
                HttpService.myPageGetTboard(data.data.id).then((board) => {
                    console.log(board.data)
                    setBoards(board.data)
                    setWallets(wdata.data)
                    setUserData(data)
                })
            })
        })
    }


    function dictionaryfunc(type) {
        for (let i = 0; i < walletsamount.length; i++) {
            if (walletsamount[i][0] === type) {
                return walletsamount[i][0]
            } else {
                return
            }

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

    function GetBalance(address) {
        HttpService.myPageGetBalance(address).then((res) => {
                setBalance(res.data)
            }
        )
    }

    return (
        <>
            <AppLayout>
                <Segment
                
                style={{ minHeight: 650, padding: '1em 0em' }}
                vertical
                
                >
                <div>
                <Message color='green'>MyPage</Message>
                  
                    {
                        (function () {
                            if (userData) {
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
                                            <Button onClick={() => GetBalance(wallets[0].address)}>잔액 조회</Button>
                                            <Table singleLine>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Address</Table.HeaderCell>
                                                        <Table.HeaderCell>ETH</Table.HeaderCell>
                                                        <Table.HeaderCell>A_Token</Table.HeaderCell>
                                                        <Table.HeaderCell>B_Token</Table.HeaderCell>
                                                        <Table.HeaderCell>C_Token</Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {wallets.map((data) => {
                                                        return <Table.Row key={data.id}>
                                                            <Table.Cell>{data.address}</Table.Cell>
                                                            <Table.Cell>{balance[3]}</Table.Cell>
                                                            <Table.Cell>{balance[0]}</Table.Cell>
                                                            <Table.Cell>{balance[1]}</Table.Cell>
                                                            <Table.Cell>{balance[2]}</Table.Cell>
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
                                                        <Table.HeaderCell>내 토큰</Table.HeaderCell>
                                                        <Table.HeaderCell>거래량</Table.HeaderCell>
                                                        <Table.HeaderCell></Table.HeaderCell>
                                                        <Table.HeaderCell>교환 토큰</Table.HeaderCell>
                                                        <Table.HeaderCell>거래량</Table.HeaderCell>
                                                        <Table.HeaderCell>상태</Table.HeaderCell>
                                                        <Table.HeaderCell>등록 날짜</Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {boards.map((item) => {
                                                        if (userData.data.id === item.buyerId) {
                                                            return (
                                                                <Table.Row key={item.id}
                                                                           onClick={() => gotoDetail(item.id, item.status, item.method)}>
                                                                    <Table.Cell>{item.buytoken}</Table.Cell>
                                                                    <Table.Cell>{item.buytokenamount}</Table.Cell>
                                                                    <Table.HeaderCell>{"==>"}</Table.HeaderCell>
                                                                    <Table.Cell>{item.selltoken}</Table.Cell>
                                                                    <Table.Cell>{item.selltokenamount}</Table.Cell>
                                                                    <Table.Cell>{item.status}</Table.Cell>
                                                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        } else {
                                                            return (
                                                                <Table.Row key={item.id}
                                                                           onClick={() => gotoDetail(item.id, item.status, item.method)}>
                                                                    <Table.Cell>{item.selltoken}</Table.Cell>
                                                                    <Table.Cell>{item.selltokenamount}</Table.Cell>
                                                                    <Table.HeaderCell><Icon name = "arrow right" /></Table.HeaderCell>
                                                                    <Table.Cell>{item.buytoken}</Table.Cell>
                                                                    <Table.Cell>{item.buytokenamount}</Table.Cell>
                                                                    <Table.Cell>|  {item.status}</Table.Cell>
                                                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        }


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
                </Segment>
            </AppLayout>
        </>
    )
}


export default Mypage
