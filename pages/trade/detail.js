import React, {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import {HttpServiceContext} from "../../store/HttpService"

const Detail = ({id}) => {
    const HttpService = useContext(HttpServiceContext)

    const [items, setItems] = useState([])
    const [userId, setUserId] = useState()
    const [tableId,settableId] = useState();
    //console.log('asdasd',id);
    useEffect(() => {
        getUser()
        getItems()
    }, [])

    useEffect(()=>{

    },[,items,userId])


    function confirmAction (message,callback,rejection) {
        if (confirm(message)) {
            callback()
        } else {
            rejection()
        }
    }

    // console.log(props.location.query);
    function getItems() {
        const id = Router.query.tableid
        HttpService.getTradeItem(id)
            .then((data) => {
                setItems(data)
        })
    }

    //토큰을 이용해서 USER 정보 가져오는 함수
    function getUser() {
        HttpService.getUser()
            .then((id) => {
                setUserId(id)
                console.log('userid = ', id)
            }).catch((e)=>{
            console.log(e);
        })
    }


    //글쓴이가 아닌 사람이 글을 눌렀을때 버튼이 활성화 할지 확인하는 함수
    function usermatch() {
        console.log('usermatch//')
        let error = new Error()

        console.log('userId ==',userId , 'usertype',typeof(userId))

        console.log('item seller id=',items.sellerId ,' items.sellerId',typeof(items.sellerId))
        if (userId === Number(items.sellerId) || typeof(userId)==='object' ) {
            console.log('user usermatch in')
            return true
        }
        return false
    }

    const rejection = () => console.log("fail")

    // console.log(props.key);
    function gotoTrade() {
        const id = Router.query.tableid
        const paramuserid = userId
        console.log('gotoTrade',id);
        HttpService.goToTrade(id,paramuserid)
            .then((res) => {
            console.log("thentnenth",res)
            Router.push('/trade/exchange')
        })
            .catch((e)=>{
                console.log(e);
            })
    }

    function tradealarm() {
        var opponentID = ''
        if (!items.sellerId) {
            opponentID = items.buyerId
        }
        else {
            opponentID = items.sellerId
        }

        var tradeData = {
            opponentID: opponentID,
            userId: userId,
            tableId: Router.query.tableid
        };

        console.log("opponentID: ", opponentID, " MYID: ", userId, " tableId: ", Router.query.tableid)
        HttpService.socket.get_socket().emit('trading', (tradeData))
    }

    return (

        <>
            <AppLayout>
                <div className="ui two column centered grid">
                    <form className="ui fluid form">
                        <div className="field">


                        </div>

                        <div className="field">
                            <label>sellToken : {items.selltoken}</label>
                        </div>
                        <div className="ui divider"></div>
                        <div className="field">
                            <label>sellamount : {items.selltokenamount}</label>

                        </div>
                        <div className="ui divider"></div>
                        <div className="field" placeholder="Last Name">

                            <label>buytoken : {items.buytoken}</label>
                        </div>
                        <div className="ui divider"></div>
                        <div className="inline field">
                            <label>buyamount : {items.buytokenamount}</label>
                        </div>
                        <div className="inline field">

                            <input type="text" placeholder="amount"/>
                            <div className="ui left pointing label">
                                구매할 수량
                            </div>
                        </div>
                        <div className="ui divider"></div>
                        <div className="inline field">
                            <div className="ui right pointing label">

                            </div>
                            <input type="password"/>
                        </div>
                        <div className="ui divider"></div>
                        <div className="inline field">
                            <div className="ui right pointing label">

                            </div>
                            <input type="password"/>
                        </div>
                        <div className="four column centered row">


                        </div>
                    </form>
                    <div className="column">
                        {usermatch() ? <h1>
                            거래현황
                        </h1> : <button className="ui primary button"
                                        onClick={()=>confirmAction("거래를 진행하시겠습니까?",gotoTrade, rejection)}>
                            BUY
                        </button>}

                    </div>
                    <div>
                        <Button onClick={() => tradealarm()}>
                            test
                            </Button>
                    </div>
                </div>


            </AppLayout>

        </>
    )
}

// Detail.getInitialProps = async ({req}) => {
//     const res = await fetch('http://192.168.1.173:3000/trade/list')
//     return {id: res}
// }

export default Detail