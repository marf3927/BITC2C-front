import {observable, computed, action} from 'mobx'
import {createContext} from "react"
import Router from "next/router"
import { Cookies} from "react-cookie"

const cookies = new Cookies()

class AuthStore{

    @observable
    baseURL = "http://localhost:5555"

    authToken = cookies.get('authToken')

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

}

export const AuthStoreContext = createContext(new AuthStore())