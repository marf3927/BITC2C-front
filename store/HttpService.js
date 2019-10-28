import {createContext, useContext} from "react"
import axios from 'axios'
import Router from "next/router"
import {reaction} from 'mobx'
import {Cookies} from "react-cookie"

const cookies = new Cookies()

class HttpService {
    constructor() {
        this.state = {
            res : ''
        };
        this.isExpiredToken = false
        this.authToken = cookies.get("authToken")

        axios.defaults.baseURL = 'http://localhost:5555'

        axios.defaults.headers.common['authorization'] = 'JWT ' + this.authToken
        reaction(() => this.authToken, () => {
            axios.defaults.headers.common['token'] = this.authToken
        })

        axios.interceptors.response.use(response => {
            return response
        }, originalError => {
            const {config} = originalError
            console.log(originalError.response.data)
            if (originalError.response.data === 'jwt expired') {
                cookies.remove('authToken', {expires: 'Thu, 01 Jan 1970 00:00:01 GMT'})
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
            }).then((response) =>{
                return response
        })
    }

    getUser() {
        return axios.get('/users/getuser', ).then((response) => {
            return response.data.id
        }).catch((e) => {
            console.log(e)
            return e
        })
    }

    getTradeItem(id) {
        return axios.get('/trade/detail?id=' + id).then((response)=>{
            return response.data
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
}

export const HttpServiceContext = createContext(new HttpService())