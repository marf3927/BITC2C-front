import React, {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import AppLayout from '../../components/AppLayout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import {AuthStoreContext} from "../../store/AuthStroe"
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import {HttpServiceContext} from "../../store/HttpService"


const Detail = ({id}) => {
    const AuthStore = useContext(AuthStoreContext)
    const HttpService = useContext(HttpServiceContext)
    const baseURL = AuthStore.baseURL

    const router = useRouter()

    const [items, setItems] = useState([])
    const [userId, setUserId] = useState()

    //console.log('asdasd',id);
    useEffect(() => {
        getItems()
        getUser()
        console.log(id)
    }, [])

    const useConfirm = (message = "", callback, rejection) => {
        if (typeof callback !== "function") {
            return
        }
        const confirmAction = () => {
            if (confirm(message)) {
                callback()
            } else {
                rejection()
            }
        }

        return confirmAction
    }

    // console.log(props.location.query);
    function getItems() {
        const id = router.query.id
        HttpService.getTradeDetail(id)
            .then((response) => {
                console.log(response)
            setItems(response.data)
        })
    }

    //토큰을 이용해서 USER 정보 가져오는 함수
    function getUser() {
        HttpService.getUser()
            .then((id) => {
                setUserId(id)
                console.log('item = ', id)
            })
    }


    //글쓴이가 아닌 사람이 글을 눌렀을때 버튼이 활성화 할지 확인하는 함수
    function usermatch() {
        console.log('usermatch//')
        console.log(items)
        if (userId === items.sellerId || items.buyerId) {
            return false
        }

        return true
    }

    const rejection = () => console.log("fail")

    // console.log(props.key);
    function goToTrade() {
        const {id} = router.query
        console.log(token)
        // const token = Cookies.get('logintoken');
        //console.log('token = ',token);
        HttpService.goToTrade(id)
            .then((data) => {
                console.log('goto tarde', data.data)
                Router.push({
                        pathname: '/trade/exchange',
                        query: {name: data.data}
                    }
                    , '/exchange'
                )
            })
    }

    

    return (
        <>
            <AppLayout>
                <div className="ui two column centered grid">
                    <form className="ui fluid form">
                        <div className="field">
                            <img className="ui medium circular image" src="http://localhost:3000/images/eth.png"/>

                        </div>
                        <div className="field">
                            <label>selltoken : {items.selltoken}</label>

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
                            <div className="column">
                                {usermatch() ? <h1>
                                    거래현황
                                </h1> : <button className="ui primary button"
                                                onClick={useConfirm("거래를 진행하시겠습니까?", () => gotoTrade(), rejection)}>
                                    BUY
                                </button>}

                            </div>

                        </div>
                    </form>

                </div>


            </AppLayout>

        </>
    )
}


Detail.getInitialProps = async ({req}) => {
    const res = await fetch('http://localhost:3000/trade/list')
    return {id: res}
}

export default Detail