import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'
import Router from "next/router"
import {Cookies} from 'react-cookie';
import { HttpServiceContext } from "../../store/HttpService"

const Mypage = () => {
    const HttpService = useContext(HttpServiceContext)

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [wallets, setWallets] = useState([]);
    const [boards, setBoards] = useState([]);

    const cookies = new Cookies()

    const token = cookies.get("authToken");
    useEffect(() => {
        getId()
    }, [])

    function getId() {

        HttpService.getUser().then((userId) => {
            var id = userId
            console.log('id', id);

            if (id) {
                setUser(id);
            }
            else {
                Router.push('/user/login/');
            }
        })
    }

    useEffect(() => {
        if (user) {
            getItems()
        }
    }, [user])


    useEffect(() => {
        console.log("userData: ", userData)
    }, [userData])


    function getItems() {
        // user정보 가져오기
        HttpService.myPageGetUser(user).then((data) => {
            console.log('ID ', data.data.id)

            // wallet 정보 가져오기
            HttpService.myPageGetWallet(data.data.id).then((wdata) => {
                console.log("walletdata: ", wdata);

                // 거래게시판 이용내역 가져오기
                HttpService.myPageGetTboard(data.data.id).then((board) => {
                    console.log("boards: ", board.data);
                    setBoards(board.data);
                    setWallets(wdata.data);
                    setUserData(data);
                });
            });
        });
    }

    function gotoDetail(itemiD, status, method) {
        const itemID = itemiD;
        const statusCode = status
        // const method = method
        //진행상황이 0 이면 detail 페이지로 1이면 excahnge 페이지로
        if (statusCode === 0) {
            Router.push({
                pathname: '/trade/detail',
                query: { id: itemID }
            }, '/detail'
            )
        } else if (statusCode === 1) {
            Router.push({
                pathname: '/trade/exchange',
                query: { name: method }
            }
                , '/exchange'
            )
        } else {

        }

    }

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
                                                        console.log("??? ", wallets);
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

                                                        return <Table.Row key={item.id} onClick={() => gotoDetail(item.id, item.status, item.method)}>
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
                                );
                            }
                        })()
                    }

                    <div>
                        <br></br>
                        <Link href="/user/changepwd"><a>비밀번호 변경</a></Link>
                    </div>
                    <div>
                        <button></button>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}


export default Mypage;
