import {createContext, useContext} from "react"
import axios from 'axios'
import Router from "next/router"
import {reaction} from 'mobx'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class HttpService {
    constructor() {
        this.state = {
            res: ''
        }
        this.isExpiredToken = false
        this.authToken = cookies.get("authToken")

        axios.defaults.baseURL = 'http://localhost:5555'

        axios.defaults.headers.common['authorization'] = 'jwt ' + this.authToken
        reaction(() => this.authToken, () => {
            axios.defaults.headers.common['token'] = this.authToken
        })

        axios.interceptors.response.use(response => {
            return response
        }, originalError => {
            const {config} = originalError
            if (originalError.response.data === 'jwt expired') {
                cookies.remove('authToken', {expires: 'Thu, 01 Jan 1970 00:00:01 GMT'})
                alert('로그인 세션이 만료되었습니다. ')
                Router.push('/user/login')
            }
            return Promise.reject(originalError)
        })

    }

    login(email, password) {
        return axios.post(('/users/login/'),
            {
                email,
                password
            })
    }

    getUser() {
        return axios.get('/users/getuser',).then((response) => {
            return response.data.id
        }).catch((e) => {
            return e
        })
    }

    getTradeDetail(id) {
        return axios.get('/trade/detail?id=' + id).then((res) => {
            return res
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
                sellerId: id
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
        }).then((res)=>{
            return res
        })
    }

    changePassword(email, password, newPassword){
        return axios.post((baseURL + '/pwd/change'),
            {
                email,
                password,
                newPassword
            }).then((res)=>{
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


}

export const HttpServiceContext = createContext(new HttpService())