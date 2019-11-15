import { createContext, useContext } from "react"
import axios from 'axios'
import Router from "next/router"
import { action, computed, observable, reaction } from 'mobx'
import { Cookies } from "react-cookie"
import io from 'socket.io-client'

const cookies = new Cookies()

class SocketIo {
    socket = ""

    @observable
    alarms = []

    constructor() {
        this.socket = io.connect('http://localhost:5555')
    }

    get_socket() {
        return this.socket
    }

    @action
    set_alarms(data) {
        this.alarms.push(data)
    }

    get_alarm() {
        return this.alarms
    }

}

class AuthStore {

    baseURL = "http://localhost:5555"

    @observable
    authToken = cookies.get('authToken')

    @action
    setToken(token) {
        cookies.remove('authToken')
        this.authToken = token
        cookies.set('authToken', token)
        Router.push('/')
    }

    @action
    deleteToken() {
        cookies.remove('authToken')
        Router.push('/')
    }

    @computed
    get isLoggedIn() {
        return cookies.get('authToken') != null
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }
}


class HttpService {
    constructor() {
        this.authStore = new AuthStore()
        this.socket = new SocketIo()
        if (this.authStore.authToken != undefined) {
            this.getUser().then((userid) => {
                console.log("userid: ", userid)
                this.socket.get_socket().emit('storeClientInfo', userid);
            });

        }
        axios.defaults.baseURL = this.authStore.baseURL
        axios.defaults.headers.common['authorization'] = 'jwt ' + this.authStore.authToken
        reaction(() => this.authStore.authToken, () => {
            axios.defaults.headers.common['authorization'] = 'jwt ' + this.authStore.authToken
        })
        axios.interceptors.response.use(response => {
            return response
        }, originalError => {
            const { config } = originalError
            try{
                if (originalError.response.data === 'jwt expired') {
                    cookies.remove('authToken' , {path :  ' / ' })
                    Router.push('/user/login')
                    return alert('로그인 세션이 만료되었습니다. ')
                }
            }
            catch (e) {
                return Promise.reject(originalError)
            }
            return Promise.reject(originalError)
        })
    }

    getUser() {
        return axios.get('/users/getuser/').then((response) => {
            console.log(response)
            return response.data.id
        }).catch((e) => {
            console.log(e)
            return e
        })
    }

    login(email, password) {
        return axios.post(('/users/login/'),
            {
                email,
                password
            }).then((res) => {
                const token = res.data.token
                this.authStore.setToken(token)
                this.getUser().then((userid) => {
                    this.socket.get_socket().emit('storeClientInfo', userid);
                });
            }).catch((e)=>{
                console.log(e)
        })
    }

    getTradeItem(id) {
        return axios.get('/trade/detail?id=' + id).then((response) => {
            return response.data
        })
    }

    createTrade(sellcoinselectd, buycoinselectd, selltokenamount, buytokenamount, id) {
        return axios.post(('/trade/create'),
            {
                selltoken: sellcoinselectd,
                buytoken: buycoinselectd,
                selltokenamount: selltokenamount,
                buytokenamount: buytokenamount,
                status: "0",
                sellerId: id,
                buyerId: ''
            })
    }



    getTradeList(page, Sellselected, Buyselected, Sortname, Iconbool) {
        return axios.get('/trade/index/' + page, {
            params: {
                sellcoin: Sellselected,
                buycoin: Buyselected,
                method: Sortname,
                order: Iconbool
            }
        }).then((res) => {
            return res
        })
    }

    changePassword(email, password, newPassword) {
        return axios.post((baseURL + '/pwd/change'),
            {
                email,
                password,
                newPassword
            }).then((res) => {
                this.authStore.deleteToken()
                Router.push('/user/login')
                return res
            })
    }

    sortItems(level, method) {
        return axios.get('/trade/' + method + '/' + page, {
            params: {
                method: Sortname,
                order: level
            }
        })
    }
    gotoaddrconfirm(password,TableID){

        const token = this.authStore.authToken;

        return axios.post('/trade/confirm',{
                token,password,TableID
        })
    }

    confirmsellbuy(boardId){
        return axios.pose('/trade/sellandbuy',{
            boardId
        })
    }

    goToTrade(boardId,userId) {
        return axios.post('/trade/exchange', {
            boardId,userId
        }).then((res) => {
            console.log("thentnenth",res)
            Router.push('/trade/exchange')
        })
            .catch((e)=>{
                console.log(e);
            })
    }

    gotoGetDate(){
        return axios.get('/trade/gettime',)
    }

    myPageGetUser(user) {
        return axios.get('/mypage/user', {
            params: {
                id: user
            }
        })
    }

    myPageGetWallet(data) {
        return axios.get('/mypage/wallet', {
            params: {
                id: data
            }
        })
    }

    myPageGetTboard(data) {
        return axios.get('/mypage/tboard', {
            params: {
                id: data
            }
        })
    }

    myPageGetBalance(addr){
        return axios.get('/mypage/getbalance',{
            params:{
                address :addr
            }
        })
    }

    onRegisterClick(name, email, password) {
            axios.post(('/users/create'),
                {
                    email,
                    name,
                    password,

                })
                .then((response) => {
                    Router.push('/user/emailcheck')
                }).catch((e)=>{
                    console.log(e)
            })
    }

    forgotPwd(name, email) {
        return axios.post('/pwd/forgot/',
            {
                email,
                name
            })
            .then((response) => {
                Router.push('/user/login')
            })
    }

    getAlarm() {
        return axios.get('alarm/data')
            .then((res)=>{
                return res
            })
    }

    getAlarmlist() {
        return axios.get('alarm/list/')
            .then((res) => {
                return res
            })
    }

}

export const HttpServiceContext = createContext(new HttpService())