import {createContext, useContext} from "react"
import axios from 'axios'
import Router from "next/router"
import {reaction} from 'mobx'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class HttpService {
    authToken = ''
    constructor() {
        this.state = {
            res : ''
        };

        this.authToken = cookies.get("authToken")

        console.log("http확인: ", this.authToken)

        axios.defaults.baseURL = 'http://localhost:5555'    

        

        axios.interceptors.response.use(response => {
            return response
        }, originalError => {
            const {config} = originalError
            console.log(originalError.response.data)
            if (originalError.response.data === 'jwt expired') {
                cookies.remove('authToken')
                alert('로그인 세션이 만료되었습니다. ')
                Router.push('/user/login')
            }
            return Promise.reject(originalError)
        })

    }

    login(email, password){
        return axios.post(('/users/login/'),
            {
                email,
                password
            })
    }

    getUser() {
        axios.defaults.headers.common['authorization'] = 'jwt ' + cookies.get("authToken")
        reaction(() => this.authToken, () => {
            axios.defaults.headers.common['token'] = this.authToken
        })
        return axios.get('/users/getuser').then((response) => {
            console.log("getUser: ", response)
            return response.data.id
        }).catch((e) => {
            console.log(e)
            return e
        })
    }

    getTradeItem(id) {
        axios.defaults.headers.common['authorization'] = 'jwt ' + cookies.get("authToken")
        reaction(() => this.authToken, () => {
            axios.defaults.headers.common['token'] = this.authToken
        })
        return axios.get('/trade/detail?id=' + id).then((response)=>{
            return response.data
        })
    }

    createTrade(sellcoinselectd, buycoinselectd, selltokenamount, buytokenamount, id) {
        axios.defaults.headers.common['authorization'] = 'jwt ' + cookies.get("authToken")
        reaction(() => this.authToken, () => {
            axios.defaults.headers.common['token'] = this.authToken
        })
        return axios.post(('/trade/create/'),
            {
                selltoken: sellcoinselectd,
                buytoken:buycoinselectd,
                selltokenamount: selltokenamount,
                buytokenamount: buytokenamount,
                status: "0",
                sellerId: id,
                buyerId: ''
            })
    }


    sortItems(level, method){
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

    myPageGetUser(user){
        return axios.get('/mypage/user', {
            params: {
                id: user
            }
        })
    }

    myPageGetWallet(data){
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

}

export const HttpServiceContext = createContext(new HttpService())