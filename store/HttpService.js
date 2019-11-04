import {createContext, useContext} from "react"
import axios from 'axios'
import Router from "next/router"
import {action, computed, observable, reaction} from 'mobx'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class AuthStore {

    baseURL = "http://192.168.1.179:5555"

    @observable
    authToken = cookies.get('authToken')

    @action
    setToken(token) {
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

        axios.defaults.baseURL = 'http://192.168.1.179:5555'
        axios.defaults.headers.common['authorization'] = 'jwt ' + this.authStore.authToken
        reaction(() => this.authStore.authToken, () => {
            axios.defaults.headers.common['authorization'] = 'jwt' + this.authStore.authToken
        })
        axios.interceptors.response.use(response => {
            return response
        }, originalError => {
            const {config} = originalError
            if (originalError.response.data === 'jwt expired') {
                cookies.remove('authToken')
                alert('로그인 세션이 만료되었습니다. ')
                Router.push('/user/login')
            }
            return Promise.reject(originalError)
        })

    }

    // setting() {
    //     axios.defaults.headers.common['authorization'] = 'jwt ' + cookies.get("authToken")
    //     reaction(() => this.authToken, () => {
    //         axios.defaults.headers.common['token'] = this.authToken
    //     })
    // }

    login(email, password) {
        return axios.post(('/users/login/'),
            {
                email,
                password
            }).then((res) => {
            const token = res.data.token
            this.authStore.setToken(token)
            return token
        })
    }

    getUser() {
        return axios.get('/users/getuser').then((response) => {
            return response.data.id
        }).catch((e) => {
            console.log(e)
            return e
        })
    }

    getTradeItem(id) {
        return axios.get('/trade/detail?id=' + id).then((response) => {
            return response.data
        })
    }

    createTrade(sellcoinselectd, buycoinselectd, selltokenamount, buytokenamount, id) {
        return axios.post(('/trade/create/'),
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

    goToTrade(id) {
        return axios.post('/trade/exchange', {
            id: id
        }).then((res) => {
            return res
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


    goToTrade() {
        return axios.post('/trade/exchange', {
            token, id
        }).then((data) => {
            console.log('goto tarde', data.data)
            Router.push({
                    pathname: '/trade/exchange',
                    query: {name: data.data}
                }
                , '/exchange'
            )
        })
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

    onRegisterClick(name, email, password){
        return axios.post(('/users/create/'),
            {
                email,
                name,
                password
            })
            .then((response) => {
            Router.push('/user/emailcheck/');
        })
    }

}

export const HttpServiceContext = createContext(new HttpService())