import {observable, computed, action, decorate} from 'mobx'
import {createContext} from "react"
import Router from "next/router"
import axios from 'axios'
import { Cookies, removeCookie} from "react-cookie"

const cookies = new Cookies()

class AuthStore{

    @observable
    baseURL = "http://localhost:5555"

    @observable
    soalarm = ''

    authToken = cookies.get('authToken');

    @action
    setToken(token) {
        this.authToken = token
    }

    @action
    deleteToken() {
        console.log("logout클릭!")
        cookies.remove('authToken')
        console.log(this.authToken)
        Router.push('/')
    }

    @computed
    get isLoggedIn() {
        return cookies.get('authToken') != null;
    }

    get refresh_token() {
        return cookies.get('refreshToken')
    }

    @action
    setSoalarm(date) {
        this.soalarm = date
    }
    
    @computed
    get getSoalarm() {
        return this.soalarm;
    }

}

export const AuthStoreContext = createContext(new AuthStore())